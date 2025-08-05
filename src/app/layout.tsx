import "@/app/globals.css";
import type { Metadata } from "next";
import { inter, playfairDisplay } from "@/utils/font";
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import { AppApolloProvider } from "@/context/AppApolloProvider";
import Navigations from "@/features/header/components/Navigations";
import { AuthProvider } from "@/context/AuthProvider";

export const metadata: Metadata = {
  title:
    "EurasiaPeace - Comprendre et construire des ponts entre l'Europe et l'Asie",
  description:
    "Organisation dédiée à la recherche, l'analyse et le dialogue pour promouvoir la paix et la compréhension entre l'Europe et l'Asie",
  keywords: [
    "EurasiaPeace",
    "Think Tank",
    "Géopolitique",
    "Recherche",
    "Analyse",
  ],
  openGraph: {
    title:
      "EurasiaPeace - Comprendre et construire des ponts entre l'Europe et l'Asie",
    description:
      "Organisation dédiée à la recherche, l'analyse et le dialogue pour promouvoir la paix et la compréhension entre l'Europe et l'Asie",
    url: "https://www.eurasiapeace.org",
    siteName: "EurasiaPeace",
  },
  robots: {
    index: true,
    follow: true,
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
        <AuthProvider>
          <AppApolloProvider>
            <div className="flex flex-col min-h-screen">
              <Header>
                <Navigations />
              </Header>
              <main>{children}</main>
              <Footer />
            </div>
          </AppApolloProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
