import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/hooks/useAuth";
import { PostsProvider } from "@/hooks/usePosts";

import { ToastContainer } from "react-toastify";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Comunidade Zion Church",
  description: "Comunidade Zion Church",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${montserrat.variable} antialiased`}>
        <AuthProvider>
          <PostsProvider>{children}</PostsProvider>
        </AuthProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
