import { groq } from "@/lib/groq";

export async function generateGroqResponse(
  prompt: string,
  functionCall: any,
  groqModel: any,
  systemMessage: string
) {
  try {
    const messages = [
      {
        role: "system",
        content: systemMessage,
      },
      {
        role: "user",
        content: prompt,
      },
    ];

    const response = await groq.chat.completions.create({
      model: groqModel,
      messages: messages,
      tools: [functionCall],
    });

    return response;
  } catch (error) {
    console.error("Error with GROQ request: ", error);
    throw error;
  }
}
