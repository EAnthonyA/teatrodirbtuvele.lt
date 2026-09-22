import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Teatro dirbtuvėlė | Teatro užsiėmimai vaikams Vilniuje",
    template: "%s | Teatro dirbtuvėlė",
  },
  description:
    "Kūrybiniai teatro užsiėmimai 5-18 m. vaikams ir jaunimui Vilniuje, Pavilnyje. Žaidžiame, improvizuojame ir kuriame savo istorijas.",
  applicationName: "Teatro dirbtuvėlė",
  category: "Švietimas",
  metadataBase: new URL("https://teatrodirbtuvele.lt"),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "lt_LT",
    url: "/",
    title: "Teatro dirbtuvėlė | Teatro užsiėmimai vaikams Vilniuje",
    description:
      "Kūrybiniai teatro užsiėmimai 5-18 m. vaikams ir jaunimui Vilniuje, Pavilnyje.",
    siteName: "Teatro dirbtuvėlė",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1672,
        height: 941,
        alt: "Teatro dirbtuvėlė - teatro užsiėmimai vaikams ir jaunimui Vilniuje",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Teatro dirbtuvėlė | Teatro užsiėmimai vaikams Vilniuje",
    description:
      "Kūrybiniai teatro užsiėmimai 5-18 m. vaikams ir jaunimui Vilniuje, Pavilnyje.",
    images: ["/opengraph-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#c93e2f",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="lt">
      <body>{children}</body>
    </html>
  );
}
