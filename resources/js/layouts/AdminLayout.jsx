import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";

export default function AdminLayout({ children }) {
    const { url, props } = usePage();
    const user = props.auth?.user;
    const [open, setOpen] = useState(false);

    const active = (path) => url.startsWith(path);

    return (
        <div className="min-h-screen flex bg-[#f6f7fb]">

            {/* ================= SIDEBAR ================= */}
            <aside
                className={`
                    fixed inset-y-0 left-0 z-40 w-64 bg-white
                    shadow-[0_0_40px_rgba(0,0,0,0.04)]
                    transform transition-transform duration-300 ease-out
                    ${open ? "translate-x-0" : "-translate-x-full"}
                    md:translate-x-0
                `}
            >
                {/* Brand */}
                <div className="h-16 flex items-center px-6">
                    <span className="text-xl font-semibold tracking-tight text-gray-900">
                        NGO<span className="text-red-800">Admin</span>
                    </span>
                </div>

                {/* Navigation */}
                <nav className="px-4 mt-4 space-y-1 text-[14px]">
                    <SidebarLink href="/admin/dashboard" label="Dashboard" icon="fa-chart-line" active={active("/admin/dashboard")} />
                    <SidebarLink href="/admin/users" label="Users" icon="fa-users" active={active("/admin/users")} />
                    <SidebarLink href="/admin/programs" label="Programs" icon="fa-hand-holding-heart" active={active("/admin/programs")} />
                    <SidebarLink href="/admin/transactions" label="Transactions" icon="fa-wallet" active={active("/admin/transactions")} />
                    <SidebarLink href="/admin/reports" label="Reports" icon="fa-file-alt" active={active("/admin/reports")} />
                </nav>

                {/* ================= BOTTOM USER ================= */}
                <div className="absolute bottom-0 left-0 right-0 px-5 pb-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="h-10 w-10 rounded-full bg-red-50 text-red-700 flex items-center justify-center font-semibold">
                            {user?.name?.charAt(0) ?? "A"}
                        </div>
                        <div className="leading-tight">
                            <p className="text-sm font-medium text-gray-800 truncate">
                                {user?.name ?? "Admin User"}
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                                {user?.email}
                            </p>
                        </div>
                    </div>

                    <Link href="/logout" method="post" as="button" className="  w-full text-sm py-2.5 rounded-md  text-red-700  hover:bg-red-50  transition border border-red-700 " >
                        Logout
                    </Link>
                </div>
            </aside>

            {/* ================= MAIN ================= */}
            <div className="flex-1 md:ml-64 flex flex-col">

                {/* ================= TOPBAR ================= */}
                <header className="
                    sticky top-0 z-30 h-16
                    bg-white flex items-center px-6
                    shadow-[0_2px_10px_rgba(0,0,0,0.04)]
                ">
                    <button
                        className="md:hidden mr-4 text-red-700"
                        onClick={() => setOpen(true)}
                    >
                        <i className="fas fa-bars-staggered text-lg"></i>
                    </button>

                    <h1 className="text-sm font-medium text-gray-700">
                        Admin Panel
                    </h1>
                </header>

                {/* ================= CONTENT ================= */}
                <main className="flex-1 p-6">
                    {children}
                </main>
            </div>

            {/* Overlay */}
            {open && (
                <div
                    className="fixed inset-0 bg-black/30 z-30 md:hidden"
                    onClick={() => setOpen(false)}
                />
            )}
        </div>
    );
}

/* ================= LINK ================= */
function SidebarLink({ href, icon, label, active }) {
    return (
        <Link
            href={href}
            className={`
                group flex items-center gap-3 px-4 py-2.5 rounded-lg
                transition-all
                ${active
                    ? "bg-red-50 text-red-800 font-medium"
                    : "text-gray-600 hover:bg-red-50 hover:text-red-800"}
            `}
        >
            <i className={`fas ${icon} text-sm w-4 text-center opacity-80`}></i>
            {label}
        </Link>
    );
}
