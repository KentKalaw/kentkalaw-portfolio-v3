import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip"
import { FloatingNavbar } from "@/components/navbar/navbar";
// import { ChatDialog } from "@/components/chat";
// import { FloatingNavbar } from "@/components/navbar/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ['latin'], 
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: "Kent Kalaw - Software Developer",
  description: "Kent Kalaw's personal portfolio website.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} antialiased transition-all duration-600 ease-in-out`}
      >
       <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <FloatingNavbar />
            <TooltipProvider>{children}</TooltipProvider>
            {/* <ChatDialog /> */}
          </ThemeProvider>
          <Toaster />
      </body>
    </html>
  );
}
