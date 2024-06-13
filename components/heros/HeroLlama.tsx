import SocialProof from "@/components/socialproof/SocialProof";
import Media from "@/components/socialproof/Media";
import { ArrowRight, NotebookPen } from "lucide-react";

export default function Hero() {
  return (
    <>
      {" "}
      <div className="relative text-neutral bg-primary">
        <div className="absolute inset-x-0 bottom-0">
          <svg
            viewBox="0 0 224 12"
            fill="currentColor"
            className="w-full -mb-1 text-base-100"
            preserveAspectRatio="none"
          >
            <path d="M0,0 C48.8902582,6.27314026 86.2235915,9.40971039 112,9.40971039 C137.776408,9.40971039 175.109742,6.27314026 224,0 L224,12.0441132 L0,12.0441132 L0,0 Z" />
          </svg>
        </div>
        <div className="px-4 py-16 sm:max-w-xl md:max-w-4xl lg:max-w-4xl md:px-24 lg:px-16 lg:py-20">
          <h1 className="text-5xl font-bold leading-tight">
            Build a personal brand that resonates
          </h1>
          <p className="mt-4 mb-8">
            Get a personal branding strategy in 20 seconds using AI.{" "}
          </p>
          <div className="max-w-md flex rounded-lg overflow-hidden">
            <div className="flex-grow flex-shrink flex items-center">
              <div className="flex md:flex-row flex-col items-center space-x-4">
                <a
                  className="btn btn-accent hover:bg-accent/80 w-64 text-white"
                  href="/groq/llama/app"
                >
                  <NotebookPen className="w-6 h-6" />
                  Get your strategy
                </a>
                <a className="btn btn-ghost text-content" href="/home">
                  Other demo apps
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          <div className="mt-5 flex  ">
            <SocialProof text={"Trusted by Elon Musk"} color={"text-accent"} />
          </div>
          <p className="max-w-mdtext-xs font-thin tracking-wide sm:text-sm">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium.
          </p>
        </div>

        <div className="lg:w-full flex flex-col items-center justify-center gap-10">
          <Media seen={false} />

          <div className="flex flex-row">
            <div className="flex justify-center items-center">
              <video
                className="rounded-3xl w-full sm:w-[60rem] border-4 md:border-8 border-base-content/20"
                autoPlay
                muted
                loop
                playsInline
                controls
                width="1000"
              >
                <source
                  src="https://d3cka28z30w0vx.cloudfront.net/newfulldemo.mp4"
                  type="video/webm"
                />
                <source
                  src="https://d3cka28z30w0vx.cloudfront.net/newfulldemo.mp4"
                  type="video/mp4"
                />
              </video>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
