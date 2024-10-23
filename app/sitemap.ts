import { allPosts } from "contentlayer/generated";
import { type MetadataRoute } from "next";
import { appConfig } from "@/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = allPosts;

  const staticLinks = [
    "/blog",
    "/pdf",
    "/audio",
    "/chat",
    "/openai/gpt",
    "/openai/dalle",
    "/openai/vision",
    "/replicate/sdxl",
    "/groq/llama",
  ];

  return [
    {
      url: appConfig.company.homeUrl,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    ...staticLinks.map((path) => ({
      url: `${appConfig.company.homeUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.8,
    })),
    ...posts.map((post) => ({
      url: `${appConfig.company.homeUrl}/blog${post.slug}`,
      lastModified: new Date(post.date),
      priority: 0.7,
    })),
  ];
}
