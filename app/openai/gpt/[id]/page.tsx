import { toolConfig } from "../toolConfig";
import ResponseLayout from "./response";

export const metadata = {
  title: toolConfig.metadata.title,
  description: toolConfig.metadata.description,
  og_image: toolConfig.metadata.og_image,
  canonical: toolConfig.metadata.canonical,
};

export default function Page({ params }: { params: any }) {
  return (
    <>
      <ResponseLayout params={params} />
    </>
  );
}
