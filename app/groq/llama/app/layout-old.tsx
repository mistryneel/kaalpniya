import Navbar from "@/components/navbars/Navbar-1";
import Footer from "@/components/footers/Footer-1";
import Section from "@/components/Section";
import { toolConfig } from "../toolConfig";

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
interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div data-theme={toolConfig.company.theme}>
      <Navbar
        companyConfig={toolConfig.company!}
        navbarConfig={toolConfig.navbarApp!}
      />
      <div className="min-h-screen">
        <Section>{children}</Section>
      </div>
      <Footer
        companyConfig={toolConfig.company!}
        footerConfig={toolConfig.footerApp!}
      />
    </div>
  );
};

export default Layout;
