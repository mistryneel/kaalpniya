"use client";

import { getResponse } from "@/lib/hooks/getAIResponse";
import OutputHero from "@/components/output/OutputHero";
import OutputSidebar from "@/components/output/OutputSidebar";
import Loading from "@/components/Loading";
import Section from "@/components/Section";
import { useRouter } from "next/navigation";
import Info from "@/components/alerts/Info";

export default function OutputLayout({
  params,
  toolConfig,
}: {
  params: any;
  toolConfig: any;
}) {
  const { loading, output, input, linkCopied, copyLink } = getResponse(
    toolConfig.toolPath,
    params
  );

  const router = useRouter();

  if (loading) {
    return <Loading />;
  }

  if (!output) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-md mb-4">Oops, this page could not be found! </p>
        <button
          onClick={() => router.back()}
          className="bg-primary hover:bg-primary/80 text-primary-content font-bold py-2 px-4 rounded-xl"
        >
          Return
        </button>
      </div>
    );
  }

  const renderProperty = (propertyValue: any) => {
    if (propertyValue === null || propertyValue === undefined) {
      return <div>Oops, this could not be found!</div>;
    }

    if (typeof propertyValue === "object" && !Array.isArray(propertyValue)) {
      return (
        <div className="ml-4">
          {Object.entries(propertyValue).map(([key, value]) => (
            <div key={key}>
              <p className="text-sm mt-4">
                <strong>{key}</strong>:
              </p>
              {renderProperty(value)}
            </div>
          ))}
        </div>
      );
    }

    if (Array.isArray(propertyValue)) {
      return (
        <ul className="list-disc pl-5">
          {propertyValue.map((item, index) => (
            <li key={index}>{renderProperty(item)}</li>
          ))}
        </ul>
      );
    }

    if (
      typeof propertyValue === "string" ||
      typeof propertyValue === "number"
    ) {
      return (
        <div>
          <span className="text-sm mt-4">{propertyValue}</span>
        </div>
      );
    }

    return null;
  };

  return (
    <>
      <div className="relative min-h-screen" data-theme={toolConfig.dataTheme}>
        <OutputHero
          title={toolConfig.responseTitle}
          subtitle={toolConfig.responseSubTitle}
        />

        <Section>
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/4">
              <OutputSidebar
                toolConfig={toolConfig}
                input={input}
                copyLink={copyLink}
                linkCopied={linkCopied}
              />
            </div>

            <div className="mt-10 md:mt-0 flex flex-col ml-2 md:w-3/4">
              <Info>
                All output below is <strong>automatically rendered</strong> from
                the structured output of the AI model, no matter what the JSON
                structure looks like. This helps you quickly build MVPs & you
                can then customize and render the output in a more appealing way
                as desired.
              </Info>
              {Object.entries(output).map(
                ([propertyName, propertyValue], index) => (
                  <section key={index} className="p-4 mb-4">
                    <h2 className="mb-2 text-xl font-bold text-accent">
                      {propertyName}
                    </h2>
                    {renderProperty(propertyValue)}
                  </section>
                )
              )}
            </div>
          </div>
        </Section>
      </div>
    </>
  );
}
