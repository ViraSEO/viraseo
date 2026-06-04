import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://viraseo.vercel.app",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: "https://viraseo.vercel.app/privacy-policy",
      lastModified: new Date(),
    },
    {
      url: "https://viraseo.vercel.app/profile",
      lastModified: new Date(),
    },
    {
      url: "https://viraseo.vercel.app/tools",
      lastModified: new Date(),
    },
  ];
}