import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

import { Header } from "@/components/nav";
import { Toaster } from "@/components/ui/sonner";
import { TanstackProvider } from "@/components/providers/tanstack-provider";
import { COMPANY_NAME } from "@/info";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const mainFont = Poppins({
  weight: ["300", "400"],
  variable: "--font-main",
});

export const metadata: Metadata = {
  title: {
    default: COMPANY_NAME,
    template: `%s | ${COMPANY_NAME}`,
  },
  description: "Weather app for your city",
  appleWebApp: {
    title: COMPANY_NAME,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`min-h-screen bg-background antialiased ${inter.variable} ${mainFont.variable}`}
      >
        <TanstackProvider>
          <Header />
          {children}
          <Toaster />
        </TanstackProvider>
      </body>
    </html>
  );
}
