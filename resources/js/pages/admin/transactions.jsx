import { router, usePage } from "@inertiajs/react";
import { useState } from "react";
import AdminLayout from "@/layouts/AdminLayout";

export default function Transactions() {
    const {
        payments,
        members,
        plans = [],
        filters = {},
        selectedMember = null,
        paymentModes = ["all", "cash", "upi"],
    } = usePage().props;

    const [query, setQuery] = useState(filters.q || "");
    const [memberId, setMemberId] = useState(filters.member_id || "");
    const [memberLabel, setMemberLabel] = useState(
        selectedMember ? `${selectedMember.name} (${selectedMember.phone})` : ""
    );
    const [paymentMode, setPaymentMode] = useState(filters.payment_mode || "all");
    const [planId, setPlanId] = useState(filters.plan_id || "all");
    const [from, setFrom] = useState(filters.from || "");
    const [to, setTo] = useState(filters.to || "");
    const [memberSearch, setMemberSearch] = useState(filters.member_query || "");
    const [openMemberModal, setOpenMemberModal] = useState(Boolean(filters.open_member_modal));
    const [sendingId, setSendingId] = useState(null);

    const buildFilterParams = (overrides = {}) => {
        const merged = {
            q: query,
            member_id: memberId,
            payment_mode: paymentMode,
            plan_id: planId,
            from,
            to,
            ...overrides,
        };

        return Object.fromEntries(
            Object.entries(merged).filter(([key, value]) => {
                if (key === "payment_mode" || key === "plan_id") return value;
                return value !== "" && value !== null && value !== undefined;
            })
        );
    };

    const applyFilters = () => {
        router.get("/admin/transactions", buildFilterParams(), {
            preserveState: true,
            replace: true,
        });
    };

    const clearFilters = () => {
        setQuery("");
        setPaymentMode("all");
        setPlanId("all");
        setFrom("");
        setTo("");

        router.get("/admin/transactions", {}, {
            preserveState: true,
            replace: true,
        });

        setMemberId("");
        setMemberLabel("");
    };

    const selectMember = (member) => {
        setOpenMemberModal(false);
        setMemberId(member.id);
        setMemberLabel(`${member.name} (${member.phone})`);
    };

    const clearMemberFilter = () => {
        setMemberId("");
        setMemberLabel("");
    };

    const searchMembers = () => {
        router.get(
            "/admin/transactions",
            buildFilterParams({
                member_query: memberSearch,
                member_page: 1,
                open_member_modal: 1,
            }),
            {
                preserveState: true,
                replace: true,
            }
        );
    };

    const sendMessage = (paymentId) => {
        setSendingId(paymentId);
        router.post(
            `/admin/transactions/${paymentId}/send-message`,
            {},
            {
                preserveScroll: true,
                onFinish: () => setSendingId(null),
            }
        );
    };

    return (
        <AdminLayout>
            {/* header + filters container */}
            <div className="mb-6">
                <div className="bg-white rounded-lg border border-gray-100 shadow-sm">
                    {/* HEADER */}
                    <div className="p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <div>
                            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
                                All Transactions
                            </h1>
                            <p className="text-xs sm:text-sm text-gray-500 mt-1">
                                {payments.total} record{payments.total !== 1 ? 's' : ''}
                            </p>
                        </div>
                        <div className="flex gap-2">
                            {/* future action buttons can live here */}
                        </div>
                    </div>
                    {/* FILTERS */}
                    <div className="border-t border-gray-100 p-4 sm:p-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-3">
                            <input
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search by amount / member"
                                className=" w-full h-10 rounded-md border border-gray-200 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-200"
                            />

                            <button
                                onClick={() => setOpenMemberModal(true)}
                                className="h-10 rounded-md border border-gray-200 px-3 text-sm text-left text-gray-700 bg-white hover:bg-gray-50 transition"
                            >
                                {memberLabel || "Select Member"}
                            </button>

                            <select
                                value={paymentMode}
                                onChange={(e) => setPaymentMode(e.target.value)}
                                className="h-10 rounded-md border border-gray-200 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-200"
                            >
                                {paymentModes.map((mode) => (
                                    <option key={mode} value={mode}>
                                        {mode === "all" ? "All Modes" : mode.toUpperCase()}
                                    </option>
                                ))}
                            </select>

                            <select
                                value={planId}
                                onChange={(e) => setPlanId(e.target.value)}
                                className="h-10 rounded-md border border-gray-200 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-200"
                            >
                                <option value="all">All Plans</option>
                                {plans.map((plan) => (
                                    <option key={plan.id} value={plan.id}>{plan.name}</option>
                                ))}
                            </select>


                            <input
                                type="date"
                                value={from}
                                onChange={(e) => setFrom(e.target.value)}
                                className="h-10 rounded-md border border-gray-200 px-3 text-xs sm:text-sm"
                            />
                            <input
                                type="date"
                                value={to}
                                onChange={(e) => setTo(e.target.value)}
                                className="h-10 rounded-md border border-gray-200 px-3 text-xs sm:text-sm"
                            />

                        </div>

                        <div className="flex flex-wrap gap-2 mt-3">
                            <button
                                onClick={applyFilters}
                                className="h-9 px-4 rounded-md bg-red-800 text-white text-sm font-medium hover:bg-red-900 transition cursor-pointer"
                            >
                                Apply Filters
                            </button>
                            <button
                                onClick={clearFilters}
                                className="h-9 px-4 rounded-md bg-gray-100 text-gray-700 text-sm font-medium hover:bg-gray-200 transition cursor-pointer"
                            >
                                Reset
                            </button>
                            {memberId && (
                                <button
                                    onClick={clearMemberFilter}
                                    className="h-9 px-4 rounded-md bg-amber-50 text-amber-700 text-sm font-medium hover:bg-amber-100 transition cursor-pointer"
                                >
                                    Clear Member
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[980px] text-sm">
                        <thead className="bg-gray-50 text-gray-600">
                            <tr>
                                <th className="text-left px-4 py-3 font-medium">Date</th>
                                <th className="text-left px-4 py-3 font-medium">Member</th>
                                <th className="text-left px-4 py-3 font-medium">Plan</th>
                                <th className="text-right px-4 py-3 font-medium">Amount</th>
                                <th className="text-left px-4 py-3 font-medium">Mode</th>
                                <th className="text-center px-4 py-3 font-medium">OTP History</th>
                                <th className="text-right px-4 py-3 font-medium">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.data.length === 0 ? (
                                <tr>
                                    <td colSpan="8" className="py-12 text-center text-gray-500">
                                        No transactions found.
                                    </td>
                                </tr>
                            ) : (
                                payments.data.map((payment) => (
                                    <tr key={payment.id} className="border-t border-gray-100 hover:bg-gray-50/50 transition">
                                        <td className="px-4 py-3 text-gray-700">{payment.payment_date}</td>
                                        <td className="px-4 py-3">
                                            <p className="font-medium text-gray-900">{payment.user?.name || "-"}</p>
                                            <p className="text-xs text-gray-500">{payment.user?.phone || "-"}</p>
                                        </td>
                                        <td className="px-4 py-3 text-gray-700">{payment.user_plan?.plan?.name || "-"}</td>
                                        <td className="px-4 py-3 text-right font-semibold text-gray-900">₹{Number(payment.amount || 0).toLocaleString()}</td>
                                        <td className="px-4 py-3">
                                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-gray-100 text-gray-700 uppercase">
                                                {payment.payment_mode}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                            {payment.otp_sent_count > 0 ? (
                                                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs bg-emerald-100 text-emerald-700 font-medium">
                                                    {payment.otp_sent_count} Sent
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs bg-gray-100 text-gray-600 font-medium">
                                                    0 Sent
                                                </span>
                                            )}
                                        </td>

                                        <td className="px-4 py-3 text-right">
                                            <button
                                                onClick={() => sendMessage(payment.id)}
                                                disabled={sendingId === payment.id}
                                                className="h-8 px-3 rounded-md bg-red-800 text-white text-xs font-semibold hover:bg-red-900 disabled:opacity-60 transition"
                                            >
                                                {sendingId === payment.id ? "Sending..." : "Send Message"}
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="mt-5 flex justify-end gap-1 flex-wrap">
                {payments.links.map((link, index) => (
                    <button
                        key={index}
                        disabled={!link.url}
                        onClick={() => link.url && router.get(link.url, {}, { preserveState: true, preserveScroll: true })}
                        className={`
                            min-w-[36px] h-9 px-3 rounded-md text-sm transition
                            ${link.active ? "bg-red-800 text-white" : "bg-white text-gray-600 hover:bg-red-50"}
                            ${!link.url ? "opacity-40 cursor-not-allowed" : ""}
                        `}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                ))}
            </div>

            {openMemberModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/40" onClick={() => setOpenMemberModal(false)}></div>
                    <div className="relative z-10 bg-white w-full max-w-xl rounded-lg shadow-xl p-4 sm:p-5 max-h-[85vh] flex flex-col">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-base font-semibold text-gray-900">Select Member</h3>
                            <button onClick={() => setOpenMemberModal(false)} className="text-gray-400 hover:text-gray-700">
                                <i className="fas fa-times"></i>
                            </button>
                        </div>

                        <div className="flex gap-2 mb-3">
                            <input
                                value={memberSearch}
                                onChange={(e) => setMemberSearch(e.target.value)}
                                placeholder="Search member by name or phone"
                                className="flex-1 h-10 rounded-md border border-gray-200 px-3 text-sm"
                            />
                            <button
                                onClick={searchMembers}
                                className="h-10 px-4 rounded-md bg-red-800 text-white text-sm font-medium"
                            >
                                Search
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto border border-gray-100 rounded-md">
                            {members.data.length === 0 ? (
                                <p className="text-sm text-gray-500 text-center py-6">No members found</p>
                            ) : (
                                members.data.map((member) => (
                                    <button
                                        key={member.id}
                                        onClick={() => selectMember(member)}
                                        className="w-full px-3 py-3 text-left border-b border-gray-100 last:border-b-0 hover:bg-red-50/40 transition"
                                    >
                                        <p className="font-medium text-gray-900 text-sm">{member.name}</p>
                                        <p className="text-xs text-gray-500">{member.phone}</p>
                                    </button>
                                ))
                            )}
                        </div>

                        <div className="mt-3 flex justify-end gap-1 flex-wrap">
                            {members.links.map((link, index) => (
                                <button
                                    key={index}
                                    disabled={!link.url}
                                    onClick={() => {
                                        if (!link.url) return;
                                        router.get(link.url, {}, { preserveState: true, replace: true });
                                    }}
                                    className={`
                                        min-w-[34px] h-8 px-2 rounded text-xs transition
                                        ${link.active ? "bg-red-800 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}
                                        ${!link.url ? "opacity-40 cursor-not-allowed" : ""}
                                    `}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
