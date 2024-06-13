/// Core Website config
export const companyConfig = {
  ////// Base config
  company: {
    name: "AnotherWrapper",
    theme: "anotherwrapper",
    homeUrl: "https://apps.anotherwrapper.com",
    appUrl: "/",
    description: "Build your AI startup in hours using our demo apps",
    logo: "/logo.png",
    navbarLinks: [
      { label: "Home", href: "https://anotherwrapper.com" },
      { label: "Other apps", href: "https://apps.anotherwrapper.com" },
      { label: "Blog", href: "/blog" },
    ],
  },

  ////// UI config
  navbarLanding: {
    bgColor: "base-100",
    textColor: "base-content",
    buttonColor: "primary",
  },

  footerLanding: {
    bgColor: "base-200",
    textColor: "base-content",
  },
};

/// Core Website config
export const companyName = "FD Digital";
export const defaultTitle =
  "Build your AI startup in hours using our customizable demo apps";
export const defaultDescription =
  "Use one of our 8 customizable AI demo apps to build your AI SaaS quickly. A Next.js starter kit with AI integrations, Supabase, payments, emails & more! ";
export const defaultKeywords =
  "openai, gpt-3, llama, replicate, groq, mixtral, ai app, boilerplate, api endpoint, next.js, react, starter kit, boilerplate, ai, artificial intelligence, node.js, express, stripe";
export const defaultOgImage = "/og.png";
export const logo = "/logo.png";
export const favicon = "/favicon.ico";

// LEGAL STUFF
export const privacyPolicyUrl = "https://anotherwrapper.com/privacy.html";
export const tosUrl = "https://anotherwrapper.com/terms.html";

// Auth
export const authImage = "/hero.webp";

// Inside routing
export const homePage = "/home";
export const redirectTo =
  "https://apps.anotherwrapper.com/auth/confirm?next=/home";
