import type { Metadata } from "next";
import { Fredoka, Pacifico, Quicksand } from "next/font/google";
import "./globals.css";
import { DataProvider } from "@/lib/store";
import { SITE_URL } from "@/lib/assets";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Tipografía: títulos redondeados (Fredoka), cuerpo suave (Quicksand) y
// un script para destacar palabras, en la línea del logo (Pacifico).
const quicksand = Quicksand({ variable: "--font-quicksand", subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const fredoka = Fredoka({ variable: "--font-fredoka", subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const pacifico = Pacifico({ variable: "--font-pacifico", subsets: ["latin"], weight: "400" });

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
    <html lang="es" className={`${quicksand.variable} ${fredoka.variable} ${pacifico.variable} antialiased`}>
      <body className="flex min-h-screen flex-col">
        <DataProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </DataProvider>
      </body>
    </html>
  );
}
