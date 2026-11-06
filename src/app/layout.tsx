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
  title: "Brightfield Secondary School — Knowledge • Character • Excellence",
  description:
    "Official website of Brightfield Secondary School. O-Level & A-Level education with a 96% national exam pass rate. Admissions open for the new academic year.",
  keywords: [
    "secondary school",
    "school website",
    "admissions",
    "O-Level",
    "A-Level",
    "education",
    "school template",
  ],
  icons: {
    icon: "/school-logo-icon.png",
    apple: "/school-logo-apple.png",
  },
  openGraph: {
    title: "Brightfield Secondary School",
    description:
      "A modern secondary school where every student thrives — Knowledge, Character, Excellence.",
    siteName: "Brightfield Secondary School",
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
