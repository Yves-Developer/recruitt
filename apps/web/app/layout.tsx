import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/theme-provider";
import { ThemeToggle } from "../components/theme-toggle";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Recruitt",
  description: "Recruitment platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${outfit.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative min-h-screen">
            <header className="absolute right-4 top-4 z-50">
              <ThemeToggle />
            </header>
            <main>{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
