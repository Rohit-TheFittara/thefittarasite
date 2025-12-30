import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MetaPixel from "./components/MetaPixel";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PurpleSeam – Platform for Women’s Ethnic Apparel",
  description:
    "PurpleSeam is an end-to-end platform for Indian boutiques and ethnic apparel brands to manage catalog, storefront, logistics, and marketing.",
  icons: {
    icon: "/LogoFittara.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MetaPixel />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1892564474801041&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
