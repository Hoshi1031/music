"use client";
import { Search, ChevronDown } from "lucide-react";
import { genres, moods } from "@/lib/mockData";

// 親から受け取るデータの型定義
type HeaderProps = {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    selectedGenre: string;
    setSelectedGenre: (genre: string) => void;
    selectedMood: string;
    setSelectedMood: (mood: string) => void;
};

export function Header({
    searchQuery,
    setSearchQuery,
    selectedGenre,
    setSelectedGenre,
    selectedMood,
    setSelectedMood,
}: HeaderProps) {
    return (
        <header className="sticky top-0 z-30 bg-[#F8F9FA]/90 backdrop-blur-md px-4 py-4 md:px-8 flex flex-col md:flex-row items-stretch md:items-center justify-between border-b border-gray-200 gap-3 md:gap-0">
            {/* Search Input */}
            <div className="relative w-full md:max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                    type="text"
                    placeholder="Search Tracks & Artists"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-full text-sm focus:outline-none focus:border-[#FF3E3E] focus:ring-1 focus:ring-[#FF3E3E] transition shadow-sm"
                />
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 md:gap-4">
                {/* Genre Dropdown */}
                <div className="relative">
                    <select
                        value={selectedGenre}
                        onChange={(e) => setSelectedGenre(e.target.value)}
                        className="w-full appearance-none bg-white py-3 pl-4 pr-10 border border-gray-200 rounded-full text-sm font-medium text-gray-600 focus:outline-none focus:border-[#FF3E3E] focus:ring-1 focus:ring-[#FF3E3E] cursor-pointer transition shadow-sm hover:shadow-md"
                    >
                        {genres.map((genre) => (
                            <option key={genre} value={genre}>
                                {genre === "All Genres" ? "All Genres" : genre}
                            </option>
                        ))}
                    </select>
                    <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>

                {/* Mood Dropdown */}
                <div className="relative">
                    <select
                        value={selectedMood}
                        onChange={(e) => setSelectedMood(e.target.value)}
                        className="w-full appearance-none bg-white py-3 pl-4 pr-10 border border-gray-200 rounded-full text-sm font-medium text-gray-600 focus:outline-none focus:border-[#FF3E3E] focus:ring-1 focus:ring-[#FF3E3E] cursor-pointer transition shadow-sm hover:shadow-md"
                    >
                        {moods.map((mood) => (
                            <option key={mood} value={mood}>
                                {mood === "All Moods" ? "All Moods" : mood}
                            </option>
                        ))}
                    </select>
                    <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
            </div>
        </header>
    );
}