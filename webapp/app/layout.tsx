import './globals.css';
import type { Metadata } from 'next';
import { Raleway } from 'next/font/google';
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { ClerkProvider } from '@clerk/nextjs'

const raleway = Raleway({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'DiaCare - 24/7 real-time support for diabetic patients. ',
  description: 'A comprehensive platform for diabetes management, support, and information.'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
    <html lang="en" suppressHydrationWarning>
      <body className={raleway.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  </ClerkProvider>
  );
}