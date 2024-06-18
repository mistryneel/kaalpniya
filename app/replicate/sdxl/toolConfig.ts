// Please read the @/lib/types/toolconfig file for more details on each field.
import { ToolConfig } from "@/lib/types/toolconfig";

export const toolConfig: ToolConfig = {
  ////// Base config
  company: {
    name: "SDXLStudio",
    theme: "sdxl",
    homeUrl: "/replicate/sdxl",
    appUrl: "/replicate/sdxl/app",
    description: "Generate stunning images with SDXL and AI",
    logo: "https://cdn1.iconfinder.com/data/icons/education-791/512/learning-knowledge-idea-thinking-create-128.png",
    navbarLinks: [
      { label: "App", href: `/replicate/sdxl/app` },
      { label: "Home", href: "https://anotherwrapper.com" },
      { label: "Other apps", href: "https://apps.anotherwrapper.com" },
      { label: "Blog", href: "/blog" },
    ],
  },

  ////// SEO stuff
  metadata: {
    title: "SDXL Image Studio | AnotherWrapper",
    description:
      "Build your own AI image generation studio using Stable Diffusion XL",
    og_image: "https://indielogs.com/og-image.png",
    canonical: "https://anotherwrapper.com/replicate/sdxl",
  },

  ////// Paywall
  paywall: true,
  credits: 5,

  ////// Location
  toolPath: "replicate/sdxl",

  ////// AI config
  aiModel:
    "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",

  ////// Storage config
  upload: {
    path: "/sdxl",
    apiEndpoint: "/api/upload/image",
  },

  ////// Form input
  type: "sdxl",
  fields: [
    {
      label: "✅ What image would you like to generate?",
      name: "prompt",
      type: "textarea",
      placeholder:
        "Describe the image you would like to generate. What should it look like? What should it contain? What should be the main focus of the image",
      required: true,
    },
    {
      label: "❌ What would you not like to see?",
      name: "negativePrompt",
      type: "textarea",
      placeholder:
        "Describe what you would not like to see in the image. Optional.",
      required: false,
    },
  ],
  submitText: "Generate AI image 🎨",
  submitTextGenerating: "Generating AI image...",

  ////// UI config
  navbarLanding: {
    bgColor: "primary",
    textColor: "white",
    buttonColor: "accent",
  },

  navbarApp: {
    bgColor: "base-100",
    textColor: "base-content",
    buttonColor: "accent",
  },

  footerLanding: {
    bgColor: "primary",
    textColor: "neutral",
  },

  footerApp: {
    bgColor: "accent/90",
    textColor: "white",
  },
};
