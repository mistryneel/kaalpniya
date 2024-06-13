// Please read the @/lib/types/toolconfig file for more details on each field.
import { ToolConfig } from "@/lib/types/toolconfig";

export const toolConfig: ToolConfig = {
  ////// Base config
  company: {
    name: "AskYourPDF",
    theme: "anotherwrapper",
    homeUrl: "/pdf",
    appUrl: "/pdf",
    description:
      "Build your own chat with a PDF app using OpenAI, LangChain and Supabase vector embeddings. Ask questions to your PDF!",
    logo: "https://cdn3.iconfinder.com/data/icons/aami-web-internet/64/aami4-68-512.png",
    navbarLinks: [
      { label: "App", href: `/pdf` },
      { label: "Home", href: "https://anotherwrapper.com" },
      { label: "Other apps", href: "https://apps.anotherwrapper.com" },
      { label: "Blog", href: "/blog" },
    ],
  },

  ////// SEO stuff
  metadata: {
    title: "Chat with a PDF file | AnotherWrapper",
    description:
      "Build your own chat with a PDF app using OpenAI, LangChain and Supabase vector embeddings. Ask questions to your PDF!",
    og_image: "https://anotherwrapper.com/og.png",
    canonical: "https://anotherwrapper.com/pdf",
  },

  ////// Paywall
  paywall: true,
  credits: 5,

  ////// Location
  toolPath: "pdf",

  ////// AI config
  aiModel: "gpt-4o",
  messagesToInclude: 10,

  ////// UI config
  navbarApp: {
    bgColor: "white",
    textColor: "base-content",
    buttonColor: "primary",
  },

  footerApp: {
    bgColor: "primary/80",
    textColor: "white",
  },
};
