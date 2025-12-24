import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PurpleSeam – Platform for Women’s Ethnic Apparel",
  description:
    "PurpleSeam is an end-to-end platform for Indian boutiques and ethnic apparel brands to manage catalog, storefront, logistics, and marketing.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
