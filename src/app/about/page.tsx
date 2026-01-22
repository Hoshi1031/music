"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function AboutPage() {
    const items = [
        {
            title: "What features can I expect from this channel?",
            content: "This channel features original AI-assisted songs and concepts, along with music videos and visuals created using creative tools. Expect new releases, experiments, and those exciting \"build-up to drop\" moments."
        },
        {
            title: "What creative tools do you use?",
            content: "My workflow varies by project, but I utilize cutting-edge tools like ChatGPT, Suno AI, and Gemini to assist in creativity and production."
        },
        {
            title: "Upload Schedule & Community",
            content: "New uploads are released regularly. Subscribe and join the journey to stay updated with the latest tracks and visuals."
        }
    ];

    return (
        <div className="min-h-screen bg-[#F8F9FA] p-8 md:p-12 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900" suppressHydrationWarning>Welcome to 2AT</h1>
            <p className="text-lg md:text-xl text-gray-600 mb-12 leading-relaxed" suppressHydrationWarning>
                I create original music with a focus on EDM, Bass, and Melodic vibes, mixing seasonal moods and emotional energy into each track.
            </p>

            <div className="space-y-4">
                {items.map((item, idx) => (
                    <Accordion key={idx} question={item.title} answer={item.content} />
                ))}
            </div>
        </div>
    );
}

function Accordion({ question, answer }: { question: string, answer: string }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border border-gray-200 rounded-lg bg-white overflow-hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-6 text-left font-bold hover:bg-gray-50 transition-colors"
            >
                {question}
                {isOpen ? <ChevronUp /> : <ChevronDown />}
            </button>
            {isOpen && (
                <div className="p-6 pt-0 text-gray-600">
                    {answer}
                </div>
            )}
        </div>
    )
}
