"use client";

import Image from "next/image";
import { artists } from "@/lib/mockData";

export default function ArtistsPage() {
    return (
        <div className="flex flex-col">
            <div className="p-8">
                <h1 className="text-4xl font-bold mb-8">Artists</h1>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {artists.map((artist) => (
                        <div key={artist.id} className="group cursor-pointer">
                            <div className="relative aspect-square rounded-full overflow-hidden mb-4 border-2 border-transparent group-hover:border-[#FF3E3E] transition-all">
                                <Image
                                    src={artist.image}
                                    alt={artist.name}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                            </div>
                            <div className="text-center">
                                <h3 className="font-bold text-xl group-hover:text-[#FF3E3E] transition-colors">{artist.name}</h3>
                                <p className="text-sm text-gray-500">{artist.genre}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}