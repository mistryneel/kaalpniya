"use client";

import { useState, ReactElement } from "react";
import Upload from "@/components//input/ImageUpload";
import { useFormData } from "@/lib/hooks/useFormData";
import { generateAIResponse } from "@/lib/hooks/generateAIResponse";
import { RenderFields } from "@/components/input/FormFields";
import { type ToolConfig } from "@/lib/types/toolconfig";
import AppInfo from "@/components/input/AppInfo";
import { LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface InputCaptureProps {
  toolConfig: ToolConfig;
  userEmail?: string;
  credits?: number;
}

export default function InputCapture({
  toolConfig,
  userEmail,
  credits: initialCredits,
}: InputCaptureProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [credits, setCredits] = useState(initialCredits ?? undefined);

  const [formData, handleChange] = useFormData(toolConfig.fields!);
  const [generateResponse, loading] = generateAIResponse(
    toolConfig,
    userEmail || "",
    imageUrl,
    setGeneratedImage
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (credits !== undefined && toolConfig.credits !== undefined) {
      if (credits < toolConfig.credits || credits < 1) {
        window.location.reload();
        return;
      }
    }
    await generateResponse(formData, event);
    if (credits !== undefined && toolConfig.credits !== undefined) {
      setCredits((prevCredits) => {
        const updatedCredits = prevCredits
          ? prevCredits - toolConfig.credits
          : undefined;
        return updatedCredits;
      });
    }
  };

  return (
    <section className="pb-20 w-full mx-auto">
      <div className="flex flex-col md:flex-row items-stretch gap-8 relative">
        <div className="w-full md:w-full flex">
          <div className="flex items-center w-full justify-center">
            <form onSubmit={handleSubmit} className="w-full">
              <div className="flex flex-col items-center">
                <div className="w-full mb-5">
                  <Upload
                    uploadConfig={toolConfig.upload}
                    setImageUrl={setImageUrl}
                  />
                  <RenderFields
                    fields={toolConfig.fields!}
                    formData={formData}
                    handleChange={handleChange}
                  />
                </div>
              </div>
              <div className="mb-5 flex justify-center">
                <Button
                  disabled={!imageUrl || loading}
                  type="submit"
                  className="bg-accent hover:bg-accent/80 text-white w-full"
                >
                  {!loading ? (
                    toolConfig.submitText
                  ) : (
                    <span className="flex items-center justify-center">
                      <LoaderCircle className="w-4 h-4 mr-2 text-green-500 animate-spin" />
                      {toolConfig.submitTextGenerating}
                    </span>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
