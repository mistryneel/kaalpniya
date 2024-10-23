import { NextResponse, NextRequest } from "next/server";
import { createClient } from "@/lib/utils/supabase/server";
import { uploadToSupabase } from "@/lib/hooks/uploadToSupabase";
import { reduceUserCredits } from "@/lib/hooks/reduceUserCredits";
import { functionSchema } from "./schema";
import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";

export async function POST(request: NextRequest) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const userId = user?.id;
  const userEmail = user?.email;

  if (!userId) {
    return NextResponse.json({
      error: "You must be logged in to use this service!",
    });
  }

  try {
    const requestBody = await request.json();
    const { imageUrl } = requestBody;

    // Dynamically import the toolConfig and prompt based on the tool name
    const { appConfig } = await import(`@/config`);
    const { generatePrompt } = await import(`./prompt`);

    // Generate prompt
    const prompt = generatePrompt(requestBody);

    // Initialize ChatOpenAI
    const chat = new ChatOpenAI({
      modelName: appConfig.aiModel,
      temperature: 0,
    });

    // Prepare the chat with structured output
    const chatWithStructuredOutput = chat.withStructuredOutput(
      functionSchema.parameters
    );

    // Generate response from OpenAI
    console.log("GPT Vision request received for image: ", imageUrl);
    const response = await chatWithStructuredOutput.invoke([
      new SystemMessage("You are a helpful assistant."),
      new HumanMessage({
        content: [
          { type: "text", text: prompt },
          {
            type: "image_url",
            image_url: {
              url: imageUrl,
            },
          },
        ],
      }),
    ]);

    console.log("Parsed OpenAI Response: ", response);

    // The response should now include seoMetadata directly
    const responseForSupabase = response;

    const supabaseResponse = await uploadToSupabase(
      requestBody,
      responseForSupabase,
      appConfig.toolPath,
      appConfig.aiModel
    );

    // PAYWALL - if enabled, reduce user credits after successful generation
    if (appConfig.paywall === true && userEmail) {
      await reduceUserCredits(userEmail, appConfig.credits);
    }

    // Return the ID of the stored data, so the client can redirect to the result page
    return new NextResponse(
      JSON.stringify({
        id: supabaseResponse[0].id,
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
