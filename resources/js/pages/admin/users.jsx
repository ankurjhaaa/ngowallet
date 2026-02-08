import { useState } from "react";
import AdminLayout from "@/layouts/AdminLayout";
import { Link, usePage, router } from "@inertiajs/react";

export default function Users() {

    const { users, filters } = usePage().props;

    const [search, setSearch] = useState(filters?.search || "");
    const [role, setRole] = useState(filters?.role || "all");

    /* 🔍 SEARCH HANDLER (SERVER SIDE) */
    const handleSearch = (e) => {
        const value = e.target.value;
        setSearch(value);

        router.get(
            "/admin/users",
            { search: value, role },
            { preserveState: true, replace: true }
        );
    };

    /* 🎯 ROLE FILTER */
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
            <div className="mb-6 flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-semibold">Users</h1>
                    <p className="text-sm text-gray-500">
                        Showing {users.total} users
                    </p>
                </div>
            </div>

            {/* FILTER BAR */}
            <div className="mb-6 flex flex-col lg:flex-row gap-4 justify-between">

                {/* SEARCH */}
                <input
                    value={search}
                    onChange={handleSearch}
                    placeholder="Search by name, phone or email"
                    className="w-full lg:w-96 h-11 rounded-md bg-white px-4 text-sm
                    focus:ring-2 focus:ring-red-200"
                />

                {/* ROLE FILTER */}
                <div className="flex gap-2">
                    {["all", "member", "user"].map(r => (
                        <button
                            key={r}
                            onClick={() => changeRole(r)}
                            className={`h-9 px-4 rounded-md text-sm cursor-pointer
                            ${role === r
                                    ? "bg-red-800 text-white"
                                    : "bg-white text-gray-600 hover:bg-gray-50"}`}
                        >
                            {r.charAt(0).toUpperCase() + r.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            {/* TABLE */}
            <div className="bg-white rounded-md overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-gray-50 text-gray-600">
                        <tr>
                            <th className="px-6 py-4 text-left">User</th>
                            <th className="px-6 py-4 text-left">Role</th>
                            <th className="px-6 py-4 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length === 0 ? (
                            <tr>
                                <td colSpan="3" className="text-center py-10 text-gray-500">
                                    No users found
                                </td>
                            </tr>
                        ) : (
                            users.data.map(user => (
                                <tr key={user.id} className="border-t hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <p className="font-medium">{user.name}</p>
                                        <p className="text-xs text-gray-500">{user.phone}</p>
                                    </td>
                                    <td className="px-6 py-4 capitalize">
                                        {user.role}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <Link
                                            href={`/admin/userdetail/${user.id}`}
                                            className="text-red-800 text-sm"
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

            {/* PAGINATION */}
            <div className="mt-6 flex justify-end gap-2">
                {users.links.map((link, index) => (
                    <button
                        key={index}
                        disabled={!link.url}
                        onClick={() => link.url && router.get(link.url, {}, { preserveState: true })}
                        className={`px-3 py-1 rounded-md text-sm
                        ${link.active
                                ? "bg-red-800 text-white"
                                : "bg-white text-gray-600 hover:bg-gray-100"}
                        ${!link.url && "opacity-50 cursor-not-allowed"}`}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                ))}
            </div>

        </AdminLayout>
    );
}
