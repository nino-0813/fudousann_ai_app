import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://fukuyama-ai-estate.vercel.app";
  const routes = [
    "",
    "/estimate",
    "/result",
    "/market",
    "/guide",
    "/cases",
    "/company",
    "/dashboard",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
