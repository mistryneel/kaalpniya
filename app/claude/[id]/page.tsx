import Navbar from "@/components/navbars/Navbar-1";
import Footer from "@/components/footers/Footer-1";
import OutputLayout from "@/components/output/OutputLayout";
import { toolConfig } from "../toolConfig";

export const metadata = {
  title: toolConfig.metadata.title,
  description: toolConfig.metadata.description,
  og_image: toolConfig.metadata.og_image,
  canonical: toolConfig.metadata.canonical,
};

export default function Page({ params }: { params: any }) {
  return (
    <>
      <div data-theme={toolConfig.company.theme}>
        <OutputLayout params={params} toolConfig={toolConfig} />
      </div>
    </>
  );
}
