import Navbar from "@/components/navbars/Navbar-1";
import { toolConfig } from "./toolConfig";

export const metadata = {
  title: toolConfig.metadata.title,
  description: toolConfig.metadata.description,
  og_image: toolConfig.metadata.og_image,
  canonical: toolConfig.metadata.canonical,
};

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div
      data-theme={toolConfig.company.theme}
      className="min-h-screen bg-white"
    >
      <Navbar
        companyConfig={toolConfig.company!}
        navbarConfig={toolConfig.navbarApp!}
      />

      {children}
    </div>
  );
};

export default Layout;
