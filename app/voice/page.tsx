import Layout from "@/components/voice/Layout";
import PaymentModal from "@/components/paywall/Payment";
import { createClient } from "@/lib/utils/supabase/server";
import { toolConfig } from "./toolConfig";
import { redirect } from "next/navigation";
import Section from "@/components/Section";
import Footer from "@/components/footers/Footer-1";

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

  // If the tool is not paywalled or the user has a valid purchase, render the page
  return (
    <>
      <Section>
        <Layout userEmail={user ? user.email : undefined} />
      </Section>
      <Footer
        companyConfig={toolConfig.company!}
        footerConfig={toolConfig.footerApp!}
      />
    </>
  );
}
