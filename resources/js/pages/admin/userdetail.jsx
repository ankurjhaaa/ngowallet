import { useState } from "react";
import AdminLayout from "@/layouts/AdminLayout";

export default function UserDetail() {

    /* ================= DUMMY DATA ================= */
    const user = {
        name: "Ramesh Kumar",
        phone: "9000000001",
        joined: "12 Jan 2023",
        status: "Active",

        plan: {
            name: "Gold Plan",
            yearlyAmount: 25000,
            start: "01 Jan 2024",
            end: "31 Dec 2024",
        },

        thisYearPaid: 18000,
        lifetimePaid: 42000,

        payments: [
            { id: 1, date: "10 Feb 2024", amount: 5000, note: "UPI" },
            { id: 2, date: "15 Mar 2024", amount: 8000, note: "Cash" },
            { id: 3, date: "20 Jun 2024", amount: 5000, note: "Bank" },
        ]
    };

    const dueThisYear = user.plan.yearlyAmount - user.thisYearPaid;
    const progress = Math.round((user.thisYearPaid / user.plan.yearlyAmount) * 100);

    const [amount, setAmount] = useState("");
    const [note, setNote] = useState("");

    return (
        <AdminLayout>

            {/* ================= USER HEADER ================= */}
            <div className="bg-white rounded-md p-6 mb-8 border">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">
                            {user.name}
                        </h1>
                        <p className="text-sm text-gray-500">
                            {user.phone} • Joined {user.joined}
                        </p>
                    </div>
                    <StatusBadge status={user.status} />
                </div>
            </div>

            {/* ================= YEAR SUMMARY ================= */}
            <div className="grid md:grid-cols-4 gap-6 mb-8">
                <Stat title="Yearly Commitment" value={`₹${user.plan.yearlyAmount}`} />
                <Stat title="Paid This Year" value={`₹${user.thisYearPaid}`} />
                <Stat title="Due This Year" value={`₹${dueThisYear}`} />
                <Stat title="Lifetime Paid" value={`₹${user.lifetimePaid}`} />
            </div>

            {/* ================= PROGRESS ================= */}
            <div className="bg-white rounded-md p-5 mb-8 border">
                <p className="text-sm text-gray-600 mb-2">
                    Current Year Payment Progress
                </p>
                <div className="w-full bg-gray-200 h-3 rounded-full">
                    <div
                        className="bg-red-800 h-3 rounded-full"
                        style={{ width: `${progress}%` }}
                    />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                    {progress}% completed
                </p>
            </div>

            {/* ================= ACTIVE PLAN ================= */}
            <div className="bg-white rounded-md p-6 mb-8 border">
                <h2 className="text-lg font-semibold mb-4">
                    Active Plan
                </h2>

                <div className="grid md:grid-cols-4 gap-6">
                    <Info label="Plan Name" value={user.plan.name} />
                    <Info label="Yearly Amount" value={`₹${user.plan.yearlyAmount}`} />
                    <Info label="Start Date" value={user.plan.start} />
                    <Info label="End Date" value={user.plan.end} />
                </div>
            </div>

            {/* ================= ADMIN ADD PAYMENT ================= */}
            <div className="bg-white rounded-md p-6 mb-8 border">
                <h2 className="text-lg font-semibold mb-4 text-red-800">
                    Add Payment (Admin)
                </h2>

                <div className="grid md:grid-cols-4 gap-4">
                    <input
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Amount (₹)"
                        className="h-11 rounded-md bg-gray-50 px-4 text-sm focus:ring-2 focus:ring-red-200"
                    />
                    <input
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="Payment Mode / Note"
                        className="h-11 rounded-md bg-gray-50 px-4 text-sm focus:ring-2 focus:ring-red-200"
                    />
                    <button className="md:col-span-2 h-11 bg-red-800 text-white rounded-md hover:bg-red-700 text-sm">
                        Add Payment
                    </button>
                </div>

                <p className="text-xs text-gray-500 mt-3">
                    This amount will be added to the user’s current active plan.
                </p>
            </div>

            {/* ================= PAYMENT HISTORY ================= */}
            <div className="bg-white rounded-md p-6 border">
                <h2 className="text-lg font-semibold mb-4">
                    Payment History
                </h2>

                <table className="w-full text-sm border">
                    <thead className="bg-gray-50 text-gray-600">
                        <tr>
                            <th className="px-4 py-3 text-left">Date</th>
                            <th className="px-4 py-3 text-left">Note</th>
                            <th className="px-4 py-3 text-right">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {user.payments.map(p => (
                            <tr key={p.id} className="border-t hover:bg-gray-50">
                                <td className="px-4 py-3">{p.date}</td>
                                <td className="px-4 py-3 text-gray-600">{p.note}</td>
                                <td className="px-4 py-3 text-right font-medium text-red-800">
                                    ₹{p.amount}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </AdminLayout>
    );
}

/* ================= SMALL COMPONENTS ================= */

function Stat({ title, value }) {
    return (
        <div className="bg-white border rounded-md p-5">
            <p className="text-xs text-gray-500">{title}</p>
            <p className="text-lg font-semibold mt-1 text-gray-900">{value}</p>
        </div>
    );
}

function Info({ label, value }) {
    return (
        <div>
            <p className="text-xs text-gray-500">{label}</p>
            <p className="text-sm font-medium mt-1">{value}</p>
        </div>
    );
}

function StatusBadge({ status }) {
    return (
        <span className="px-3 py-1 text-xs rounded-md bg-green-100 text-green-700">
            {status}
        </span>
    );
}
