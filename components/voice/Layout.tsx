import { TextToSpeechTab } from "@/components/voice/TextToSpeechTab";
import Hello from "@/components/input/Hello";
import AppInfo from "@/components/voice/AppInfo";

interface InputCaptureProps {
  userEmail?: string;
}

export default function PdfLayout({ userEmail }: InputCaptureProps) {
  return (
    <section className="relative min-h-screen">
      <Hello userEmail={userEmail} />
      <div className="flex flex-col md:flex-row items-center no-scrollbar">
        <div className="w-full md:w-1/2 no-scrollbar">
          <AppInfo />
        </div>

        <div className="w-full px-8 md:w-1/2">
          <div className="flex justify-center mb-6 mx-auto p-4">
            <TextToSpeechTab />
          </div>
        </div>
      </div>
    </section>
  );
}
