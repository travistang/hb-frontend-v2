import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MainMenu from "@/components/layout/main-menu";
import { getAuthState } from "@/lib/auth";
import { cookies } from "next/headers";

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
  const auth = await getAuthState();
  const cookieStore = await cookies();
  const profilePicture = cookieStore.get("profilePicture")?.value ?? null;

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
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans">
          <main className="min-h-screen w-full flex-col items-center justify-center py-10 px-16 bg-white">
            <MainMenu
              isLoggedIn={auth.isLoggedIn}
              profilePicture={profilePicture}
            />
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
