"use client";
import { Play, Download, ChevronDown, Headphones } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePlayer } from "@/context/PlayerContext";
import { useState } from "react";

type SortOrder = "newest" | "oldest" | "popular";

type ReleaseGridProps = {
    releases?: any[];
    sortOrder?: SortOrder;
    onSortChange?: (sort: SortOrder) => void;
};

export function ReleaseGrid({ releases = [], sortOrder = "newest", onSortChange }: ReleaseGridProps) {
    const { playTrack } = usePlayer();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const sortLabels: Record<SortOrder, string> = {
        newest: "Newest",
        oldest: "Oldest",
        popular: "Popular",
    };

    const handleSortChange = (sort: SortOrder) => {
        onSortChange?.(sort);
        setIsDropdownOpen(false);
    };

    return (
        <section className="p-4 md:p-8">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">Popular Releases</h2>
                <div className="relative">
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="flex items-center gap-2 text-[#FF3E3E] text-sm font-bold hover:underline"
                    >
                        {sortLabels[sortOrder]}
                        <ChevronDown size={16} className={`transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
                    </button>
                    {isDropdownOpen && (
                        <div className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-xl border border-gray-100 py-2 min-w-[120px] z-50">
                            {(["newest", "oldest", "popular"] as SortOrder[]).map((sort) => (
                                <button
                                    key={sort}
                                    onClick={() => handleSortChange(sort)}
                                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition ${sortOrder === sort ? "text-[#FF3E3E] font-bold" : "text-gray-700"
                                        }`}
                                >
                                    {sortLabels[sort]}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
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
                                <div className="absolute inset-0 bg-transparent md:bg-black/40 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-3 pointer-events-none md:pointer-events-auto backdrop-blur-none md:backdrop-blur-[2px]">
                                    {/* YouTube Button (Left) - Only show if MV exists */}
                                    {release.youtubeUrl && (
                                        <a
                                            href={release.youtubeUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={(e) => e.stopPropagation()}
                                            className="hidden md:flex w-10 h-10 rounded-full bg-white items-center justify-center text-red-600 hover:bg-red-50 active:scale-95 transition-all duration-200 pointer-events-auto shadow-lg"
                                            title="Watch Music Video"
                                        >
                                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                                            </svg>
                                        </a>
                                    )}

                                    {/* Play Button (Center) */}
                                    <button
                                        onClick={() => playTrack(release)}
                                        className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-[#FF3E3E] flex items-center justify-center text-white md:hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg shadow-red-500/40 pointer-events-auto"
                                    >
                                        <Play size={20} className="md:w-6 md:h-6" fill="white" />
                                    </button>

                                    {/* Download Button (Right) */}
                                    <a
                                        href={release.audio}
                                        download={`${release.title}.mp3`}
                                        onClick={(e) => e.stopPropagation()}
                                        className="hidden md:flex w-10 h-10 rounded-full bg-white items-center justify-center text-black hover:bg-gray-100 active:scale-95 transition-all duration-200 pointer-events-auto shadow-lg"
                                    >
                                        <Download size={20} />
                                    </a>
                                </div>
                                <div className="absolute top-2 left-2 bg-gradient-to-r from-[#FF3E3E] to-[#FF6B6B] backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-wider shadow-lg shadow-red-500/20">
                                    {release.genre}
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <h3 className="font-bold text-gray-900 truncate text-sm md:text-base flex-1">{release.title}</h3>
                                {release.playCount && (
                                    <div className="flex items-center gap-1 text-[10px] text-gray-400 ml-2">
                                        <Headphones size={12} />
                                        <span>{release.playCount}</span>
                                    </div>
                                )}
                            </div>
                            <Link href="/about" className="text-xs md:text-sm text-gray-500 truncate hover:text-[#FF3E3E] transition-colors block">{release.artist}</Link>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}