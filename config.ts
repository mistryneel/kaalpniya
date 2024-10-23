/// Core Website config
export const appConfig = {
  ////// Base config used mainly for layout (@/components/navbar/Navbar-1.tsx and @/components/footer/Footer-1.tsx)
  company: {
    name: "Kaalpniya",
    theme: "kaalpniya",
    homeUrl: process.env.PRODUCTION_URL || "http://localhost:3000",
    appUrl: "/",
    description:
      "Build your own GPT-4o vision AI wrapper in minutes with this demo app that uses OpenAI, Cloudflare R2 & Supabase.",
    logo: "https://cdn2.iconfinder.com/data/icons/custom-ios-14-1/60/Camera-512.png",
    navbarLinks: [],
  },

  ////// SEO stuff
  metadata: {
    title: "GPT-4o vision AI wrapper demo application | Kaalpniya",
    description:
      "Build your own GPT-4o vision AI wrapper in minutes with this demo app that uses OpenAI, Cloudflare R2 & Supabase.",
    og_image: "https://kaalpniya.com/og.png",
    canonical: "https://kaalpniya.com/apps/vision",
  },

  ////// UI config
  navbarLanding: {
    bgColor: "primary",
    textColor: "neutral",
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
    bgColor: "primary",
    textColor: "white",
  },

  ////// Paywall
  paywall: true,
  credits: 5,

  ////// Location
  toolPath: "(apps)/vision",

  ////// AI config
  aiModel: "gpt-4o",

  ////// Storage config
  upload: {
    path: "vision",
    apiEndpoint: "/api/upload/image",
  },

  ////// Form input
  type: "vision",
  fields: [
    {
      label: "📝 Description Type",
      name: "descriptionType",
      type: "select",
      options: [
        "Short and concise",
        "Detailed and descriptive",
        "Humorous and creative",
      ],
      required: true,
    },
  ],
  submitText: "Generate image description 🌄",
  submitTextGenerating: "Analyzing your image...",
  responseTitle: "Your image description has been generated",
  responseSubTitle:
    "The output below has been automatically rendered based on the JSON schema used by the AI model. You can use this to quickly prototype your application.",
};

/// Core Website config
export const companyName = "Holding Company Name";
export const defaultTitle =
  "Build your AI startup in hours using our customizable demo apps";
export const defaultDescription =
  "Use one of our 8 customizable AI demo apps to build your AI SaaS quickly. A Next.js starter kit with AI integrations, Supabase, payments, emails & more! ";
export const defaultKeywords =
  "openai, gpt-3, llama, replicate, groq, mixtral, ai app, boilerplate, api endpoint, next.js, react, starter kit, boilerplate, ai, artificial intelligence, node.js, express, stripe";
export const defaultOgImage = "/og.png";
export const favicon = "/favicon.ico";

// LEGAL STUFF
export const privacyPolicyUrl = "https://kaalpniya.com/privacy";
export const tosUrl = "https://kaalpniya.com/terms";

// Auth
export const authImage = "/hero.webp";

// Inside routing
export const homePage = "/";
const getRedirectUrl = () => {
  const baseUrl = process.env.PRODUCTION_URL || "http://localhost:3000";
  return `${baseUrl}/auth/confirm`;
};

export const redirectTo = getRedirectUrl();
