import { GeistSans } from "geist/font/sans";
import Providers from "./providers";
import "./globals.css";
import {
  defaultTitle,
  defaultDescription,
  appConfig,
  defaultOgImage,
  favicon,
  defaultKeywords,
} from "@/config";

// SEO Optimization
export const metadata = {
  title: `${defaultTitle}`,
  description: defaultDescription,
  keywords: defaultKeywords,
  icons: [{ rel: "icon", url: `${appConfig.company.homeUrl}${favicon}` }],
  openGraph: {
    url: appConfig.company.homeUrl,
    title: `${defaultTitle} | ${appConfig.company.name}`,
    description: defaultDescription,
    images: [
      {
        url: `${appConfig.company.homeUrl}${defaultOgImage}`,
        width: 800,
        height: 600,
        alt: `${appConfig.company.name} logo`,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <main
        className={GeistSans.className + " text-base-content"}
        data-theme={appConfig.company.theme}
      >
        {children}
      </main>
    </Providers>
  );
}
