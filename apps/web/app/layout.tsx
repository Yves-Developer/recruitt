import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/theme-provider";
import { ThemeToggle } from "../components/theme-toggle";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";
import { AuthProvider } from "@/components/providers/auth-provider";

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Recruitt",
  description: "Making hiring simple and efficient.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={cn("font-sans", inter.variable)}>
      <body className={`${outfit.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <TooltipProvider>
              <main>{children}</main>
              <Toaster position="top-center" richColors />
            </TooltipProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
