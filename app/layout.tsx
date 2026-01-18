import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/shared/providers";
import { authConfig } from "@/config/auth";
import { getServerSession } from "next-auth";
import { Header } from "@/widgets/header";

export const metadata: Metadata = {
  title: "Mafia",
  description: "Mafia App",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await getServerSession(authConfig)
  console.log(session)

  return (
    <html lang="en" suppressHydrationWarning>
        <body
          className="antialiased relative min-h-[100dvh] flex flex-col"
        >
          <Providers session={session}>
            <Header/>
            <main className="flex-1">
              { children }
            </main>
          </Providers>
        </body>
    </html>
  );
}
