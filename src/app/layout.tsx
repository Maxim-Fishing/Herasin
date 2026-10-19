import type { Metadata } from "next";
import { Chelsea_Market, Fredoka, Kaushan_Script, Quicksand } from "next/font/google";
import "./globals.css";
import { DataProvider } from "@/lib/store";
import { SITE_URL } from "@/lib/assets";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BrandBackdrop from "@/components/BrandBackdrop";
import FloatingWhatsapp from "@/components/FloatingWhatsapp";

// Tipografía de la marca: «Hera» → Kaushan Script (títulos), «resin» → Chelsea Market
// (rótulos pequeños), Fredoka para títulos chicos y Quicksand para el texto.
const quicksand = Quicksand({ variable: "--font-quicksand", subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const fredoka = Fredoka({ variable: "--font-fredoka", subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const kaushan = Kaushan_Script({ variable: "--font-kaushan", subsets: ["latin"], weight: "400" });
const chelsea = Chelsea_Market({ variable: "--font-chelsea", subsets: ["latin"], weight: "400" });

const description =
  "Recordatorios, llaveros, termos, agendas y cuadros personalizados, hechos a mano en resina desde Neiva, Huila. Envíos a todo el país.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL + "/"),
  title: {
    default: "HERARESIN · Detalles personalizados hechos a mano",
    template: "%s · HERARESIN",
  },
  description,
  openGraph: {
    title: "HERARESIN · Detalles personalizados hechos a mano",
    description,
    siteName: "HERARESIN",
    locale: "es_CO",
    type: "website",
    images: [{ url: "marca/compartir.jpg", width: 1200, height: 630, alt: "HERARESIN" }],
  },
  twitter: { card: "summary_large_image", images: ["marca/compartir.jpg"] },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${quicksand.variable} ${fredoka.variable} ${kaushan.variable} ${chelsea.variable} antialiased`}>
      <body className="bg-hearts flex min-h-screen flex-col">
        <BrandBackdrop />
        <DataProvider>
          <Header />
          {/* Marco de la marca: punteado café sobre rosa con corazones, como en tus artes */}
          <div className="page-frame flex flex-1 flex-col">
            <main className="flex-1">{children}</main>
            <Footer />
            <div aria-hidden className="pointer-events-none absolute bottom-2 right-3 flex items-end gap-0.5 leading-none md:bottom-3 md:right-5">
              <span className="text-2xl text-lila-500">★</span>
              <span className="mb-1 text-lg text-lila-400">★</span>
              <span className="text-3xl text-[#e08fe6]">★</span>
            </div>
          </div>
          <FloatingWhatsapp />
        </DataProvider>
      </body>
    </html>
  );
}
