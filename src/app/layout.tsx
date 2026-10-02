import type { Metadata, Viewport } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { business } from "@/config/business";
import { Providers } from "./providers";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import "./globals.css";

const sans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});
const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${business.name} | Tu próximo antojo en Banfield`,
    template: `%s | ${business.name}`,
  },
  description:
    "Cookies estilo New York y mini cookies. Retiro en Banfield y envíos a coordinar por WhatsApp.",
  icons: {
    apple: {
      url: "/brand/favicon-180.png",
      sizes: "180x180",
      type: "image/png",
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-AR">
      <body
        className={`flex flex-col min-h-screen ${sans.variable} ${display.variable} antialiased`}
      >
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-cream focus:p-3"
        >
          Saltar al contenido
        </a>
        <Providers>
          <Header />
          <main className="flex-1" id="contenido">
            {children}
          </main>
          <Footer />
          <MobileBottomNav />
        </Providers>
      </body>
    </html>
  );
}
