import InputCapture from "@/components/input/Input";
import PaymentModal from "@/components/paywall/Payment";
import { createClient } from "@/lib/utils/supabase/server";
import { appConfig } from "@/config";
import { redirect } from "next/navigation";
import { UserGenerations } from "@/components/dashboard/UserTextGenerations";
import { DashboardLayout } from "./Layout";

export default async function Page() {
  // Verify that user is logged in
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/auth");
  }

  // If user is logged in, we check if the tool is paywalled.
  // If it is, we check if the user has a valid purchase & enough credits for one generation
  let credits;
  let generations = [];
  if (user) {
    if (appConfig.paywall) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      credits = profile.credits;

      console.table(profile);

      if (credits < appConfig.credits) {
        return <PaymentModal />;
      }
    }

    const { data, error } = await supabase
      .from("generations")
      .select("*")
      .eq("email", user.email)
      .ilike("type", "%vision%")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching generations:", error);
    } else {
      generations = data;
    }
  }
  // If the tool is not paywalled or the user has a valid purchase, render the page
  return (
    <div data-theme={appConfig.company.theme} className="bg-white">
      <DashboardLayout toolConfig={appConfig}>
        <InputCapture
          toolConfig={appConfig}
          userEmail={user ? user.email : undefined}
          credits={appConfig.paywall ? credits : undefined}
        />
        <UserGenerations generations={generations} generationType="vision" />
      </DashboardLayout>
    </div>
  );
}
