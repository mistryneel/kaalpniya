// Important when using GPT-4 Vision
// It does not support function calling as of the time of me writing the code so as a workaround, specifying the function in the prompt is the best way to go about it.
// It's really important to always keep the last sentence (do not include ``json ...) otherwise response is not in correct JSON.

export function generatePrompt(body: any) {
  const { descriptionType } = body;

  return (
    "Generate a detailed and engaging description for the provided image. The description should be informative, concise, and tailored to the specified type. Ensure the output is in valid JSON format and adheres strictly to the function schema.\n" +
    "INPUTS:\n" +
    `Description Type: ${descriptionType}\n` +
    "INSTRUCTIONS:\n" +
    "- Provide a brief overview of the image, including its main subjects, objects, or scenes.\n" +
    "- Describe the image's visual elements, such as colors, textures, and shapes.\n" +
    "- Identify any notable objects, people, or scenery in the image.\n" +
    "- Ensure the description is concise, clear, and engaging for the target audience.\n" +
    "OUTPUT STRUCTURE:\n" +
    "1. `imageDescription` (Object): A detailed description of the image, including its main subjects, visual elements, and notable objects or scenery.\n" +
    "  - `description` (String): A concise and engaging description of the image.\n" +
    "  - `visualElements` (Array): An array of strings, each describing a visual element in the image (e.g., colors, textures, shapes).\n" +
    "  - `objectsScenes` (Array): An array of strings, each describing a notable object or scenery in the image.\n" +
    "Please ensure the output strictly follows the structure described above.\n" +
    "Reply in JSON format.\n" +
    "DO NOT REPLY WITH EMPTY FIELDS. Every field must be filled with detailed and descriptive information. An empty field is unacceptable.\n" +
    "Ensure the output is directly usable by a frontend without requiring additional processing.\n" +
    "- The output must be in valid JSON format and adhere strictly to the function schema. Any deviation is unacceptable.\n" +
    "- Do not include ```json` in your answer. Just send the JSON object and nothing else so that it can be parsed by the JSON.parse() function.\n"
  );
}
