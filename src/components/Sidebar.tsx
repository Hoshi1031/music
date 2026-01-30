"use client";
import Image from "next/image"; // Add import at the top if missing, checking file content first is safer.
import Link from "next/link";
import { Music, Users, FileText, Info, Mail, LogIn, Youtube } from "lucide-react";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const navItems = [
    { name: "Log In", href: "/login", icon: LogIn },
    { name: "Music Library", href: "/", icon: Music },
    { name: "Artists", href: "/artists", icon: Users },
];

const secondaryItems = [
    { name: "About", href: "/about", icon: Info },
    { name: "Contact", href: "/contact", icon: Mail },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-[260px] bg-black text-white h-screen fixed left-0 top-0 hidden md:flex flex-col z-40 overflow-y-auto border-r border-gray-900">
            <div className="p-8">
                <Link href="/" className="block mb-12">
                    <h1 className="text-4xl font-bold tracking-tighter bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent hover:from-[#FF3E3E] hover:to-[#FF6B6B] transition-all duration-300">2AT</h1>
                </Link>

                <nav className="space-y-2 mb-12">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={clsx(
                                    "flex items-center gap-4 px-4 py-3 rounded-lg transition-colors duration-200",
                                    isActive
                                        ? "text-white bg-white/10"
                                        : "text-gray-400 hover:text-white hover:bg-white/5"
                                )}
                            >
                                <item.icon size={20} />
                                <span className="font-medium text-sm">{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>

                <nav className="space-y-2">
                    {secondaryItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={clsx(
                                    "flex items-center gap-4 px-4 py-3 rounded-lg transition-colors duration-200",
                                    isActive
                                        ? "text-white bg-white/10"
                                        : "text-gray-400 hover:text-white hover:bg-white/5"
                                )}
                            >
                                <item.icon size={20} />
                                <span className="font-medium text-sm">{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>
            </div>

            <div className="mt-auto p-8 pb-12 border-t border-gray-900 space-y-6">
                <a
                    href="https://www.youtube.com/@2AT_two_and_then"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors"
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
                    <span className="font-medium text-sm">YouTube</span>
                </a>
                <p className="text-[10px] text-gray-600">© 2026 2AT Music</p>
            </div>
        </aside>
    );
}