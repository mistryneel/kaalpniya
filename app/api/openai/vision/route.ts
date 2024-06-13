import { generateVisionResponse } from "@/lib/services/openai/vision";
import { uploadToSupabase } from "@/lib/hooks/uploadToSupabase";
import { NextResponse, NextRequest } from "next/server";
import { reduceUserCredits } from "@/lib/hooks/reduceUserCredits";
import { createClient } from "@/lib/utils/supabase/server";

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
    const toolPath = decodeURIComponent(requestBody.toolPath);

    // Dynamically import the toolConfig and prompt based on the tool name
    const { toolConfig } = await import(`@/app/${toolPath}/toolConfig`);
    const { generatePrompt } = await import(`@/app/${toolPath}/prompt`);

    // Generate prompt and function call
    const prompt = generatePrompt(requestBody);

    // Generate response from OpenAI
    const responseData = await generateVisionResponse(
      prompt,
      imageUrl,
      toolConfig.aiModel,
      toolConfig.systemMessage
    );

    // Parse JSON and store in database
    const openAIResponse = responseData.choices[0].message.content;

    // Since the response from GPT Vision is not always a valid JSON, we need to check if it is a valid JSON before parsing it
    let parsedOpenAIResponse;
    try {
      parsedOpenAIResponse = JSON.parse(openAIResponse || "");
      console.log("Parsed OpenAI Response: ", parsedOpenAIResponse);
    } catch (parseError) {
      console.error("Parsing Error: ", parseError);
    }

    const responseForSupabase = parsedOpenAIResponse || openAIResponse;

    const supabaseResponse = await uploadToSupabase(
      requestBody,
      responseForSupabase,
      toolConfig.toolPath,
      toolConfig.aiModel
    );

    // PAYWALL - if enabled, reduce user credits after successful generation
    if (toolConfig.paywall === true && userEmail) {
      await reduceUserCredits(userEmail, toolConfig.credits);
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
