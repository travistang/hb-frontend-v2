import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MainMenu from "@/components/layout/main-menu";
import { ReactQueryProvider } from "@/lib/query-client";
import userService from "@/services/user-service";
import { EnvironmentBadge } from "@/components/dev/environment-badge";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hiking Buddies",
  description: "Discover incredible landscapes while making new friends",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const me = await userService.getMe();

  return (
    <html lang="en">
      <head>
        <link
          rel="apple-touch-icon"
          type="image/png"
          sizes="180x180"
          href="/apple-touch-icon.adfa657da1d7.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.6da47c6ba506.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.6159b014ab6d.png"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReactQueryProvider>
          <EnvironmentBadge />
          <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans">
            <main className="min-h-screen w-full flex-col items-center justify-center py-10 px-16 bg-white">
              <MainMenu
                isLoggedIn={me !== null}
                profilePicture={me?.profile_picture?.[0] ?? null}
              />
              {children}
            </main>
          </div>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
