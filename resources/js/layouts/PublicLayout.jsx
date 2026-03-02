import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";
import { LanguageProvider, LanguageSwitcher, useLanguage } from "@/contexts/LanguageContext";

export default function PublicLayout({ children }) {
    return (
        <LanguageProvider>
            <LayoutInner>{children}</LayoutInner>
        </LanguageProvider>
    );
}

function LayoutInner({ children }) {
    const { auth } = usePage().props;
    const user = auth?.user;
    const [open, setOpen] = useState(false);
    const { t, lang } = useLanguage();
    const isRtl = lang === "ur";

    return (
        <div className="min-h-screen bg-white flex flex-col" dir={isRtl ? "rtl" : "ltr"}>

            {/* ================= NAVBAR ================= */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-emerald-100 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

                    {/* Logo */}
                    <Link href="/">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-emerald-800 flex items-center justify-center text-white shadow-md">
                                <i className="fas fa-mosque text-sm"></i>
                            </div>
                            <div>
                                <h1 className="text-lg font-bold text-gray-900">
                                    {t.navBrand}
                                </h1>
                                <p className="text-[10px] text-emerald-700 font-medium">
                                    {t.navTagline}
                                </p>
                            </div>
                        </div>
                    </Link>

                    {/* Desktop Menu */}
                    <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700">
                        <Link href="/" className="hover:text-emerald-800">{t.navHome}</Link>
                        <Link href="/vision" className="hover:text-emerald-800">{t.navVision}</Link>
                        <Link href="/programs" className="hover:text-emerald-800">{t.navPrograms}</Link>
                        <Link href="/join" className="hover:text-emerald-800">{t.navJoin}</Link>
                    </nav>

                    {/* Right side: Lang + Auth */}
                    <div className="flex items-center gap-3">
                        <LanguageSwitcher />

                        {/* Desktop Auth */}
                        <div className="hidden md:flex items-center relative">
                            {!user ? (
                                <Link
                                    href="/login"
                                    className="px-4 py-2 text-sm rounded-lg bg-emerald-800 text-white hover:bg-emerald-700 transition"
                                >
                                    {t.navLogin}
                                </Link>
                            ) : (
                                <>
                                    <button
                                        onClick={() => setOpen(!open)}
                                        className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg bg-emerald-800 text-white hover:bg-emerald-700 transition"
                                    >
                                        {user.name}
                                        <svg className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
                                            fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>

                                    {open && (
                                        <div className="absolute right-0 top-12 w-40 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-50">
                                            <Link
                                                href={user.role === "admin" ? "/admin/dashboard" : "/profile"}
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            >
                                                {t.navProfile}
                                            </Link>
                                            <Link
                                                href="/logout"
                                                method="post"
                                                as="button"
                                                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                            >
                                                {t.navLogout}
                                            </Link>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>

                        {/* Mobile logout */}
                        <div className="md:hidden">
                            {user && (
                                <Link href="/logout" method="post" as="button" className="text-emerald-700">
                                    <i className="fas fa-sign-out-alt text-lg"></i>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* ================= MAIN ================= */}
            <main className="flex-1 pt-16">{children}</main>

            {/* ================= FOOTER (Desktop) ================= */}
            <footer className="hidden md:block bg-emerald-950 mt-16">
                <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-4 gap-10 text-sm">
                    <div>
                        <h3 className="font-semibold text-white mb-4">{t.footerAbout}</h3>
                        <p className="text-emerald-200/70 leading-relaxed">{t.footerAboutDesc}</p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-white mb-4">{t.footerLinks}</h3>
                        <ul className="space-y-2 text-emerald-200/70">
                            <li><Link href="/" className="hover:text-white">{t.navHome}</Link></li>
                            <li><Link href="/vision" className="hover:text-white">{t.navVision}</Link></li>
                            <li><Link href="/programs" className="hover:text-white">{t.navPrograms}</Link></li>
                            <li><Link href="/join" className="hover:text-white">{t.navJoin}</Link></li>
                            <li><Link href="/admin/dashboard" className="text-emerald-400 hover:text-white">Admin</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold text-white mb-4">{t.footerContact}</h3>
                        <p className="flex items-center gap-2 text-emerald-200/70">
                            <i className="fas fa-envelope text-emerald-400"></i> info@bazm-e-haidri.org
                        </p>
                        <p className="flex items-center gap-2 mt-2 text-emerald-200/70">
                            <i className="fas fa-phone text-emerald-400"></i> +91 90000 00000
                        </p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-white mb-4">{t.footerFollow}</h3>
                        <div className="flex gap-4 text-lg text-emerald-200/70">
                            <i className="fab fa-facebook hover:text-white cursor-pointer"></i>
                            <i className="fab fa-instagram hover:text-white cursor-pointer"></i>
                            <i className="fab fa-twitter hover:text-white cursor-pointer"></i>
                        </div>
                    </div>
                </div>
                <div className="text-center text-xs text-emerald-200/40 pb-6">
                    © {new Date().getFullYear()} {t.footerCopy}
                </div>
            </footer>

            {/* ================= MOBILE BOTTOM NAV ================= */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-[0_-4px_10px_rgba(0,0,0,0.06)] z-30 h-16">
                <div className="grid grid-cols-4 text-[11px] items-center justify-center h-full text-gray-500">
                    <Link href="/"
                        className={`flex flex-col items-center justify-center gap-1 ${usePage().url === "/" ? "text-emerald-800" : "text-gray-500"}`}>
                        <i className="fas fa-home text-lg"></i>
                        {t.navHome}
                    </Link>
                    <Link href="/join"
                        className={`flex flex-col items-center justify-center gap-1 ${usePage().url.startsWith("/join") ? "text-emerald-800" : "text-gray-500"}`}>
                        <i className="fas fa-heart text-lg"></i>
                        {t.navJoin}
                    </Link>
                    <Link href="/vision"
                        className={`flex flex-col items-center justify-center gap-1 ${usePage().url.startsWith("/vision") ? "text-emerald-800" : "text-gray-500"}`}>
                        <i className="fas fa-bullseye text-lg"></i>
                        {t.navVision}
                    </Link>
                    {!user ? (
                        <Link href="/login"
                            className={`flex flex-col items-center justify-center gap-1 ${usePage().url.startsWith("/login") ? "text-emerald-800" : "text-gray-500"}`}>
                            <i className="fas fa-sign-in-alt text-lg"></i>
                            {t.navLogin}
                        </Link>
                    ) : (
                        <Link href={user.role === "admin" ? "/admin/dashboard" : "/profile"}
                            className={`flex flex-col items-center justify-center gap-1 ${usePage().url.startsWith("/profile") ? "text-emerald-800" : "text-gray-500"}`}>
                            <i className="fas fa-user text-lg"></i>
                            {t.navProfile}
                        </Link>
                    )}
                </div>
            </nav>
            <div className="md:hidden h-16"></div>
        </div>
    );
}
