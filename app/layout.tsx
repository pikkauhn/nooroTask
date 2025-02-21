import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Image from "next/image";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Todo App",
  description: "Assessment for Nooro // Author: Zachary Burnsf",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased`}
      >
        <div className="Background">
          <header className="Header">
            <Image src="/logo.svg" alt="Todo Logo" width={226} height={48} />
          </header>
          <div className="Content-Container">
            <div className="Content">
              {children}
            </div>
          </div>
        </div>
      </body>
    </html >
  );
}
