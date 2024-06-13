import { replicate } from "@/lib/replicate";

export async function generateReplicateResponse(
  prompt: string,
  negativePrompt: string,
  version: any
) {
  try {
    const response = await replicate.run(version, {
      input: {
        width: 768,
        height: 768,
        prompt: prompt,
        refine: "expert_ensemble_refiner",
        scheduler: "K_EULER",
        lora_scale: 0.6,
        num_outputs: 1,
        guidance_scale: 7.5,
        apply_watermark: false,
        high_noise_frac: 0.8,
        negative_prompt: negativePrompt,
        prompt_strength: 0.8,
        num_inference_steps: 25,
      },
    });

    return response;
  } catch (error) {
    console.error("Error with Repplicate request: ", error);
    throw error;
  }
}
