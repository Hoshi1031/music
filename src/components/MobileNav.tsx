"use client";
import { useState } from "react";
import { Menu, X, Music, Users, FileText, Info, Mail, LogIn } from "lucide-react";
import Link from "next/link";
import Image from "next/image"; // For YouTube LOGO

export default function MobileNav() {
    const [isOpen, setIsOpen] = useState(false);

    // Reusing items from Sidebar for consistency, but simple hardcode is fine for now
    const navItems = [
        { name: "Log In", href: "/login", icon: LogIn },
        { name: "Music Library", href: "/", icon: Music },
        { name: "Artists", href: "/artists", icon: Users },
    ];

    const secondaryItems = [
        { name: "About", href: "/about", icon: Info },
        { name: "Contact", href: "/contact", icon: Mail },
    ];

    return (
        <>
            <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-black z-[100] flex items-center justify-between px-6 border-b border-gray-900">
                <Link href="/" onClick={() => setIsOpen(false)}>
                    <h1 className="text-2xl font-bold tracking-tighter text-white">2AT</h1>
                </Link>
                <button className="text-white" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {isOpen && (
                <div className="fixed inset-0 z-[90] bg-black/95 pt-20 px-6 pb-6 overflow-y-auto">
                    <nav className="space-y-6">
                        <div className="space-y-2">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center gap-4 py-3 text-gray-300 hover:text-white border-b border-gray-800"
                                >
                                    <item.icon size={20} />
                                    <span className="text-lg font-medium">{item.name}</span>
                                </Link>
                            ))}
                        </div>

                        <div className="space-y-2">
                            {secondaryItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center gap-4 py-3 text-gray-300 hover:text-white border-b border-gray-800"
                                >
                                    <item.icon size={20} />
                                    <span className="text-lg font-medium">{item.name}</span>
                                </Link>
                            ))}
                        </div>

                        {/* YouTube Link */}
                        <div className="pt-4">
                            <a
                                href="https://www.youtube.com/@2AT_two_and_then"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 text-gray-400 hover:text-white border-b border-gray-800 py-3"
                            >
                                <div className="relative">
                                    <Image
                                        src="/youtube-123.svg"
                                        alt="YouTube"
                                        width={24}
                                        height={24}
                                        className="object-contain invert"
                                    />
                                </div>
                                <span className="text-lg font-medium">YouTube</span>
                            </a>
                        </div>
                    </nav>
                </div>
            )}
        </>
    );
}
