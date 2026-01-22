"use client";
import React, { createContext, useContext, useState } from "react";
import { releases } from "@/lib/mockData"; // データ元を読み込み

type Track = {
    id: string;
    title: string;
    artist: string;
    image: string;
    audio: string;
    genre?: string;
    duration?: string;
};

type PlayerContextType = {
    currentTrack: Track | null;
    isPlaying: boolean;
    playTrack: (track: Track) => void;
    togglePlay: () => void;
    playNext: () => void; // 追加
    playPrev: () => void; // 追加
};

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export function PlayerProvider({ children }: { children: React.ReactNode }) {
    const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const playTrack = (track: Track) => {
        setCurrentTrack(track);
        setIsPlaying(true);
    };

    const togglePlay = () => {
        setIsPlaying(!isPlaying);
    };

    // 次の曲へ
    const playNext = () => {
        if (!currentTrack) return;
        const currentIndex = releases.findIndex((r) => r.id === currentTrack.id);
        const nextIndex = (currentIndex + 1) % releases.length; // 最後の曲なら最初に戻る
        playTrack(releases[nextIndex]);
    };

    // 前の曲へ
    const playPrev = () => {
        if (!currentTrack) return;
        const currentIndex = releases.findIndex((r) => r.id === currentTrack.id);
        const prevIndex = (currentIndex - 1 + releases.length) % releases.length; // 最初の曲なら最後に戻る
        playTrack(releases[prevIndex]);
    };

    return (
        <PlayerContext.Provider value={{ currentTrack, isPlaying, playTrack, togglePlay, playNext, playPrev }}>
            {children}
        </PlayerContext.Provider>
    );
}

export function usePlayer() {
    const context = useContext(PlayerContext);
    if (!context) throw new Error("usePlayer must be used within a PlayerProvider");
    return context;
}