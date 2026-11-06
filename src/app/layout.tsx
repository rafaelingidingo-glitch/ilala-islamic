import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ilala Islamic Secondary School — Elimu Bora • Malezi ya Kiislamu",
  description:
    "Official website of Ilala Islamic Secondary School — a private Islamic day and boarding school in Amana, Ilala, Dar es Salaam. NECTA Centre S2348. Nursery to Form 6 mixed secondary school (boys and girls). Admissions open.",
  keywords: [
    "Ilala Islamic Secondary School",
    "Islamic school Dar es Salaam",
    "NECTA S2348",
    "mixed secondary school",
    "Amana Ilala",
    "admissions",
    "O-Level",
    "A-Level",
    "Islamic education Tanzania",
  ],
  icons: {
    icon: "/school-logo-icon.png",
    apple: "/school-logo-apple.png",
  },
  openGraph: {
    title: "Ilala Islamic Secondary School",
    description:
      "Quality education and excellent Islamic upbringing — Elimu Bora • Malezi ya Kiislamu — Nursery to Form 6 in Amana, Ilala, Dar es Salaam.",
    siteName: "Ilala Islamic Secondary School",
    type: "website",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
