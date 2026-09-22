import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Teatro dirbtuvėlė | Teatro užsiėmimai vaikams Vilniuje",
  description:
    "Kūrybinės teatro dirbtuvėlės vaikams ir jaunimui Pavilnio bendruomenės namuose.",
  metadataBase: new URL("https://teatrodirbtuvele.lt"),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "lt_LT",
    url: "/",
    title: "Teatro dirbtuvėlė",
    description: "Teatro užsiėmimai vaikams ir jaunimui Vilniuje.",
    siteName: "Teatro dirbtuvėlė",
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
