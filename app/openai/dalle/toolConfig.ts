// Please read the @/lib/types/toolconfig file for more details on each field.
import { ToolConfig } from "@/lib/types/toolconfig";

export const toolConfig: ToolConfig = {
  ////// Base config
  company: {
    name: "DALLEStudio",
    theme: "logo",
    homeUrl: "/openai/dalle",
    appUrl: "/openai/dalle/app",
    description: "Generate stunning images with AI",
    logo: "https://cdn0.iconfinder.com/data/icons/lifestyle-entertainment-vol-2/512/museum_art_painting_artist-512.png",
    navbarLinks: [
      { label: "App", href: `/openai/dalle/app` },
      { label: "Home", href: "https://anotherwrapper.com" },
      { label: "Other apps", href: "https://apps.anotherwrapper.com" },
      { label: "Blog", href: "/blog" },
    ],
  },
  ////// Location
  toolPath: "openai/dalle",

  ////// SEO stuff
  metadata: {
    title: "Generate logos using DALL-E | AnotherWrapper",
    description: "Generate beautiful logos for your business",
    og_image: "https://indielogs.com/og-image.png",
    canonical: "https://anotherwrapper.com/openai/marketing",
  },

  ////// Payments
  paywall: true,
  credits: 5,

  ////// AI config
  aiModel: "dall-e-3",

  ////// Storage config
  upload: {
    path: "/logos",
    apiEndpoint: "/api/upload/image",
  },

  ////// Form input
  type: "dalle", // options: 'vision' for GPT-4o, 'dalle', 'sdxl', 'groq' & 'gpt'.
  fields: [
    {
      label: "🎯 Keywords",
      name: "ideaDescription",
      type: "input",
      placeholder: "Enter a couple of keywords related to your business.",
      required: true,
    },
  ],
  submitText: "Generate logo 👩🏼‍🎨",
  submitTextGenerating: "Generating your logo...",

  ////// UI config
  navbarLanding: {
    bgColor: "primary",
    textColor: "primary-content",
    buttonColor: "accent",
  },

  navbarApp: {
    bgColor: "base-100",
    textColor: "base-content",
    buttonColor: "accent",
  },

  footerLanding: {
    bgColor: "primary",
    textColor: "primary-content",
  },

  footerApp: {
    bgColor: "accent/90",
    textColor: "white",
  },
};
