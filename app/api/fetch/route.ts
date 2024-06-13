import { createClient } from "@/lib/utils/supabase/server";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  const supabase = createClient();

  if (!id) {
    return new NextResponse(
      JSON.stringify({ error: "Missing id query parameter" }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  const { data: wrappedData, error } = await supabase
    .from("generations")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching wrapper data:", error.message);
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  // Successfully retrieved data
  return new NextResponse(JSON.stringify(wrappedData), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
