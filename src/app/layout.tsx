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
  title: "Mzinga Secondary School — Knowledge • Care • Excellence",
  description:
    "Official website of Mzinga Secondary School (Mzinga High School) — a private co-educational day and boarding school in Mzinga Ward, Ilala Municipal Council, Dar es Salaam, Tanzania. NECTA Centre S1383. O-Level (Form 1–4) and A-Level Arts (HGL, HKL, HGE, HGK). Admissions open.",
  keywords: [
    "Mzinga Secondary School",
    "Mzinga High School",
    "NECTA S1383",
    "secondary school Dar es Salaam",
    "Mzinga Ward Ilala",
    "admissions",
    "O-Level",
    "A-Level",
    "HGL HKL HGE HGK",
    "co-educational boarding school Tanzania",
  ],
  icons: {
    icon: "/logo.jpg",
    apple: "/logo.jpg",
  },
  openGraph: {
    title: "Mzinga Secondary School",
    description:
      "A strong foundation today, a brighter future tomorrow — quality O-Level and A-Level (Arts) education in Mzinga Ward, Ilala, Dar es Salaam.",
    siteName: "Mzinga Secondary School",
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
