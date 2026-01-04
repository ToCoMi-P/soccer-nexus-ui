import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";

/////////////////////////

import { siteConfig } from "@/config/site";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toogle";
import { ClientFooter } from "@/components/footer";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning> 
      <head />
      <body className={`dark ${inter.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}> 
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ModeToggle />
          <SidebarProvider>
            <AppSidebar />
            <div className="flex flex-col flex-1 min-h-screen">
              <SidebarTrigger />
              <main className="flex-1 p-4">{children}</main>
              <ClientFooter />
            </div>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

