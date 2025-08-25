import "@/app/globals.css";
import type { Metadata } from "next";
import { inter, playfairDisplay } from "@/utils/font";
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import Navigations from "@/features/header/components/Navigations";
import { AuthProvider } from "@/context/AuthProvider";
import NextTopLoader from "nextjs-toploader";

export const metadata: Metadata = {
  title: {
    default: "EurasiaPeace - Think Tank Géopolitique Eurasiatique",
    template: "%s - EurasiaPeace",
  },
  description:
    "Think-tank spécialisé dans l'analyse géopolitique de l'Eurasie. Centre de réflexion et de prospective sur la paix, proposant recherches, formations, conseils et publications sur les enjeux eurasiatiques.",
  keywords: [
    "EurasiaPeace",
    "think-tank",
    "géopolitique",
    "Eurasie",
    "recherche",
    "analyse géopolitique",
    "centre de réflexion",
    "prospective",
    "paix",
    "formations géopolitiques",
    "conseils stratégiques",
    "publications",
    "Europe",
    "Asie",
    "relations internationales",
    "sécurité internationale",
    "veilles géopolitiques",
    "cultures",
    "dialogue interculturel",
    "expertise géopolitique",
  ],
  authors: [{ name: "EurasiaPeace" }],
  creator: "EurasiaPeace",
  publisher: "EurasiaPeace",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_CLIENT_URL}`),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "EurasiaPeace - Think Tank Géopolitique Eurasiatique",
    description:
      "Centre de réflexion spécialisé dans l'analyse géopolitique de l'Eurasie. Recherches, formations et conseils sur les enjeux de paix et sécurité internationale.",
    url: process.env.NEXT_PUBLIC_CLIENT_URL,
    siteName: "EurasiaPeace",
    type: "website",
    locale: "fr_FR",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_CLIENT_URL}/eurasia-full-logo.webp`,
        width: 1200,
        height: 630,
        alt: "EurasiaPeace - Think Tank Géopolitique Eurasiatique",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EurasiaPeace - Think Tank Géopolitique Eurasiatique",
    description:
      "Centre de réflexion spécialisé dans l'analyse géopolitique de l'Eurasie.",
    images: [`${process.env.NEXT_PUBLIC_CLIENT_URL}/eurasia-full-logo.webp`],
    creator: "@EurasiaPeace",
    site: "@EurasiaPeace",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${inter.className} ${inter.variable} ${playfairDisplay.variable} font-sans min-h-screen`}
      >
        <NextTopLoader
          color="#084854"
          height={4}
          easing="ease"
          showSpinner={false}
        />
        <AuthProvider>
          <div className="flex flex-col min-h-screen">
            <Header>
              <Navigations />
            </Header>
            <main>{children}</main>
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
