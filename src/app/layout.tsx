import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Que Cookies | Cookies en Banfield",
  description: "Cookies estilo New York y mini cookies. Retiro en Banfield y envíos a coordinar por WhatsApp.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es-AR"><body>{children}</body></html>;
}
