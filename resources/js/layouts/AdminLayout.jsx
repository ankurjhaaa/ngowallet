import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";

export default function AdminLayout({ children }) {
    const { url, props } = usePage();
    const user = props.auth?.user;
    const [open, setOpen] = useState(false);

    const active = (path) => url.startsWith(path);

    return (
        <div className="min-h-screen bg-gray-100 flex">

            {/* ================= SIDEBAR ================= */}
            <aside
                className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-xl
                transform transition-transform duration-300
                ${open ? "translate-x-0" : "-translate-x-full"}
                md:translate-x-0`}
            >
                {/* Logo */}
                <div className="h-16 flex items-center px-6">
                    <span className="text-lg font-bold text-red-800">
                        NGO Admin
                    </span>
                </div>

                {/* Menu */}
                <nav className="px-4 py-4 space-y-1 text-sm">
                    <SidebarLink href="/admin/dashboard" icon="fa-chart-line" label="Dashboard" active={active("/admin/dashboard")} />
                    <SidebarLink href="/admin/users" icon="fa-users" label="Users" active={active("/admin/users")} />
                    <SidebarLink href="/admin/programs" icon="fa-hand-holding-heart" label="Programs" active={active("/admin/programs")} />
                    <SidebarLink href="/admin/transactions" icon="fa-wallet" label="Transactions" active={active("/admin/transactions")} />
                    <SidebarLink href="/admin/reports" icon="fa-file-alt" label="Reports" active={active("/admin/reports")} />
                </nav>
            </aside>

            {/* ================= MAIN ================= */}
            <div className="flex-1 md:ml-64 flex flex-col">

                {/* ================= STICKY NAVBAR ================= */}
                <header className="sticky top-0 z-30 bg-white shadow-sm">
                    <div className="h-16 flex items-center justify-between px-4">

                        {/* Mobile menu */}
                        <button
                            className="md:hidden text-gray-600"
                            onClick={() => setOpen(true)}
                        >
                            <i className="fas fa-bars text-lg"></i>
                        </button>

                        <h1 className="text-sm font-medium text-gray-700">
                            Admin Dashboard
                        </h1>

                        {/* User */}
                        <div className="flex items-center gap-3 p-5 ">

                            <Link
                                href="/logout"
                                method="post"
                                as="button"
                                className="text-sm text-red-800 hover:underline cursor-pointer"
                            >
                                Logout
                            </Link>
                        </div>
                    </div>
                </header>

                {/* ================= CONTENT ================= */}
                <main className="flex-1 p-6">
                    {children}
                </main>
            </div>

            {/* ================= MOBILE OVERLAY ================= */}
            {open && (
                <div
                    className="fixed inset-0 bg-black/40 z-30 md:hidden"
                    onClick={() => setOpen(false)}
                />
            )}
        </div>
    );
}

/* ================= SIDEBAR LINK ================= */

function SidebarLink({ href, icon, label, active }) {
    return (
        <Link
            href={href}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg transition
                ${active
                    ? "bg-red-50 text-red-800 font-medium"
                    : "text-gray-600 hover:bg-gray-50"}
            `}
        >
            <i className={`fas ${icon} text-sm`}></i>
            {label}
        </Link>
    );
}
