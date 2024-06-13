import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/utils/supabase/server";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { OpenAIEmbeddings } from "@langchain/openai";

export async function POST(request: NextRequest) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const userId = user?.id;

  if (!userId) {
    return NextResponse.json({
      error: "You must be logged in to ingest data",
    });
  }

  const { fileUrl, documentId } = await request.json();

  if (!documentId) {
    return NextResponse.json({
      error: "Document ID is required",
    });
  }

  async function fetchDocumentsFromUrl(url: string) {
    const response = await fetch(url);
    const buffer = await response.blob();
    const loader = new PDFLoader(buffer);
    const rawDocs = await loader.load();

    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });

    const splitDocs = await textSplitter.splitDocuments(rawDocs);

    const pages = rawDocs.map((doc) => doc.pageContent);

    const documentsWithPages = splitDocs.map((splitDoc) => {
      const pageIndex = pages.findIndex((page) =>
        page.includes(splitDoc.pageContent)
      );
      return {
        pageContent: splitDoc.pageContent,
        metadata: {
          document_id: documentId,
          page: pageIndex + 1,
        },
      };
    });

    return documentsWithPages;
  }

  try {
    const documents = await fetchDocumentsFromUrl(fileUrl);

    const embeddings = new OpenAIEmbeddings();
    const embeddedDocuments = await embeddings.embedDocuments(
      documents.map((doc) => doc.pageContent)
    );

    const embeddingsData = embeddedDocuments.map((embedding, index) => ({
      document_id: documentId,
      content: documents[index].pageContent,
      embedding,
      metadata: documents[index].metadata,
    }));

    const { error } = await supabase.from("embeddings").insert(embeddingsData);

    if (error) {
      throw error;
    }

    return NextResponse.json({
      text: "Successfully embedded pdf",
      id: documentId,
    });
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({ error: "Failed to ingest your data" });
  }
}
