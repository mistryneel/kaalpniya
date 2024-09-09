"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { twMerge } from "tailwind-merge";
import { Heading } from "./Heading";
import { Badge } from "./Badge";
import { AnimatePresence, motion } from "framer-motion";
import { IconLayoutSidebarRightCollapse } from "@tabler/icons-react";
import { isMobile } from "@/lib/utils";
import {
  IconMicrophone,
  IconFileText,
  IconMessage,
  IconPhoto,
  IconEye,
  IconBolt,
  IconMessage2,
  IconRobot,
  IconCurrencyDollar,
  IconLibrary,
  IconPencil,
} from "@tabler/icons-react";

type Navlink = {
  href: string;
  label: string;
  icon?: React.ReactNode | any;
};

const freeTools = [
  {
    href: "https://anotherwrapper.com/tools/llm-pricing",
    label: "LLM Pricing Comparison",
    icon: IconCurrencyDollar,
  },
  {
    href: "https://anotherwrapper.com/tools/ai-app-generator",
    label: "AI App Generator",
    icon: IconRobot,
  },
];

const navlinks = [
  {
    href: "/audio/app",
    label: "Audio AI",
    icon: IconMicrophone,
  },
  {
    href: "/groq/llama/app",
    label: "Groq Llama",
    icon: IconBolt,
  },
  {
    href: "/openai/gpt/app",
    label: "OpenAI GPT",
    icon: IconMessage,
  },
  {
    href: "/openai/dalle/app",
    label: "DALL-E",
    icon: IconPhoto,
  },
  {
    href: "/openai/vision/app",
    label: "Vision AI",
    icon: IconEye,
  },
  {
    href: "/replicate/sdxl/app",
    label: "Stable Diffusion XL",
    icon: IconPhoto,
  },
  {
    href: "/chat",
    label: "Chat AI",
    icon: IconMessage2,
  },
  {
    href: "/claude",
    label: "Claude AI",
    icon: IconRobot,
  },
  {
    href: "/pdf",
    label: "PDF AI",
    icon: IconFileText,
  },
  {
    href: "/voice",
    label: "Voice AI",
    icon: IconMicrophone,
  },
];

const landingPages = [
  {
    href: "/audio",
    label: "Audio AI",
    icon: IconMicrophone,
  },
  {
    href: "/groq/llama",
    label: "Groq Llama",
    icon: IconBolt,
  },
  {
    href: "/openai/gpt",
    label: "OpenAI GPT",
    icon: IconMessage,
  },
  {
    href: "/openai/dalle",
    label: "DALL-E",
    icon: IconPhoto,
  },
  {
    href: "/openai/vision",
    label: "Vision AI",
    icon: IconEye,
  },
  {
    href: "/replicate/sdxl",
    label: "Stable Diffusion XL",
    icon: IconPhoto,
  },
];

const otherLinks = [
  {
    href: "https://docs.anotherwrapper.com",
    label: "Documentation",
    icon: IconFileText,
  },
  {
    href: "https://anotherwrapper.lemonsqueezy.com/affiliates",
    label: "Affiliates Program",
    icon: IconCurrencyDollar,
  },
  {
    href: "https://anotherwrapper.com/blog",
    label: "Blog",
    icon: IconPencil,
  },
];
export const Sidebar = () => {
  const [open, setOpen] = useState(isMobile() ? false : true);

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: -200 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.2, ease: "linear" }}
            exit={{ x: -200 }}
            className="px-6  z-[100] py-10 bg-neutral-100 max-w-[14rem] lg:w-fit  fixed lg:relative  h-screen left-0 flex flex-col justify-between"
          >
            <div className="flex-1 overflow-auto no-scrollbar">
              <SidebarHeader />
              <Navigation setOpen={setOpen} />
            </div>
            <div onClick={() => isMobile() && setOpen(false)}>
              <Badge
                href="https://anotherwrapper.lemonsqueezy.com/buy/c1a15bd7-58b0-4174-8d1a-9bca6d8cb511"
                text="Build your startup"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <button
        className="fixed lg:hidden bottom-4 right-4 h-8 w-8 border border-neutral-200 rounded-full backdrop-blur-sm flex items-center justify-center z-50"
        onClick={() => setOpen(!open)}
      >
        <IconLayoutSidebarRightCollapse className="h-4 w-4 text-primary" />
      </button>
    </>
  );
};

