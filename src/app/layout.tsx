"use client";

import { Montserrat } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/hooks/useAuth";
import { PostsProvider } from "@/hooks/usePosts";

import { ToastContainer } from "react-toastify";

import { SocketEvents } from "@/components/SocketEvents";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${montserrat.variable} bg-[url('/background.png')] bg-cover bg-center antialiased`}
      >
        <AuthProvider>
          <PostsProvider>
            <SocketEvents />
            {children}
          </PostsProvider>
        </AuthProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
