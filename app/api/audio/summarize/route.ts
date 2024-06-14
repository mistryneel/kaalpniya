import { ChatGroq } from "@langchain/groq";
import { createClient } from "@/lib/utils/supabase/server";
import { NextResponse, NextRequest } from "next/server";
import { toolConfig } from "@/app/audio/toolConfig";
import { z } from "zod";

const SummarizeSchema = z.object({
  title: z
    .string()
    .describe("Short descriptive title of what the voice message is about"),
  summary: z
    .string()
    .describe(
      "A short summary in the first person point of view of the person recording the voice message"
    )
    .max(500),
  actionItems: z
    .array(z.string())
    .describe(
      "A list of action items from the voice note, short and to the point. Make sure all action item lists are fully resolved if they are nested"
    ),
});

const chat = new ChatGroq({
  model: toolConfig.aiModel,
  maxTokens: 500,
});

const chatWithStructuredOutput = chat.withStructuredOutput(SummarizeSchema);

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

  try {
    // Read the body once
    const requestBody = await request.json();
    const { transcript, recordingId } = requestBody;

    if (!recordingId) {
      return NextResponse.json({
        error: "Document ID is required",
      });
    }

    // Generate response from Groq
    const responseData = await chatWithStructuredOutput.invoke([
      ["system", toolConfig.systemMessage!],
      ["human", transcript],
    ]);

    console.log("Response from Groq:", responseData);

    const { title, summary, actionItems } = responseData;

    // Insert summary into the summaries table
    const { data: summaryData, error: summaryError } = await supabase
      .from("summaries")
      .insert({
        recording_id: recordingId,
        summary: summary,
        action_items: actionItems,
        title: title,
        model: toolConfig.aiModel,
      })
      .select();

    if (summaryError) {
      throw new Error(summaryError.message);
    }

    console.log("Summary inserted successfully:", summaryData);

    // Update the title in the recordings table
    const { data: recordingData, error: recordingError } = await supabase
      .from("recordings")
      .update({ title: title })
      .eq("id", recordingId)
      .select();

    if (recordingError) {
      throw new Error(recordingError.message);
    }

    console.log("Recording updated successfully:", recordingData);

    // Return the ID of the stored summary
    return new NextResponse(
      JSON.stringify({
        id: summaryData[0].id,
      }),
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      return new NextResponse(
        JSON.stringify({ status: "Error", message: error.message }),
        { status: 500 }
      );
    } else {
      console.error(error);
      return new NextResponse(
        JSON.stringify({
          status: "Error",
          message: "An unknown error occurred",
        }),
        { status: 500 }
      );
    }
  }
}
