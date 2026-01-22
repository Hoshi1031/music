"use client";
import { useState } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ReleaseGrid } from "@/components/ReleaseGrid";
import { releases } from "@/lib/mockData";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All Genres");
  const [selectedMood, setSelectedMood] = useState("All Moods");

  // フィルタリングロジック
  const filteredReleases = releases.filter((release) => {
    // 1. テキスト検索（空っぽなら無条件でOKにする）
    const matchesSearch =
      searchQuery === "" ||
      release.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      release.artist.toLowerCase().includes(searchQuery.toLowerCase());

    // 2. ジャンル検索
    const matchesGenre =
      selectedGenre === "All Genres" || release.genre === selectedGenre;

    // 3. ムード検索
    const matchesMood = selectedMood === "All Moods";

    return matchesSearch && matchesGenre && matchesMood;
  });

  return (
    <div className="flex flex-col">

      {/* Mobile: Hero first, then Search. Desktop: Search (Header) first, then Hero. */}
      {/* We want Hero above Header on Mobile. */}
      <div className="flex flex-col md:flex-col-reverse"> {/* Wait, flex-col means normal order. flex-col-reverse means reversed. */}
        {/* Item 1 */}
        {/* Hero should be first on mobile? Yes. */}
        {/* Header should be second on mobile? Yes. */}

        {/* Desktop: Header should be first (sticky), Hero second. */}
        {/* So if HTML order is Hero then Header: */}
        {/* Mobile (flex-col): Hero, Header. Correct. */}
        {/* Desktop (flex-col-reverse): Header, Hero. Correct. */}

        {/* Hero */}
        <div className="relative">
          <Hero />
        </div>

        {/* Header (Search) */}
        <div className="sticky top-[64px] md:sticky md:top-0 z-30">
          <Header
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedGenre={selectedGenre}
            setSelectedGenre={setSelectedGenre}
            selectedMood={selectedMood}
            setSelectedMood={setSelectedMood}
          />
        </div>
      </div>

      <ReleaseGrid releases={filteredReleases} />
    </div>
  );
}
