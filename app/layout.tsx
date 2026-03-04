import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Ahsan Jannat Blog",
  description:
    "Writing about development, design and the internet. A minimalist digital garden by Ahsan Jannat.",

  openGraph: {
    title: "Ahsan Jannat Blog",
    description:
      "Writing about development, design and the internet. A minimalist digital garden by Ahsan Jannat.",
    url: "https://ahsansblog.netlify.app",
    siteName: "Ahsan Blog",
    images: [
      {
        url: "https://ahsansblog.netlify.app/og-image.png",
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
    images: ["https://ahsansblog.netlify.app/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900 antialiased">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}