"use client";
import { usePlayer } from "@/context/PlayerContext";
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Download } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function AudioPlayer() {
    const { currentTrack, isPlaying, togglePlay, playNext, playPrev } = usePlayer();
    const audioRef = useRef<HTMLAudioElement>(null);

    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);

    // 曲が変わったら再生
    useEffect(() => {
        if (currentTrack && isPlaying && audioRef.current) {
            audioRef.current.play().catch((e) => console.log("Playback error:", e));
        } else if (!isPlaying && audioRef.current) {
            audioRef.current.pause();
        }
    }, [currentTrack, isPlaying]);

    // 音量変更
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    // 時間が進んだら更新
    const handleTimeUpdate = () => {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
        }
    };

    // 曲の長さを取得
    const handleLoadedMetadata = () => {
        if (audioRef.current) {
            setDuration(audioRef.current.duration);
        }
    };

    // 再生位置を変更（シークバー操作）
    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTime = parseFloat(e.target.value);
        setCurrentTime(newTime);
        if (audioRef.current) {
            audioRef.current.currentTime = newTime;
        }
    };

    // 時間表示フォーマット
    const formatTime = (time: number) => {
        if (isNaN(time)) return "0:00";
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    };

    // 進捗率（%）を計算（色がついてくるようにするため）
    const progressPercent = duration ? (currentTime / duration) * 100 : 0;
    const volumePercent = volume * 100;

    if (!currentTrack) return null;

    return (
        <div className="fixed bottom-0 left-0 md:left-[260px] right-0 h-24 md:h-20 bg-white/90 backdrop-blur-xl border-t border-white/20 shadow-[0_-4px_30px_rgba(0,0,0,0.04)] flex items-center px-4 md:px-6 justify-between z-[9999] transition-all duration-500">
            <audio
                ref={audioRef}
                src={currentTrack.audio}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={playNext}
            />

            {/* 左側：曲情報 */}
            <div className="flex items-center gap-2 md:gap-4 md:w-1/4 md:min-w-[200px] flex-shrink-1 min-w-0 pr-4">
                <div className="relative w-10 h-10 md:w-12 md:h-12 rounded overflow-hidden bg-gray-200 flex-shrink-0">
                    <Image src={currentTrack.image} alt={currentTrack.title} fill className="object-cover" />
                </div>
                <div className="overflow-hidden min-w-0">
                    <h4 className="font-bold text-sm text-gray-900 truncate">{currentTrack.title}</h4>
                    <p className="text-xs text-gray-500 truncate">{currentTrack.artist}</p>
                </div>
            </div>

            {/* 中央：コントロール & 再生バー */}
            <div className="flex flex-col items-center gap-1 flex-1 max-w-2xl px-2">
                <div className="flex items-center gap-4 md:gap-6">
                    <button onClick={playPrev} className="text-gray-400 hover:text-gray-900 transition">
                        <SkipBack size={20} />
                    </button>
                    <button
                        onClick={togglePlay}
                        className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#FF3E3E] flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-all duration-200 shadow-lg shadow-red-500/40"
                    >
                        {isPlaying ? <Pause size={20} fill="white" /> : <Play size={20} fill="white" className="ml-1" />}
                    </button>
                    <button onClick={playNext} className="text-gray-400 hover:text-gray-900 transition">
                        <SkipForward size={20} />
                    </button>
                </div>

                <div className="w-full flex items-center gap-2 md:gap-3 text-xs text-gray-500 font-medium">
                    <span className="hidden md:block w-8 text-right">{formatTime(currentTime)}</span>

                    {/* 改良版：再生バー（input type="range"を使用） */}
                    <input
                        type="range"
                        min="0"
                        max={duration || 0}
                        value={currentTime}
                        onChange={handleSeek}
                        className="flex-1 h-1 rounded-lg appearance-none cursor-pointer"
                        style={{
                            // ここで背景色を動的に変えています（左側が赤、右側がグレー）
                            background: `linear-gradient(to right, #FF3E3E ${progressPercent}%, #e5e7eb ${progressPercent}%)`
                        }}
                    />

                    <span className="hidden md:block w-8">{formatTime(duration)}</span>
                </div>
            </div>

            {/* 右側：音量 & ダウンロード (スマホでは非表示) */}
            <div className="hidden md:flex items-center gap-4 w-1/4 justify-end min-w-[200px]">
                <div className="flex items-center gap-2 group">
                    <button onClick={() => setVolume(volume === 0 ? 1 : 0)}>
                        {volume === 0 ? <VolumeX size={20} className="text-gray-400" /> : <Volume2 size={20} className="text-gray-500" />}
                    </button>

                    {/* 改良版：音量バー */}
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={volume}
                        onChange={(e) => setVolume(parseFloat(e.target.value))}
                        className="w-20 h-1 rounded-lg appearance-none cursor-pointer"
                        style={{
                            // ここで背景色を動的に変えています
                            background: `linear-gradient(to right, #FF3E3E ${volumePercent}%, #d1d5db ${volumePercent}%)`
                        }}
                    />
                </div>

                <a
                    href={currentTrack.audio}
                    download={`${currentTrack.title}.mp3`}
                    className="flex items-center gap-2 px-3 py-1 border border-gray-300 rounded-full text-xs font-bold hover:bg-gray-50 transition text-gray-700"
                >
                    <Download size={14} /> Download
                </a>
            </div>
        </div>
    );
}