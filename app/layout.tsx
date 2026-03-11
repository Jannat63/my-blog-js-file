import "./globals.css";
import LayoutClient from "./layoutClient";

export const metadata = {
  metadataBase: new URL("https://ahsansblog.netlify.app"),

  title: "Ahsan Jannat Blog",
  description:
    "Writing about development, design and the internet. A minimalist digital garden by Ahsan Jannat.",

  verification: {
    google: "pC5ifp-SvCoNRqB2kPePKkuRSUOM6y_A-PGenzoopgs",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      "max-image-preview": "large",
    },
  },

  openGraph: {
    title: "Ahsan Jannat Blog",
    description:
      "Writing about development, design and the internet.",
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

      <head>
        {/* Performance improvement: preload main OG image */}
        <link
          rel="preload"
          as="image"
          href="/og-image.png"
        />
      </head>

      <body className="bg-white text-gray-900 antialiased">

        <LayoutClient>
          {children}
        </LayoutClient>

      </body>

    </html>
  );
}