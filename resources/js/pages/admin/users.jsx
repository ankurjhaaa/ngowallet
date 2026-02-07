import { useState, useMemo } from "react";
import AdminLayout from "@/layouts/AdminLayout";
import { Link } from "@inertiajs/react";

export default function Users() {

    const users = [
        { id: 1, name: "Ramesh Kumar", phone: "9000000001", role: "Member", status: "Active" },
        { id: 2, name: "Anita Sharma", phone: "9000000002", role: "Supporter", status: "Active" },
        { id: 3, name: "Suresh Verma", phone: "9000000003", role: "Member", status: "Inactive" },
        { id: 4, name: "Pooja Singh", phone: "9000000004", role: "Volunteer", status: "Active" },
        { id: 5, name: "Rajesh Patel", phone: "9000000005", role: "Supporter", status: "Active" },
        { id: 6, name: "Rajesh Patel", phone: "9000000005", role: "Supporter", status: "Active" },
        { id: 7, name: "Rajesh Patel", phone: "9000000005", role: "Supporter", status: "Active" },
    ];

    const [search, setSearch] = useState("");

    const filteredUsers = useMemo(() => {
        const q = search.toLowerCase().trim();
        if (!q) return users;
        return users.filter(u =>
            u.name.toLowerCase().includes(q) ||
            u.phone.includes(q) ||
            u.role.toLowerCase().includes(q)
        );
    }, [search]);

    return (
        <AdminLayout>

            {/* ================= PAGE HEADER ================= */}
            <div className="mb-8">

                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                    {/* LEFT: TITLE BLOCK */}
                    <div className="space-y-1">
                        <h1 className="text-2xl font-bold text-gray-900">
                            Users
                        </h1>
                        <p className="text-sm text-gray-500">
                            Total users in the system
                        </p>

                    </div>

                    {/* RIGHT: SEARCH (FIXED WIDTH) */}
                    <div className="relative w-full lg:w-85">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by name, phone or role"
                            className="w-full h-11 rounded-md bg-white shadow-sm
                           pl-11 pr-4 text-sm
                           focus:outline-none focus:ring-2 focus:ring-red-200"
                        />
                        <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                    </div>

                </div>
            </div>


            {/* ================= DESKTOP TABLE ================= */}
            <div className="hidden md:block bg-white rounded-2xl shadow-sm overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-gray-50 text-gray-600">
                        <tr>
                            <th className="px-6 py-4 text-left">Name</th>
                            <th className="px-6 py-4 text-left">Phone</th>
                            <th className="px-6 py-4 text-left">Role</th>
                            <th className="px-6 py-4 text-left">Status</th>
                            <th className="px-6 py-4 text-right">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredUsers.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="px-6 py-10 text-center text-gray-500">
                                    No users found
                                </td>
                            </tr>
                        ) : (
                            filteredUsers.map(user => (
                                <tr key={user.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-900">
                                        {user.name}
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">
                                        {user.phone}
                                    </td>
                                    <td className="px-6 py-4">
                                        <Badge>{user.role}</Badge>
                                    </td>
                                    <td className="px-6 py-4">
                                        {user.status}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <Link href="/admin/userdetail" className="text-red-800 text-sm font-medium hover:underline">
                                            View
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* ================= MOBILE LIST ================= */}
            <div className="md:hidden space-y-4">
                {filteredUsers.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-sm p-6 text-center text-sm text-gray-500">
                        No users found
                    </div>
                ) : (
                    filteredUsers.map(user => (
                        <div
                            key={user.id}
                            className="bg-white rounded-2xl shadow-sm p-5 space-y-3"
                        >
                            <div className="flex items-start justify-between">
                                <div>
                                    <h3 className="font-semibold text-gray-900">
                                        {user.name}
                                    </h3>
                                    <p className="text-sm text-gray-500 mt-1">
                                        {user.phone}
                                    </p>
                                </div>
                                {user.status}
                            </div>

                            <div className="flex items-center justify-between">
                                <Badge>{user.role}</Badge>
                                <Link href="/admin/userdetail" className="text-red-800 text-sm font-medium">
                                    View
                                </Link>
                            </div>
                        </div>
                    ))
                )}
            </div>

        </AdminLayout>
    );
}

/* ================= UI ATOMS ================= */

function Badge({ children }) {
    return (
        <span className="inline-flex px-3 py-1 rounded-full text-xs bg-gray-100 text-gray-700">
            {children}
        </span>
    );
}

