import { Sidebar } from "@/components/dashboard/Sidebar";
import { Inter } from "next/font/google";
import { twMerge } from "tailwind-merge";
import { Footer } from "@/components/dashboard/Footer";
import FooterAll from "@/components/footers/Footer-1";
import { createClient } from "@/lib/utils/supabase/server";
import { Container } from "@/components/dashboard/Container";
import { Heading } from "@/components/dashboard/Heading";
import { Paragraph } from "@/components/dashboard/Paragraph";
import { Highlight } from "@/components/dashboard/Highlight";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

import { toolConfig } from "./toolConfig";

export const metadata = {
  title: toolConfig.metadata.title,
  description: toolConfig.metadata.description,
  openGraph: {
    images: [toolConfig.metadata.og_image],
  },
  alternates: {
    canonical: `${toolConfig.metadata.canonical}/app`,
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let credits;
  if (user && toolConfig.paywall) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();
    credits = profile.credits;
  }

  return (
    <body
      className={twMerge(
        inter.className,
        "flex antialiased h-screen overflow-hidden bg-gray-100"
      )}
      data-theme="anotherwrapper"
    >
      <Sidebar />
      <div className="lg:pl-2 lg:pt-2 bg-gray-100 flex-1 overflow-y-auto">
        <div className="flex-1 bg-white min-h-screen lg:rounded-tl-xl border border-transparent lg:border-neutral-200 overflow-y-auto">
          <Container>
            <span className="text-4xl">👋🏼</span>
            <Heading as="p" className="font-black">
              {user ? `Hi ${user.email}!` : "Hi there!"}
            </Heading>
            <Paragraph className="max-w-xl mt-4">
              Hope you're having a great day! You can try out the app below.
              {credits !== undefined && (
                <Highlight> You still have {credits} credits left.</Highlight>
              )}
            </Paragraph>
            {children}
          </Container>
          <Footer />
        </div>
        <FooterAll
          companyConfig={toolConfig.company!}
          footerConfig={toolConfig.footerApp!}
        />
      </div>
    </body>
  );
}
