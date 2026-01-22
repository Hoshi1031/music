import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import AudioPlayer from "@/components/AudioPlayer";
import MobileNav from "@/components/MobileNav";
import { PlayerProvider } from "@/context/PlayerContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "2AT Music",
  description: "Copyright Free Music",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-white`}>
        <PlayerProvider>
          <MobileNav />
          {/* サイドバーは固定(fixed)なので、場所を取らない */}
          <Sidebar />

          {/* メインコンテンツ：サイドバーの幅(260px)だけ左を空ける */}
          <main className="md:ml-[260px] min-h-screen flex flex-col relative bg-[#F8F9FA] text-black pt-16 md:pt-0">
            <div className="flex-1 pb-24">
              {children}
            </div>
            <AudioPlayer />
          </main>
        </PlayerProvider>
      </body>
    </html>
  );
}