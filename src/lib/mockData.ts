// ジャンル一覧
export const genres = [
    "All Genres",
    "House",
    "Drum & Bass",
    "Dubstep",
    "Trap",
    "Electronic",
    "Lofi",
    "Chill",
    "J-POP",
];

// 曲データ
export const releases = [
    {
        id: "4",
        title: "Lazy Daily",
        artist: "2AT",
        image: "/images/lazygirl.png",
        genre: "J-POP",
        duration: "3:00",
        audio: "/music/04_LazyDaily.wav",
        playCount: 150,
    },
    {
        id: "1",
        title: "情緒纏綿",
        artist: "2AT",
        image: "/images/11111.jpg",
        genre: "Lofi",
        duration: "4:37",
        audio: "/music/lofi.mp3",
        playCount: 420,
    },
    {
        id: "2",
        title: "新恋",
        artist: "2AT",
        image: "/images/girl.jpg",
        genre: "J-POP",
        duration: "3:20",
        audio: "/music/02_Happy New Year.mp3",
        playCount: 280,
        youtubeUrl: "https://www.youtube.com/watch?v=4A7T6dfpNC0",
    },
    {
        id: "3",
        title: "X-MASH",
        artist: "2AT",
        image: "/images/dog01.jpg",
        genre: "Dubstep",
        duration: "2:45",
        audio: "/music/XMASH.mp3",
        playCount: 95,
        youtubeUrl: "https://www.youtube.com/watch?v=0WHff9yOKMY",
    },
];

// アーティストデータ
export const artists = [
    {
        id: "1",
        name: "2AT",
        genre: "Lofi / J-POP / Dubstep",
        image: "/images/doglogo.png",
    },
];

// ムード
export const moods = [
    "All Moods",
    "Happy",
    "Energetic",
    "Dark",
    "Relaxed",
    "Sad",
    "Festive",
];