export const Navigation = ({
  setOpen,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  return (
    <div className="flex flex-col space-y-1 my-10 relative z-[100]">
      <Heading as="p" className="text-sm md:text-sm lg:text-sm px-2">
        Demo apps
      </Heading>

      {navlinks.map((link: Navlink) => (
        <Link
          key={link.href}
          href={link.href}
          onClick={() => isMobile() && setOpen(false)}
          className={twMerge(
            "text-primary hover:text-primary/50 transition duration-200 flex items-center space-x-2 py-2 px-2 rounded-md text-sm",
            isActive(link.href) && "bg-white shadow-lg text-primary"
          )}
        >
          <link.icon
            className={twMerge(
              "h-4 w-4 flex-shrink-0",
              isActive(link.href) && "text-sky-500"
            )}
          />
          <span>{link.label}</span>
        </Link>
      ))}

      <Heading as="p" className="text-sm md:text-sm lg:text-sm pt-10 px-2">
        Landing pages
      </Heading>
      {landingPages.map((link: Navlink) => (
        <Link
          key={link.href}
          href={link.href}
          target="_blank"
          onClick={() => isMobile() && setOpen(false)}
          className={twMerge(
            "text-primary hover:text-primary/50 transition duration-200 flex items-center space-x-2 py-2 px-2 rounded-md text-sm",
            isActive(link.href) && "bg-white shadow-lg text-primary"
          )}
        >
          <link.icon
            className={twMerge(
              "h-4 w-4 flex-shrink-0",
              isActive(link.href) && "text-sky-500"
            )}
          />
          <span>{link.label}</span>
        </Link>
      ))}

      <Heading as="p" className="text-sm md:text-sm lg:text-sm pt-10 px-2">
        Free tools
      </Heading>
      {freeTools.map((link: Navlink) => (
        <Link
          key={link.href}
          href={link.href}
          target="_blank"
          className={twMerge(
            "text-primary hover:text-primary/50 transition duration-200 flex items-center space-x-2 py-2 px-2 rounded-md text-sm"
          )}
        >
          <link.icon
            className={twMerge(
              "h-4 w-4 flex-shrink-0",
              isActive(link.href) && "text-sky-500"
            )}
          />
          <span>{link.label}</span>
        </Link>
      ))}

      <Heading as="p" className="text-sm md:text-sm lg:text-sm pt-10 px-2">
        Other
      </Heading>
      {otherLinks.map((link: Navlink) => (
        <Link
          key={link.href}
          href={link.href}
          target="_blank"
          onClick={() => isMobile() && setOpen(false)}
          className={twMerge(
            "text-primary hover:text-primary/50 transition duration-200 flex items-center space-x-2 py-2 px-2 rounded-md text-sm",
            isActive(link.href) && "bg-white shadow-lg text-primary"
          )}
        >
          <link.icon
            className={twMerge(
              "h-4 w-4 flex-shrink-0",
              isActive(link.href) && "text-sky-500"
            )}
          />
          <span>{link.label}</span>
        </Link>
      ))}
    </div>
  );
};

const SidebarHeader = () => {
  return (
    <div className="flex space-x-2">
      <Link className="text-md text-black flex items-center" href="/">
        <Image
          src="/logo-text.png"
          alt="Logo"
          width={400}
          height={100}
          layout="fixed"
          quality={100}
          className="w-48"
        />
      </Link>
    </div>
  );
};
