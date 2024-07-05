export default function Apps() {
  const tools = [
    {
      href: "/openai/gpt",
      title: "JSON or text with GPT",
      tags: ["OpenAI", "GPT-3.5/4o"],
      image: "/apps/gpt.webp",
      description:
        "Use GPT to return structured marketing ideas in structured JSON format. Store data in Supabase",
    },
    {
      href: "/openai/dalle",
      title: "Logos with DALL·E",
      tags: ["OpenAI", "DALL·E 2/3"],
      image: "/apps/dalle.webp",
      description:
        "Generate images using DALL·E. Store image in Cloudflare R2 & data in Supabase",
    },
    {
      href: "/openai/vision",
      title: "See with GPT-4o",
      tags: ["OpenAI", "GPT-4o"],
      image: "/apps/vision.webp",
      description:
        "Upload image to Cloudflare R2, use GPT-4o to generate descriptions & store data in Supabase",
    },
    {
      href: "/chat",
      title: "Chatbot with Memory",
      tags: ["OpenAI", "GPT-3.5/4"],
      image: "/apps/chat.webp",
      description:
        "Use Langchain, OpenAI & Supabase to build a customizable GPT-3/GPT-4 chatbot with memory",
    },
    {
      href: "/replicate/sdxl",
      title: "Images with SDXL",
      tags: ["Replicate", "SDXL"],
      image: "/apps/sdxl.webp",
      description:
        "Generate images using Stable Diffusion. Store image in Cloudflare R2 & data in Supabase",
    },
    {
      href: "/groq/llama",
      title: "JSON or text with LLaMA 3",
      tags: ["Groq", "LLaMA 3"],
      image: "/apps/llama.webp",
      description:
        "Use LlaMA3 to return a personal branding strategy in structured JSON format. Store data in Supabase",
    },

    {
      href: "/audio",
      title: "Transcribe with Whisper",
      tags: ["Whisper", "LLaMA 3"],
      image: "/apps/whisper.webp",
      description:
        "Transcribe audio into text using Whisper, then summarize into notes using LLaMA 3",
    },
    {
      href: "/pdf",
      title: "Ask your PDF",
      tags: ["OpenAI", "GPT-3.5/4o"],
      image: "/apps/pdf.webp",
      description:
        "Upload PDF to Cloudflare R2, store embeddings in Supabase & chat with it using GPT",
    },
    {
      href: "/claude",
      title: "JSON or text with Claude 3",
      tags: ["Anthropic", "Claude 3"],
      image: "/apps/claude.webp",
      description:
        "Use Claude 3 to return a business plan in structured JSON format. Store data in Supabase",
    },
    {
      href: "/voice",
      title: "Text to lifelike speech",
      tags: ["Elevenlabs", "Text to Speech"],
      image: "/apps/text-to-speech.webp",
      description:
        "Convert text to lifelike speech using 26+ languages and over 1000 voices, powered by ElevenLabs AI technology",
    },
  ];

  const getGridClass = () => {
    const itemCount = tools.length;
    if (itemCount >= 3) {
      return "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 justify-center items-stretch content-center";
    } else if (itemCount === 2) {
      return "grid grid-cols-1 sm:grid-cols-2 gap-8 justify-center items-stretch content-center";
    } else {
      return "grid grid-cols-1 gap-8 justify-center items-stretch content-center";
    }
  };

  return (
    <section id="demos">
      <div className="bg-base-100">
        <div className="p-2 sm:p-6 xl:max-w-7xl xl:mx-auto relative isolate overflow-hidden pb-0 flex flex-col justify-center items-center">
          <div className="py-10 w-full flex justify-center">
            <div className={getGridClass()}>
              {tools.map((tool, index) => (
                <a
                  key={index}
                  href={tool.href}
                  className="w-full flex justify-center"
                >
                  <div
                    className="
                  w-full h-full transition-all duration-500 ease-in-out bg-white border border-base-200 rounded-xl hover:-translate-y-1 p-4 flex flex-col items-center justify-center text-center"
                  >
                    <h3 className="text-lg font-semibold text-neutral-700 dark:text-neutral-300">
                      {tool.title}
                    </h3>
                    {tool.image && (
                      <img
                        src={tool.image}
                        alt={tool.title}
                        className="w-full h-auto border border-base-200 rounded-md mt-4 mb-4"
                      />
                    )}
                    <p className="max-w-lg text-sm text-neutral-400">
                      {tool.description}
                    </p>
                    <div className="mt-4 flex gap-y-1 flex-wrap justify-center space-x-2 overflow-auto scrollbar-hide ">
                      {tool.tags.map((tag, index) => (
                        <span
                          key={tag}
                          className={`border bg-base-100 text-base-content py-1 px-4 text-sm rounded-xl ${
                            tool.tags.length === 1
                              ? "w-full text-center"
                              : " md:w-auto"
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
