"use client";

import { useState } from "react";
import { formatTimestamp } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import AudioInfo from "@/components/audio/AudioInfo";
import { ArrowRight } from "lucide-react";

export default function RecordingDesktop({ data }: { data: any }) {
  const { recording, summary, transcript } = data;
  const [note, setNote] = useState(summary);
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("Summary");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const router = useRouter();

  const generateSummary = async () => {
    setIsGeneratingSummary(true);
    setIsOpen(true);

    // Call your API to generate summary
    const response = await fetch("/api/audio/summarize", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        recordingId: recording.id,
        transcript: transcript.transcript,
      }),
    });

    const result = await response.json();

    if (response.ok) {
      setNote({
        ...note,
        summary: result.summary,
        action_items: result.action_items,
      });
      router.refresh();
      setIsOpen(false); // Close the modal after summary is generated
    } else {
      console.error("Error generating summary:", result.error);
    }

    setIsGeneratingSummary(false);
  };

  const { created_at: _creationTime } = recording;
  const { generatingTitle, title } = summary ?? {};

  return (
    <>
      <div className="max-width mt-5 flex flex-col md:flex-row items-center justify-between">
        <div className="space-y-1 mb-4 mt-4">
          <h4
            className={`text-sm font-medium leading-none ${
              generatingTitle && "animate-pulse"
            }`}
          >
            {generatingTitle ? "Generating Title..." : title ?? "Untitled Note"}
          </h4>
          <p className="text-sm text-muted-foreground">
            You'll find a summary and action items below.
          </p>
        </div>
        <div className="flex items-center justify-center">
          <p className="text-xs italic opacity-80">
            {formatTimestamp(new Date(_creationTime).getTime())}
          </p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center">
        <div className="w-full md:w-1/2">
          <div className="flex flex-col">
            <div className="p-4">
              <Accordion type="single" collapsible className="p-2">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Your transcript</AccordionTrigger>
                  <AccordionContent>
                    <div className="text-sm">{transcript.transcript}</div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Summary</AccordionTrigger>
                  <AccordionContent>
                    {summary?.summary ? (
                      <div className="text-sm">{summary.summary}</div>
                    ) : (
                      <>
                        <div className="text-sm">No summary available.</div>
                        <Button
                          className="text-sm bg-primary text-white mt-4"
                          onClick={generateSummary}
                          disabled={isGeneratingSummary}
                        >
                          {isGeneratingSummary
                            ? "Generating summary..."
                            : "Generate summary"}
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </>
                    )}{" "}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Action items</AccordionTrigger>
                  <AccordionContent>
                    {summary?.action_items ? (
                      <div className="text-sm">
                        <ul>
                          {Array.isArray(summary.action_items)
                            ? summary.action_items.map(
                                (item: string, index: number) => (
                                  <li key={index} className="list-disc">
                                    {item}
                                  </li>
                                )
                              )
                            : JSON.parse(summary.action_items).map(
                                (item: string, index: number) => (
                                  <li key={index}>{item}</li>
                                )
                              )}
                        </ul>
                      </div>
                    ) : (
                      <>
                        <div className="text-sm">
                          No action items available.
                        </div>
                        <Button
                          className="text-sm bg-primary text-white mt-4"
                          onClick={generateSummary}
                          disabled={isGeneratingSummary}
                        >
                          {isGeneratingSummary
                            ? "Generating summary..."
                            : "Generate summary"}
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </>
                    )}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Generating Summary</DialogTitle>
                  <DialogDescription>
                    Please wait while we generate the summary for your
                    recording.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col items-center justify-center py-8">
                  <span className="loading loading-ring loading-lg"></span>
                  <p className="mt-4 text-sm text-black">
                    Processing, please wait...
                  </p>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <a href="/audio/app" className="flex justify-center">
            <Button className="text-sm bg-primary text-white mt-4">
              Back to recordings
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </a>
        </div>
        <div className="w-full md:w-1/2">
          <AudioInfo />
        </div>
      </div>
    </>
  );
}
