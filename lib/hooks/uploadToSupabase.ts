import { createClient } from "@/lib/utils/supabase/server";

export async function uploadToSupabase(
  input: any,
  output: any,
  toolPath: any,
  model: any
) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("generations")
    .insert([
      {
        email: input.email,
        input_data: input,
        output_data: output,
        type: toolPath, // This will allow us to filter generations based on toolPath
        model: model,
      },
    ])
    .select();

  if (data) console.log("Success");

  if (error) throw new Error(error.message);
  return data;
}
