import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";

export default function publicLayout({ children }) {
    const { auth } = usePage().props;
    const user = auth?.user;
    const [open, setOpen] = useState(false);

    return (
        <div className="min-h-screen bg-white flex flex-col">

            {/* ================= NAVBAR ================= */}
            <header className="sticky top-0 z-30 bg-white">
                <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">

                    {/* Logo */}
                    <Link href="/">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-red-800 flex items-center justify-center text-white shadow-md">
                                <i className="fas fa-hands-helping"></i>
                            </div>
                            <div>
                                <h1 className="text-lg font-bold text-gray-900">
                                    NGO Trust
                                </h1>
                                <p className="text-xs text-gray-500">
                                    Together for Change
                                </p>
                            </div>
                        </div>
                    </Link>

                    {/* Desktop Menu */}
                    <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700">
                        <Link className="hover:text-red-800">Home</Link>
                        <Link className="hover:text-red-800">About</Link>
                        <Link className="hover:text-red-800">Programs</Link>
                        <Link className="hover:text-red-800">Gallery</Link>
                        <Link className="hover:text-red-800">Contact</Link>
                    </nav>

                    {/* Auth Buttons */}
                    <div className="hidden md:flex items-center relative">
                        {!user ? (
                            <Link
                                href="/login"
                                className="px-4 py-2 text-sm rounded-full bg-red-800 text-white hover:bg-red-700 transition"
                            >
                                Login
                            </Link>
                        ) : (
                            <>
                                {/* USER NAME BUTTON */}
                                <button
                                    onClick={() => setOpen(!open)}
                                    className="flex items-center gap-2 px-4 py-2 text-sm rounded-full bg-red-800 text-white hover:bg-red-700 transition"
                                >
                                    {user.name}
                                    <svg
                                        className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""
                                            }`}
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                {/* DROPDOWN */}
                                {open && (
                                    <div className="absolute right-0 top-12 w-40 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-50">
                                        <Link
                                            href={user.role === "admin" ? "/admin/dashboard" : "/profile"}
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                                        >
                                            Profile
                                        </Link>

                                        <Link
                                            href="/logout"
                                            method="post"
                                            as="button"
                                            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition"
                                        >
                                            Logout
                                        </Link>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                    <div className=" md:hidden items-center gap-3">
                        {!user ? (
                            <></>
                        ) : (
                            <Link
                                href="/logout"
                                method="post"
                                as="button"
                                className="px-4 py-2 text-sm rounded-full text-red-700 hover:bg-red-700"
                            >
                                <i className="fas fa-sign-out-alt text-xl"></i>
                            </Link>
                        )}
                    </div>
                </div>

                {/* Soft separator */}
            </header>

            {/* ================= MAIN ================= */}
            <main className="flex-1">
                {children}
            </main>

            {/* ================= FOOTER (Desktop only) ================= */}
            <footer className="hidden md:block bg-gray-50 mt-20">
                <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-4 gap-10 text-sm">

                    <div>
                        <h3 className="font-semibold text-gray-900 mb-4">
                            About NGO
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                            We empower communities through education,
                            healthcare, and sustainable initiatives.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold text-gray-900 mb-4">
                            Quick Links
                        </h3>
                        <ul className="space-y-2 text-gray-600">
                            <li>Home</li>
                            <li>About</li>
                            <li>Programs</li>
                            <li>Donate</li>
                            <Link href="/admin/dashboard" className="text-red-800 hover:text-red-700">Admin</Link>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-gray-900 mb-4">
                            Contact
                        </h3>
                        <p className="flex items-center gap-2 text-gray-600">
                            <i className="fas fa-envelope text-red-700"></i>
                            info@ngo.org
                        </p>
                        <p className="flex items-center gap-2 mt-2 text-gray-600">
                            <i className="fas fa-phone text-red-700"></i>
                            +91 90000 00000
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold text-gray-900 mb-4">
                            Follow Us
                        </h3>
                        <div className="flex gap-4 text-lg text-gray-600">
                            <i className="fab fa-facebook hover:text-red-800 cursor-pointer"></i>
                            <i className="fab fa-instagram hover:text-red-800 cursor-pointer"></i>
                            <i className="fab fa-twitter hover:text-red-800 cursor-pointer"></i>
                        </div>
                    </div>
                </div>

                <div className="text-center text-xs text-gray-500 pb-6">
                    © {new Date().getFullYear()} NGO Trust · All Rights Reserved
                </div>
            </footer>


            <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-[0_-4px_10px_rgba(0,0,0,0.06)] z-30 h-16">
                <div className="grid grid-cols-4 text-sm  items-center justify-center h-full text-gray-500">

                    {/* Home */}
                    <Link
                        href="/"
                        className={`flex flex-col items-center justify-center gap-1
                ${usePage().url === "/" ? "text-red-800" : "text-gray-500"}
            `}
                    >
                        <i className="fas fa-home text-lg"></i>
                        Home
                    </Link>

                    {/* Join */}
                    <Link
                        href="/join"
                        className={`flex flex-col items-center justify-center gap-1
                ${usePage().url.startsWith("/join") ? "text-red-800" : "text-gray-500"}
            `}
                    >
                        <i className="fas fa-heart text-lg"></i>
                        Join Us
                    </Link>

                    {/* Vision */}
                    <Link
                        href="/vision"
                        className={`flex flex-col items-center justify-center gap-1
                ${usePage().url.startsWith("/vision") ? "text-red-800" : "text-gray-500"}
            `}
                    >
                        <i className="fas fa-bullseye text-lg"></i>
                        Our Vision
                    </Link>

                    {/* Auth */}
                    {!user ? (
                        <Link
                            href="/login"
                            className={`flex flex-col items-center justify-center gap-1
                    ${usePage().url.startsWith("/login") ? "text-red-800" : "text-gray-500"}
                `}
                        >
                            <i className="fas fa-sign-in-alt text-lg"></i>
                            Login
                        </Link>
                    ) : (
                        <Link
                            href={user.role === "admin" ? "/admin/dashboard" : "/profile"}
                            className={`flex flex-col items-center justify-center gap-1
                    ${usePage().url.startsWith("/profile") ? "text-red-800" : "text-gray-500"}
                `}
                        >
                            <i className="fas fa-user text-lg"></i>
                            Profile
                        </Link>
                    )}
                </div>
            </nav>


            <div className="md:hidden h-16"></div>
        </div>
    );
}
