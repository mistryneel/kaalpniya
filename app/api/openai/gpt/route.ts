import { generateOpenAIResponse } from "@/lib/services/openai/gpt";
import { uploadToSupabase } from "@/lib/hooks/uploadToSupabase";
import { NextResponse, NextRequest } from "next/server";
import { reduceUserCredits } from "@/lib/hooks/reduceUserCredits";

export async function POST(request: NextRequest) {
  try {
    const requestBody = await request.json();
    const toolPath = decodeURIComponent(requestBody.toolPath);

    // Dynamically import the toolConfig, prompt and functionCall based on the tool name
    const { toolConfig } = await import(`@/app/${toolPath}/toolConfig`);
    const { generatePrompt } = await import(`@/app/${toolPath}/prompt`);
    const { functionSchema } = await import(`@/app/${toolPath}/schema`);

    // Generate prompt and function call
    const prompt = generatePrompt(requestBody);
    const functionCall = functionSchema[0];

    // Generate response from OpenAI
    const responseData = await generateOpenAIResponse(
      prompt,
      functionCall,
      toolConfig.aiModel,
      toolConfig.systemMessage
    );

    // Parse JSON and store in database
    let openAIResponse;
    if (
      responseData &&
      responseData.choices &&
      responseData.choices[0] &&
      responseData.choices[0].message &&
      responseData.choices[0].message.tool_calls &&
      responseData.choices[0].message.tool_calls[0] &&
      responseData.choices[0].message.tool_calls[0].function &&
      responseData.choices[0].message.tool_calls[0].function.arguments
    ) {
      openAIResponse = JSON.parse(
        responseData.choices[0].message.tool_calls[0].function.arguments
      );
    }

    // Store the response in Supabase
    const supabaseResponse = await uploadToSupabase(
      requestBody,
      openAIResponse,
      toolConfig.toolPath,
      toolConfig.aiModel
    );

    // If paywall is enabled, reduce user credits
    if (toolConfig.paywall === true) {
      await reduceUserCredits(requestBody.email, toolConfig.credits);
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
