import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Teatro dirbtuvėlė",
    short_name: "Teatro dirbtuvėlė",
    description: "Kūrybiniai teatro užsiėmimai vaikams ir jaunimui Vilniuje, Pavilnyje.",
    start_url: "/",
    display: "browser",
    lang: "lt",
    theme_color: "#4b174f",
    background_color: "#f8f0db",
  };
}
