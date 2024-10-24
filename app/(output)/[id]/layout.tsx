import { DashboardLayout } from "@/components/dashboard/Layout";
import { appConfig } from "@/config";

export const metadata = {
  title: appConfig.metadata.title,
  description: appConfig.metadata.description,
  openGraph: {
    images: [appConfig.metadata.og_image],
  },
  alternates: {
    canonical: appConfig.metadata.canonical,
  },
};

export default function NoGreetingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardLayout toolConfig={appConfig} showGreeting={false}>
      {children}
    </DashboardLayout>
  );
}