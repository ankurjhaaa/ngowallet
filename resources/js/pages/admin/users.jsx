import { useState } from "react";
import AdminLayout from "@/layouts/AdminLayout";
import { Link, usePage, router } from "@inertiajs/react";

export default function Users() {
    const { users, filters } = usePage().props;

    const [search, setSearch] = useState(filters?.search || "");
    const [role, setRole] = useState(filters?.role || "all");

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearch(value);

        router.get(
            "/admin/users",
            { search: value, role },
            { preserveState: true, replace: true }
        );
    };

    const changeRole = (r) => {
        setRole(r);

        router.get(
            "/admin/users",
            { search, role: r },
            { preserveState: true, replace: true }
        );
    };

    return (
        <AdminLayout>

            {/* HEADER */}
            <div className="mb-6">
                <h1 className="text-2xl font-semibold text-gray-900">
                    Users
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                    Showing {users.total} users
                </p>
            </div>

            {/* FILTER BAR */}
            <div className="mb-6 flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">

                {/* SEARCH */}
                <input
                    value={search}
                    onChange={handleSearch}
                    placeholder="Search by name, phone or email"
                    className="
                        w-full lg:w-96 h-11 px-4 rounded-md
                        bg-white text-sm text-gray-700
                        placeholder:text-gray-400
                        focus:outline-none focus:ring-2 focus:ring-red-200
                    "
                />

                {/* ROLE FILTER */}
                <div className="flex gap-2 flex-wrap">
                    {["all", "member", "user"].map(r => (
                        <button
                            key={r}
                            onClick={() => changeRole(r)}
                            className={`
                                h-9 px-4 rounded-md text-sm transition
                                ${role === r
                                    ? "bg-red-800 text-white"
                                    : "bg-white text-gray-600 hover:bg-red-50"}
                            `}
                        >
                            {r.charAt(0).toUpperCase() + r.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            {/* TABLE */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 text-gray-600">
                            <tr>
                                <th className="px-6 py-4 text-left font-medium">
                                    User
                                </th>
                                <th className="px-6 py-4 text-left font-medium">
                                    Role
                                </th>
                                <th className="px-6 py-4 text-right font-medium">
                                    Action
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {users.data.length === 0 ? (
                                <tr>
                                    <td colSpan="3" className="py-12 text-center text-gray-500">
                                        No users found
                                    </td>
                                </tr>
                            ) : (
                                users.data.map(user => (
                                    <tr
                                        key={user.id}
                                        className="hover:bg-red-50/40 transition"
                                    >
                                        <td className="px-6 py-4">
                                            <p className="font-medium text-gray-900">
                                                {user.name}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                {user.phone}
                                            </p>
                                        </td>

                                        <td className="px-6 py-4 capitalize text-gray-700">
                                            {user.role}
                                        </td>

                                        <td className="px-6 py-4 text-right">
                                            <Link
                                                href={`/admin/userdetail/${user.id}`}
                                                className="
                                                    text-sm text-red-700
                                                    hover:text-red-900
                                                    hover:underline underline-offset-4
                                                "
                                            >
                                                View
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* PAGINATION */}
            <div className="mt-6 flex justify-end gap-1 flex-wrap">
                {users.links.map((link, index) => (
                    <button
                        key={index}
                        disabled={!link.url}
                        onClick={() =>
                            link.url &&
                            router.get(link.url, {}, { preserveState: true })
                        }
                        className={`
                            min-w-[36px] h-9 px-3 rounded-md text-sm transition
                            ${link.active
                                ? "bg-red-800 text-white"
                                : "bg-white text-gray-600 hover:bg-red-50"}
                            ${!link.url && "opacity-40 cursor-not-allowed"}
                        `}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                ))}
            </div>

        </AdminLayout>
    );
}
