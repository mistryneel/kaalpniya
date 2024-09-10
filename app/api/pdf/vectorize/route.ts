import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/utils/supabase/server";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { OpenAIEmbeddings } from "@langchain/openai";
import { Document } from "langchain/document";

type DocumentMetadata = {
  document_id: any;
  page: number;
};

function sanitizeText(text: string): string {
  return text
    .replace(/\u0000/g, "") // Remove null characters
    .replace(/[^\x20-\x7E]/g, "") // Remove non-printable ASCII characters
    .trim(); // Trim whitespace from start and end
}

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
    const buffer = await response.arrayBuffer();
    const loader = new PDFLoader(new Blob([buffer]));
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
      return new Document({
        pageContent: sanitizeText(splitDoc.pageContent),
        metadata: {
          document_id: documentId,
          page: pageIndex + 1,
        },
      });
    });

    return documentsWithPages;
  }

  try {
    const documents = await fetchDocumentsFromUrl(fileUrl);

    const embeddings = new OpenAIEmbeddings();
    const embeddedDocuments = await Promise.all(
      documents.map(async (doc) => {
        try {
          const [embedding] = await embeddings.embedDocuments([
            doc.pageContent,
          ]);
          return { doc, embedding };
        } catch (error) {
          console.error("Error embedding document:", error);
          return null;
        }
      })
    );

    const validEmbeddings = embeddedDocuments.filter(
      (
        item
      ): item is { doc: Document<DocumentMetadata>; embedding: number[] } =>
        item !== null
    );

    const embeddingsData = validEmbeddings.map(({ doc, embedding }) => ({
      document_id: documentId,
      content: doc.pageContent,
      embedding: embedding,
      metadata: doc.metadata,
    }));

    const { error } = await supabase.from("embeddings").insert(embeddingsData);

    if (error) {
      console.error("Supabase insertion error:", error);
      throw error;
    }

    return NextResponse.json({
      text: "Successfully embedded pdf",
      id: documentId,
    });
  } catch (error) {
    console.error("Error in POST function:", error);
    return NextResponse.json({ error: "Failed to ingest your data" });
  }
}
