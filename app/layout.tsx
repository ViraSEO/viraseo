import Providers from "./providers";
import "./globals.css";

export const metadata = {
  title: "ViraSEO - AI YouTube SEO & Growth Chrome Extension",
  description:
    "Generate AI YouTube titles, descriptions, tags, SEO insights and growth recommendations directly inside YouTube Studio with the ViraSEO Chrome Extension.",
  keywords: [
    "ViraSEO",
    "YouTube SEO tool",
    "AI YouTube SEO",
    "YouTube title generator",
    "YouTube tag generator",
    "YouTube Chrome extension",
    "YouTube growth tool",
    "AI title generator",
    "YouTube Studio extension",
  ],
  authors: [{ name: "ViraSEO" }],
  creator: "ViraSEO",
  publisher: "ViraSEO",
  openGraph: {
    title: "ViraSEO - AI YouTube SEO & Growth Chrome Extension",
    description:
      "AI-powered YouTube SEO tools directly inside YouTube Studio. Generate titles, tags, descriptions and growth insights with ViraSEO.",
    url: "https://viraseo.vercel.app",
    siteName: "ViraSEO",
    images: [
      {
        url: "https://viraseo.vercel.app/viraseo-logo.png",
        width: 1200,
        height: 630,
        alt: "ViraSEO AI YouTube SEO Chrome Extension",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ViraSEO - AI YouTube SEO & Growth Chrome Extension",
    description:
      "Generate AI YouTube titles, tags, descriptions and SEO insights directly inside YouTube Studio.",
    images: ["https://viraseo.vercel.app/viraseo-logo.png"],
  },
  robots: {
    index: true,
    follow: true,
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