import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://sunnyplaste.co.uk"),
  title: {
    default: "SunnyPlaste UK | Plastic Packaging Manufacturer",
    template: "%s | SunnyPlaste UK",
  },
  description:
    "UK manufacturer of thermoformed plastic trays, containers and custom packaging. ISO 9001 & BRCGS certified. Request a quote today.",
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "SunnyPlaste UK",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400&display=swap"
          rel="stylesheet"
        />
        <style>{`
          :root {
            --font-manrope: 'Manrope', system-ui, sans-serif;
            --font-inter: 'Inter', system-ui, sans-serif;
            --font-jetbrains-mono: 'JetBrains Mono', monospace;
          }
        `}</style>
      </head>
      <body className="antialiased font-body">
        {children}
      </body>
    </html>
  );
}
