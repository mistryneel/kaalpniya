import DisplayOutput from "@/components/output/DisplayOutput";
import { toolConfig } from "../../toolConfig";

export const metadata = {
  title: toolConfig.metadata.title,
  description: toolConfig.metadata.description,
  og_image: toolConfig.metadata.og_image,
  canonical: toolConfig.metadata.canonical,
};

export const dynamic = "force-dynamic";

export default function Page({ params }: { params: any }) {
  return (
    <>
      <DisplayOutput params={params} toolConfig={toolConfig} />
    </>
  );
}
