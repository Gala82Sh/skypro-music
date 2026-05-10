import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ReduxProvider from "@/store/ReduxProvider";
import ClientLayout from "@/components/ClientLayout/ClientLayout";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Skypro Music",
  description: "Music player",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <ReduxProvider>
          <ClientLayout>{children}</ClientLayout>
        </ReduxProvider>
      </body>
    </html>
  );
}