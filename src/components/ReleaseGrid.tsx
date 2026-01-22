"use client";
import { Play, Download } from "lucide-react";
import Image from "next/image";
import { usePlayer } from "@/context/PlayerContext";

type ReleaseGridProps = {
    releases?: any[]; // ? をつけて「なくてもOK」にする
};

// ↓ { releases = [] } に変更。これでデータが来なくてもエラーになりません
export function ReleaseGrid({ releases = [] }: ReleaseGridProps) {
    const { playTrack } = usePlayer();

    return (
        <section className="p-4 md:p-8">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">Popular Releases</h2>
                <button className="text-[#FF3E3E] text-sm font-bold hover:underline">View All Releases</button>
            </div>

            {releases.length === 0 ? (
                <div className="text-center py-20 text-gray-500">
                    No tracks found matching your search.
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                    {releases.map((release) => (
                        <div key={release.id} className="group cursor-pointer hover:-translate-y-1 active:scale-95 transition-transform duration-200">
                            <div className="relative aspect-square rounded-lg overflow-hidden mb-3 bg-gray-200 shadow-sm group-hover:shadow-xl transition-shadow duration-300">
                                <Image
                                    src={release.image}
                                    alt={release.title}
                                    fill
                                    className="object-cover transition-transform duration-500 ease-out md:group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-transparent md:bg-black/40 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-4 pointer-events-none md:pointer-events-auto backdrop-blur-none md:backdrop-blur-[2px]">
                                    {/* Mobile: Play button always visible, clickable via parent or dedicated touch? 
                                        Issue: If pointer-events-none on mobile overlay, buttons won't work?
                                        Actually, we want buttons to be clickable.
                                        Let's keep pointer-events-auto (default).
                                    */}
                                    <button
                                        onClick={() => playTrack(release)}
                                        className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-[#FF3E3E] flex items-center justify-center text-white md:hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg shadow-red-500/40 pointer-events-auto"
                                    >
                                        <Play size={20} className="md:w-6 md:h-6" fill="white" />
                                    </button>
                                    <a
                                        href={release.audio}
                                        download={`${release.title}.mp3`}
                                        onClick={(e) => e.stopPropagation()}
                                        className="hidden md:flex w-10 h-10 rounded-full bg-white items-center justify-center text-black hover:bg-gray-100 active:scale-95 transition-all duration-200 pointer-events-auto shadow-lg"
                                    >
                                        <Download size={20} />
                                    </a>
                                </div>
                                <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-bold text-white uppercase tracking-wider shadow-sm">
                                    {release.genre}
                                </div>
                            </div>
                            <h3 className="font-bold text-gray-900 truncate text-sm md:text-base">{release.title}</h3>
                            <p className="text-xs md:text-sm text-gray-500 truncate">{release.artist}</p>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}