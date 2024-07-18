// Please read the @/lib/types/toolconfig file for more details on each field.
import { ToolConfig } from "@/lib/types/toolconfig";

export const toolConfig: ToolConfig = {
  ////// Base config
  company: {
    name: "Chat",
    theme: "anotherwrapper",
    homeUrl: "/chat",
    appUrl: "/chat",
    description:
      "Build your own AI chatbot using OpenAI, LangChain and Supabase for memory.",
    logo: "https://cdn3.iconfinder.com/data/icons/aami-web-internet/64/aami4-68-512.png",
    navbarLinks: [
      { label: "App", href: `/chat` },
      { label: "Home", href: "https://anotherwrapper.com" },
      { label: "Other apps", href: "https://apps.anotherwrapper.com" },
      { label: "Blog", href: "/blog" },
    ],
  },

  ////// Metadata for SEO
  metadata: {
    title: "Intelligent chatbot with memory | AnotherWrapper",
    description:
      "Build your own AI chatbot using OpenAI, LangChain and Supabase for memory.",
    og_image: "https://anotherwrapper.com/og.png",
    canonical: "https://anotherwrapper.com/chat",
  },

  ////// Payments
  paywall: true,
  credits: 5,

  ////// Location
  toolPath: "chat",

  ////// AI config
  aiModel: "gpt-4o-mini",
  messagesToInclude: 10,
};
