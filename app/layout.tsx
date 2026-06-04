import Providers from "./providers";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ViraSEO - AI YouTube SEO & Growth Chrome Extension",
  description:
    "Generate AI YouTube titles, descriptions, tags, SEO insights and growth recommendations directly inside YouTube Studio with the ViraSEO Chrome Extension.",

  keywords: [
    "youtube seo",
    "youtube ai",
    "youtube growth",
    "youtube keyword tool",
    "youtube title generator",
    "youtube tags generator",
    "youtube analytics",
    "viraseo",
  ],

  openGraph: {
    title: "ViraSEO",
    description:
      "AI Powered YouTube Growth Tools for creators.",
    url: "https://viraseo.vercel.app",
    siteName: "ViraSEO",
    images: [
      {
        url: "https://viraseo.vercel.app/viraseo-logo.png",
        width: 512,
        height: 512,
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "ViraSEO",
    description:
      "AI Powered YouTube Growth Tools for creators.",
    images: ["https://viraseo.vercel.app/viraseo-logo.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
  <Providers>{children}</Providers>
</body>
    </html>
  );
}