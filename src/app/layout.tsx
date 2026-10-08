import type { Metadata } from "next";
import { Fraunces, Poppins } from "next/font/google";
import "./globals.css";
import { DataProvider } from "@/lib/store";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "HERARESIN · Detalles personalizados hechos a mano",
    template: "%s · HERARESIN",
  },
  description:
    "Forros, agendas, cuadernos, esferos, cuadros y retratos personalizados con sublimación y resina. Todo hecho a mano.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${poppins.variable} ${fraunces.variable} antialiased`}>
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
