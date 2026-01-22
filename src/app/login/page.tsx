"use client";

import { Send, Music, Mail } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
    return (
        <div className="min-h-screen bg-ncs-offwhite flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl grid md:grid-cols-2 overflow-hidden min-h-[600px]">
                {/* Left Side - Hero */}
                <div className="bg-ncs-black p-12 text-white flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-ncs-red/20 to-transparent" />
                    <div className="z-10">
                        <Link href="/" className="text-3xl font-bold tracking-tighter">2AT</Link>
                    </div>
                    <div className="z-10 relative">
                        <h2 className="text-4xl font-bold leading-tight mb-4">Welcome back, creator.</h2>
                        <p className="text-gray-400">Log in to access your downloads and saved playlists.</p>
                    </div>
                    <div className="z-10 text-xs text-gray-500">
                        © 2AT 2026
                    </div>
                </div>

                {/* Right Side - Form */}
                <div className="p-12 flex flex-col justify-center">
                    <h2 className="text-2xl font-bold mb-8 text-ncs-text-primary">Log In</h2>

                    <div className="space-y-4 mb-8">
                        <button className="w-full py-3 px-4 border border-gray-200 rounded-lg flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors font-medium text-ncs-text-secondary">
                            <Music size={20} className="text-[#1DB954]" /> Continue with Spotify
                        </button>
                        <button className="w-full py-3 px-4 border border-gray-200 rounded-lg flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors font-medium text-ncs-text-secondary">
                            <Mail size={20} className="text-red-500" /> Continue with Google
                        </button>
                    </div>

                    <div className="relative mb-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">Or log in with email</span>
                        </div>
                    </div>

                    <form className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                            <input type="email" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-ncs-black/10" placeholder="name@example.com" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <input type="password" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-ncs-black/10" placeholder="••••••••" />
                        </div>
                        <button className="w-full py-3 bg-ncs-black text-white rounded-lg font-bold hover:bg-gray-800 transition-colors">
                            Log In
                        </button>
                    </form>

                    <p className="mt-6 text-center text-sm text-gray-500">
                        Don't have an account? <a href="#" className="text-ncs-text-primary font-bold hover:underline">Sign up</a>
                    </p>
                </div>
            </div>
        </div>
    );
}
