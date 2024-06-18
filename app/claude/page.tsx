import InputCapture from "@/components/input/Layout";
import PaymentModal from "@/components/paywall/Payment";
import { createClient } from "@/lib/utils/supabase/server";
import { toolConfig } from "./toolConfig";
import { redirect } from "next/navigation";
import AppInfo from "@/components/input/AppInfo";
import { AnimatedBeamOpenAI } from "@/components/magicui/animated-beam-bi-directional";
import { IconOpenAI } from "@/components/icons";
import { GearIcon, Link1Icon, PaddingIcon } from "@radix-ui/react-icons";
import { Database } from "lucide-react";
import Info from "@/components/alerts/Info";
import Navbar from "@/components/navbars/Navbar-1";
import Section from "@/components/Section";
import Footer from "@/components/footers/Footer-1";

export const metadata = {
  title: toolConfig.metadata.title,
  description: toolConfig.metadata.description,
  og_image: toolConfig.metadata.og_image,
  canonical: toolConfig.metadata.canonical,
};

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
  if (toolConfig.paywall) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    credits = profile.credits;

    console.table(profile);

    if (credits < toolConfig.credits) {
      return <PaymentModal />;
    }
  }

  const InfoCard = (
    <AppInfo
      title="Return structured output using Claude 3"
      background="bg-primary/10"
    >
      <div className="py-8 flex justify-center">
        <AnimatedBeamOpenAI />
      </div>
      <Info>
        Have a look{" "}
        <a
          href="https://docs.anotherwrapper.com/ai/claude"
          target="_blank"
          className="font-semibold underline"
        >
          at the documentation
        </a>{" "}
        for more information on setting up the app.
      </Info>
      <ul className="mt-4 ml-4 text-sm space-y-2 flex flex-col mb-4 relative xs:leading-7">
        <li className="text-l flex">
          <span className="w-4 h-4 mt-1">
            <IconOpenAI className="w-4 h-4" />
          </span>
          <span className="ml-2">
            This demo application uses LangChain and Claude 3 to return
            structured JSON output.
          </span>
        </li>
        <li className="text-l flex">
          <span className="w-4 h-4 mt-1">
            <Database className="w-4 h-4" />
          </span>
          <span className="ml-2">
            Response is stored in the <code>generations</code> table in Supabase
            and linked to the user for easy access.
          </span>
        </li>

        <li className="text-l flex">
          <span className="w-4 h-4 mt-1">
            <PaddingIcon className="w-4 h-4" />
          </span>

          <span className="ml-2">
            The main frontend logic is found in the <code>app/claude</code>{" "}
            folder. You'll find the prompts, configuration file and the JSON
            schema here.
          </span>
        </li>
        <li className="text-l flex">
          <span className="w-4 h-4 mt-1">
            <GearIcon className="w-4 h-4" />
          </span>

          <span className="ml-2">
            The main configuration file can be found in{" "}
            <code>app/claude/toolConfig.ts</code> file.
          </span>
        </li>

        <li className="text-l flex">
          <span className="w-4 h-4 mt-1">
            <Link1Icon className="w-4 h-4" />
          </span>

          <span className="ml-2">
            The API endpoint and logic can be found in{" "}
            <code>app/api/claude/route.ts</code>.
          </span>
        </li>
      </ul>
    </AppInfo>
  );

  // If the tool is not paywalled or the user has a valid purchase, render the page
  return (
    <>
      <Navbar
        companyConfig={toolConfig.company!}
        navbarConfig={toolConfig.navbarApp!}
      />
      <div className="min-h-screen">
        <Section>
          <InputCapture
            toolConfig={toolConfig}
            userEmail={user ? user.email : undefined}
            credits={toolConfig.paywall ? credits : undefined}
            emptyStateComponent={InfoCard}
          />
        </Section>
      </div>

      <Footer
        companyConfig={toolConfig.company!}
        footerConfig={toolConfig.footerApp!}
      />
    </>
  );
}
