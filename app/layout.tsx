import Providers from "./providers";
import "./globals.css";

export const metadata = {
  title: "ViraSEO",
  description: "Professional YouTube SEO Platform",
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