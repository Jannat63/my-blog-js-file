import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Ahsan's Blog",
  description: "Minimal thoughts & modern writing.",
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