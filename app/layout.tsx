import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { CustomCursor } from "@/components/cursor/CustomCursor";
import { DeveloperModeModal } from "@/components/easter-eggs/DeveloperModeModal";
import { ShockwaveClick } from "@/components/ui/ShockwaveClick";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GNANESH // Full Stack Developer & Software Engineer",
  description:
    "Portfolio of Gnanesh Reddy Maram — Full Stack Developer & Systems Engineer based in Nellore, India. Flagship builds: VIT-AP Nexus, ParkOS, Omertà.",
  keywords: [
    "Gnanesh Reddy Maram",
    "Gnanesh",
    "Full Stack Developer",
    "Software Engineer",
    "VIT-AP Nexus",
    "ParkOS",
    "Omerta",
    "Computer Vision",
    "Flutter",
    "FastAPI",
    "Next.js",
    "Portfolio",
  ],
  authors: [{ name: "Gnanesh Reddy Maram" }],
  openGraph: {
    title: "GNANESH — SYSTEMS / IDEAS / EXPERIENCES",
    description: "I build digital systems that turn complexity into clarity.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} dark`}>
      <body className="bg-[#08090b] text-[#f2f2f0] antialiased selection:bg-[#3e5cc9] selection:text-white">
        <SmoothScrollProvider>
          <CustomCursor />
          <ShockwaveClick />
          <DeveloperModeModal />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
