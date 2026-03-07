import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import Script from "next/script";

export const metadata = {
  metadataBase: new URL("https://ahsansblog.netlify.app"),

  title: "Ahsan Jannat Blog",
  description:
    "Writing about development, design and the internet. A minimalist digital garden by Ahsan Jannat.",

  verification: {
    google: "pC5ifp-SvCoNRqB2kPePKkuRSUOM6y_A-PGenzoopgs",
  },

  openGraph: {
    title: "Ahsan Jannat Blog",
    description:
      "Writing about development, design and the internet. A minimalist digital garden by Ahsan Jannat.",
    url: "https://ahsansblog.netlify.app",
    siteName: "Ahsan Blog",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Ahsan Jannat Blog",
    description:
      "Writing about development, design and the internet.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" id="top">
      <body className="bg-white text-gray-900 antialiased">

        <Navbar />

        {children}

        <BackToTop />

        {/* Google Translate Container */}
        <div id="google_translate_element" style={{ display: "none" }}></div>

        {/* Google Translate Init */}
        <Script id="google-translate-init" strategy="afterInteractive">
          {`
            function googleTranslateElementInit() {
              new google.translate.TranslateElement(
                { pageLanguage: 'en', includedLanguages: 'en,bn' },
                'google_translate_element'
              );
            }
          `}
        </Script>

        {/* Google Translate Script */}
        <Script
          src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          strategy="afterInteractive"
        />

        <Footer />

      </body>
    </html>
  );
}