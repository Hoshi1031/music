"use client";
import { releases } from "@/lib/mockData";
import { Play, Info, Download } from "lucide-react";
import Image from "next/image";
import { usePlayer } from "@/context/PlayerContext";
import Link from "next/link"; // Ensure Link is imported

// ↓ default を消して export function にしました
export function Hero() {
    const { playTrack } = usePlayer();

    // リストの一番最初の曲をトップ画像として使う
    const featured = releases[0];

    if (!featured) return null;

    return (
        <section className="hidden md:block relative w-full md:h-[400px] h-auto overflow-hidden group pb-12 md:pb-0">
            {/* Background Image */}
            <Image
                src={featured.image}
                alt="Featured Background"
                fill
                className="object-cover blur-sm scale-110 opacity-50"
            />

            {/* Black Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent/20" />

            {/* Content */}
            <div className="absolute inset-0 flex items-center px-6 md:px-12">
                <div className="w-full max-w-2xl mt-8 md:mt-0">
                    <span className="hidden md:inline-block px-3 py-1 mb-4 text-[10px] md:text-xs font-bold text-white bg-[#FF3E3E] rounded-sm uppercase tracking-wider shadow-lg shadow-red-500/20">
                        Featured Release
                    </span>
                    <h1 className="hidden md:block text-3xl md:text-6xl font-extrabold text-white mb-4 leading-tight break-words tracking-tighter drop-shadow-lg">
                        Welcome to 2AT.
                    </h1>
                    <p className="hidden md:block text-sm md:text-lg text-gray-200 mb-8 max-w-lg leading-relaxed drop-shadow-md font-medium">
                        I create original music with a focus on EDM / bass / melodic vibes, mixing seasonal moods and emotional energy into each track.
                    </p>

                    <div className="hidden md:flex flex-wrap items-center gap-3 md:gap-4">
                        <Link href="/about" className="flex items-center gap-2 px-4 md:px-6 py-3 text-sm font-bold text-white border border-white/30 rounded hover:bg-white/10 transition">
                            <Info size={18} />
                            <span className="whitespace-nowrap">About</span>
                        </Link>
                        <button
                            onClick={() => playTrack(featured)}
                            className="flex items-center gap-2 px-6 md:px-8 py-3 text-sm font-bold text-white bg-[#FF3E3E] rounded hover:bg-[#ff5e5e] transition shadow-lg hover:scale-105"
                        >
                            <Play size={18} fill="white" />
                            Play
                        </button>
                        <a
                            href={featured.audio}
                            download={`${featured.title}.mp3`}
                            className="flex items-center gap-2 px-4 md:px-6 py-3 text-sm font-bold text-[#FF3E3E] border border-[#FF3E3E] rounded hover:bg-[#FF3E3E]/10 transition"
                        >
                            <Download size={18} />
                            Download
                        </a>
                    </div>
                </div>

                {/* Right Side Image (Desktop Only) */}
                <div className="absolute right-20 top-1/2 -translate-y-1/2 hidden lg:block">
                    <div className="relative w-80 h-80 shadow-2xl rounded-lg overflow-hidden group-hover:scale-105 transition duration-500">
                        <Image
                            src={featured.image}
                            alt={featured.title}
                            fill
                            className="object-cover"
                        />
                        {/* Play Button Overlay */}
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                            <button
                                onClick={() => playTrack(featured)}
                                className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:scale-110 transition"
                            >
                                <Play size={32} fill="white" className="ml-1 text-white" />
                            </button>
                        </div>
                    </div>
                    <div className="text-right mt-4">
                        <h3 className="text-2xl font-bold text-white">{featured.title}</h3>
                        <p className="text-[#FF3E3E] font-medium">{featured.artist}</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
