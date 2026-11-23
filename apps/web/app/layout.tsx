import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { AuthProvider } from "@/contexts/auth-context";
import { CartProvider } from "@/contexts/cart-context";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "PrintShop Platform - Online Printing & Dropshipping",
  description: "Professional printing services, custom merchandise, and dropshipping for businesses and individuals",
  keywords: ["printing", "business cards", "flyers", "merchandise", "dropshipping", "custom products"],
  authors: [{ name: "PrintShop Platform" }],
  openGraph: {
    type: "website",
    locale: "en_GB",
    title: "PrintShop Platform",
    description: "Professional printing services and custom merchandise",
    siteName: "PrintShop Platform",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-GB"
      className={`${inter.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <AuthProvider>
          <CartProvider>
            <Header />
            {children}
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
