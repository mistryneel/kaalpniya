// Please read the @/lib/types/toolconfig file for more details on each field.
import { ToolConfig } from "@/lib/types/toolconfig";

export const toolConfig: ToolConfig = {
  ////// Base config
  company: {
    name: "BizPlanApp",
    theme: "anotherwrapper",
    homeUrl: "/claude",
    appUrl: "/claude",
    description:
      "Create a comprehensive business plan using Claude 3 & Anthropic's SONNET AI model.",
    logo: "https://cdn2.iconfinder.com/data/icons/privacy-policy/512/privacy-data-policy-security-05-512.png",
    navbarLinks: [
      { label: "App", href: `/claude` },
      { label: "Home", href: "https://anotherwrapper.com" },
      { label: "Other apps", href: "https://apps.anotherwrapper.com" },
      { label: "Blog", href: "/blog" },
    ],
  },
  ////// SEO stuff
  metadata: {
    title: "Business Plan Generator for Solopreneurs | AnotherWrapper",
    description:
      "Create a comprehensive business plan using Claude 3 & Anthropic's SONNET AI model.",
    og_image: "https://anotherwrapper.com/og.png",
    canonical: "https://anotherwrapper.com/claude",
  },

  ////// Paywall
  paywall: true,
  credits: 5,

  ////// Location
  toolPath: "claude",

  ////// AI config
  aiModel: "claude-3-sonnet-20240229",
  systemMessage:
    "You are an experienced business consultant. You are helping a solopreneur create a comprehensive business plan. Only reply with the JSON, do not return anything else.",

  ////// Form input
  type: "claude",
  fields: [
    {
      label: "💡 Business Idea",
      name: "businessIdea",
      type: "textarea",
      placeholder:
        "Describe your business idea in one sentence. What makes it unique?",
      required: true,
    },
    {
      label: "👥 Target Market",
      name: "targetMarket",
      type: "textarea",
      placeholder:
        "Who is your target market? Describe their key demographics and needs.",
      required: true,
    },
    {
      label: "💰 Revenue Streams",
      name: "revenueStreams",
      type: "textarea",
      placeholder:
        "Describe your revenue streams. How will your business make money?",
      required: true,
    },
  ],
  submitText: "Generate Business Plan 🚀",
  submitTextGenerating: "Generating business plan...",
  responseTitle: "Your business plan has been generated",
  responseSubTitle: "Find your business plan below",

  ////// UI config
  navbarLanding: {
    bgColor: "primary",
    textColor: "text-neutral",
    buttonColor: "accent",
  },

  navbarApp: {
    bgColor: "base-100",
    textColor: "text-base-content",
    buttonColor: "accent",
  },

  footerLanding: {
    bgColor: "accent",
    textColor: "white",
  },

  footerApp: {
    bgColor: "accent",
    textColor: "white",
  },
};
