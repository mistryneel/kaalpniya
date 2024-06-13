import { createClient } from "@/lib/utils/supabase/server";
import RecordVoicePage from "@/components/audio/RecordAudio";
import PaymentModal from "@/components/paywall/Payment";
import { toolConfig } from "../toolConfig";
import { redirect } from "next/navigation";
import Hello from "@/components/input/Hello";
import AudioInfo from "@/components/audio/AudioInfo";
import YourFiles from "@/components/audio/YourFiles";

export default async function Page() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/auth");
  }

  // If user is logged in, we check if the tool is paywalled.
  // If it is, we check if the user has a valid purchase & enough credits for one generation
  if (toolConfig.paywall) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    const { credits } = profile;

    if (credits < toolConfig.credits) {
      return <PaymentModal />;
    }
  }

  // Fetch recordings for the user
  const { data: recordings, error: recordingsError } = await supabase
    .from("recordings")
    .select("*")
    .eq("user_id", user.id);

  if (recordingsError) {
    console.error("Error fetching recordings:", recordingsError);
    return <div>Error fetching recordings</div>;
  }

  // If the tool is not paywalled or the user has a valid purchase, render the page
  return (
    <div className="bg-base-100 min-h-screen">
      <Hello userEmail={user.email} />

      <div className="flex flex-col md:flex-row items-center">
        <div className="w-full md:w-1/2">
          <AudioInfo />
        </div>
        <div className="w-full md:w-1/2">
          <RecordVoicePage user={user} />
          {recordings && recordings.length > 0 && (
            <div className="mt-8">
              <YourFiles recordings={recordings} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
