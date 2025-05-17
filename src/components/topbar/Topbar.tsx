'use client';

import { useState } from 'react';
import { FiSearch, FiMessageSquare, FiUser, FiMenu, FiX } from 'react-icons/fi';

const primaryColor = '#16A34A';

export default function Header() {
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    return (
        <>
            <header className="flex items-center justify-between px-6 py-4 shadow-md bg-white sticky top-0 z-50">
                <div style={{ color: primaryColor }} className="text-xl font-bold">
                    WebCheckouts
                </div>

                <div className="hidden md:flex items-center gap-4">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Cari produk..."
                            className="pl-10 pr-4 py-2 border rounded-full focus:outline-none"
                            style={{
                                borderColor: primaryColor,
                            }}
                            onFocus={(e) => (e.currentTarget.style.borderColor = primaryColor)}
                            onBlur={(e) => (e.currentTarget.style.borderColor = '#d1d5db')}
                        />
                        <FiSearch
                            className="absolute left-3 top-1/2 transform -translate-y-1/2"
                            style={{ color: primaryColor }}
                        />
                    </div>
                    <FiMessageSquare
                        className="text-2xl cursor-pointer"
                        style={{ color: primaryColor }}
                    />
                    <FiUser
                        className="text-2xl cursor-pointer"
                        style={{ color: primaryColor }}
                    />
                </div>

                <div className="md:hidden">
                    <FiMenu
                        className="text-2xl cursor-pointer"
                        onClick={() => setSidebarOpen(true)}
                        style={{ color: primaryColor }}
                    />
                </div>
            </header>

            <div
                className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform z-50 ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                <div className="flex items-center justify-between px-4 py-4 border-b">
                    <span className="text-lg font-semibold">Menu</span>
                    <FiX
                        className="text-2xl cursor-pointer"
                        onClick={() => setSidebarOpen(false)}
                        style={{ color: primaryColor }}
                    />
                </div>

                <div className="p-4 space-y-4">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Cari produk..."
                            className="pl-10 pr-4 py-2 border rounded-full w-full focus:outline-none"
                            style={{
                                borderColor: primaryColor,
                            }}
                            onFocus={(e) => (e.currentTarget.style.borderColor = primaryColor)}
                            onBlur={(e) => (e.currentTarget.style.borderColor = '#d1d5db')}
                        />
                        <FiSearch
                            className="absolute left-3 top-1/2 transform -translate-y-1/2"
                            style={{ color: primaryColor }}
                        />
                    </div>
                    <div className="flex gap-4 text-2xl">
                        <FiMessageSquare className="cursor-pointer" style={{ color: primaryColor }} />
                        <FiUser className="cursor-pointer" style={{ color: primaryColor }} />
                    </div>
                </div>
            </div>

            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-30 z-40"
                    onClick={() => setSidebarOpen(false)}
                />
            )}
        </>
    );
}
