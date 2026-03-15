import { router, usePage } from "@inertiajs/react";
import { useState } from "react";
import AdminLayout from "@/layouts/AdminLayout";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";

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
  const [dateFilter, setDateFilter] = useState(filters.date_filter || "all");
  const [from, setFrom] = useState(filters.from || "");
  const [to, setTo] = useState(filters.to || "");
  const [memberSearch, setMemberSearch] = useState(filters.member_query || "");
  const [openMemberModal, setOpenMemberModal] = useState(Boolean(filters.open_member_modal));
  const [sendingId, setSendingId] = useState(null);
  const [deletingPaymentId, setDeletingPaymentId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteStatus, setDeleteStatus] = useState(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const buildFilterParams = (overrides = {}) => {
    const merged = {
      q: query,
      member_id: memberId,
      payment_mode: paymentMode,
      plan_id: planId,
      date_filter: dateFilter,
      from,
      to,
      ...overrides,
    };

    return Object.fromEntries(
      Object.entries(merged).filter(([key, value]) => {
        if (key === "payment_mode" || key === "plan_id" || key === "date_filter") return value;
        return value !== "" && value !== null && value !== undefined;
      })
    );
  };

  const applyFilters = () => {
    router.get("/admin/transactions", buildFilterParams(), {
      preserveState: true,
      replace: true,
    });
    setShowMobileFilters(false);
  };

  const clearFilters = () => {
    setQuery("");
    setPaymentMode("all");
    setPlanId("all");
    setDateFilter("all");
    setFrom("");
    setTo("");

    router.get("/admin/transactions", {}, {
      preserveState: true,
      replace: true,
    });

    setMemberId("");
    setMemberLabel("");
    setShowMobileFilters(false);
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

  const confirmDelete = (paymentId) => {
    setIsDeleting(true);
    setDeleteStatus(null);
    router.delete(`/admin/transactions/${paymentId}`, {
      preserveScroll: true,
      onFinish: () => setIsDeleting(false),
      onSuccess: () => {
        setDeleteStatus("success");
        setTimeout(() => {
          setDeletingPaymentId(null);
          setDeleteStatus(null);
        }, 1500);
      },
    });
  };

  const dateOptions = [
    { value: "all", label: "All Time" },
    { value: "today", label: "Today" },
    { value: "this_week", label: "This Week" },
    { value: "last_week", label: "Last Week" },
    { value: "this_month", label: "This Month" },
    { value: "last_month", label: "Last Month" },
    { value: "last_3_months", label: "Last 3 Months" },
    { value: "last_6_months", label: "Last 6 Months" },
    { value: "this_year", label: "This Year" },
    { value: "last_year", label: "Last Year" },
  ];

  return (
    <AdminLayout title="All Transactions">
      <div className="pb-20">
        <div className="mb-4 mt-2 px-1">
          <div className="bg-white rounded-md border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-3 flex items-center justify-between gap-3">
              <div>
                <p className="text-[10px] sm:text-xs text-slate-500 font-bold tracking-tight uppercase">
                  {payments.total} Total record{payments.total !== 1 ? 's' : ''}
                </p>
              </div>
              <div className="flex gap-2">
                <Sheet open={showMobileFilters} onOpenChange={setShowMobileFilters}>
                  <SheetTrigger asChild>
                    <button className="flex items-center gap-2 h-8 px-3 rounded-md bg-white border border-slate-200 text-slate-600 text-[10px] font-bold hover:bg-slate-50 transition relative active:scale-95 shadow-sm">
                      <i className="fas fa-filter text-xs text-red-600"></i>
                      Filters
                      {(query || memberId || paymentMode !== 'all' || planId !== 'all' || dateFilter !== 'all' || from || to) && (
                        <span className="absolute -top-1 -right-1 h-2.5 w-2.5 bg-red-600 rounded-full border border-white"></span>
                      )}
                    </button>
                  </SheetTrigger>
                  <a
                    href="/admin/transactions/download-pdf"
                    target="_blank"
                    className="flex items-center gap-2 h-8 px-3 rounded-md bg-red-600 text-white text-[10px] font-bold hover:bg-red-700 transition active:scale-95 shadow-md"
                  >
                    <i className="fas fa-file-pdf"></i>
                    PDF
                  </a>
                  <SheetContent side="bottom" className="rounded-t-[24px] p-0 border-none px-6 pb-12 pt-2 ring-1 ring-black/5 bg-white">
                    <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-6"></div>
                    <SheetHeader className="mb-6">
                      <SheetTitle className="text-xl font-black text-slate-900 tracking-tight text-left">Search & Filter</SheetTitle>
                    </SheetHeader>

                    <div className="space-y-5">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Keywords</label>
                        <input
                          value={query}
                          onChange={(e) => setQuery(e.target.value)}
                          placeholder="Search amount or name..."
                          className="w-full h-12 rounded-xl bg-slate-50 border-none px-4 text-sm font-bold focus:ring-2 focus:ring-red-100"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Period</label>
                        <select
                          value={dateFilter}
                          onChange={(e) => setDateFilter(e.target.value)}
                          className="w-full h-12 rounded-xl bg-slate-50 border-none px-4 text-sm font-bold focus:ring-2 focus:ring-red-100"
                        >
                          {dateOptions.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Payment Mode</label>
                        <select
                          value={paymentMode}
                          onChange={(e) => setPaymentMode(e.target.value)}
                          className="w-full h-12 rounded-xl bg-slate-50 border-none px-4 text-sm font-bold focus:ring-2 focus:ring-red-100"
                        >
                          {paymentModes.map((mode) => (
                            <option key={mode} value={mode}>{mode === "all" ? "All Modes" : mode.toUpperCase()}</option>
                          ))}
                        </select>
                      </div>

                      <div className="flex gap-3 pt-6">
                        <button onClick={clearFilters} className="flex-1 h-14 rounded-xl bg-slate-100 text-slate-600 text-sm font-bold active:scale-95 transition">Reset</button>
                        <button onClick={applyFilters} className="flex-[2] h-14 rounded-xl bg-red-600 text-white text-sm font-bold shadow-lg shadow-red-900/20 active:scale-95 transition">Apply</button>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>

            <div className="hidden sm:block border-t border-slate-50 p-3 bg-slate-50/20">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-2">
                <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search..." className="h-8 rounded-md border border-slate-200 px-3 text-[10px] focus:ring-1 focus:ring-red-100" />
                <select value={dateFilter} onChange={(e) => { setDateFilter(e.target.value); setTimeout(applyFilters, 10); }} className="h-8 rounded-md border border-slate-200 px-3 text-[10px]">
                  {dateOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
                <select value={paymentMode} onChange={(e) => setPaymentMode(e.target.value)} className="h-8 rounded-md border border-slate-200 px-3 text-[10px]">
                  {paymentModes.map((mode) => (
                    <option key={mode} value={mode}>{mode === "all" ? "All Modes" : mode.toUpperCase()}</option>
                  ))}
                </select>
                <button onClick={applyFilters} className="h-8 px-4 rounded-md bg-red-600 text-white text-[10px] font-bold">Apply</button>
                <button onClick={clearFilters} className="h-8 px-4 rounded-md bg-slate-200 text-slate-600 text-[10px] font-bold">Reset</button>
                <a
                  href="/admin/transactions/download-pdf"
                  target="_blank"
                  className="h-8 px-4 rounded-md bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center gap-2 shadow-md hover:bg-emerald-700 transition active:scale-95"
                >
                  <i className="fas fa-file-pdf"></i>
                  Download PDF
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-md border border-slate-100 overflow-hidden shadow-sm">
          <div className="sm:hidden bg-slate-50 border-b border-slate-100 px-3 py-2.5 text-[10px] font-bold text-slate-400 flex items-center gap-2 uppercase tracking-widest">
            <i className="fas fa-arrows-alt-h text-red-500"></i>
            <span>Scroll for more</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[980px] text-[13px]">
              <thead className="bg-slate-50/50 text-slate-500 border-b border-slate-100">
                <tr>
                  <th className="text-left px-4 py-4 font-bold uppercase tracking-wider text-[10px]">Date</th>
                  <th className="text-left px-4 py-4 font-bold uppercase tracking-wider text-[10px]">Member</th>
                  <th className="text-left px-4 py-4 font-bold uppercase tracking-wider text-[10px]">Plan</th>
                  <th className="text-right px-4 py-4 font-bold uppercase tracking-wider text-[10px]">Amount</th>
                  <th className="text-left px-4 py-4 font-bold uppercase tracking-wider text-[10px]">Mode</th>
                  <th className="text-center px-4 py-4 font-bold uppercase tracking-wider text-[10px]">OTP Status</th>
                  <th className="text-right px-4 py-4 font-bold uppercase tracking-wider text-[10px]">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {payments.data.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="py-12 text-center text-slate-400 font-medium italic">
                      No transactions found matching filters.
                    </td>
                  </tr>
                ) : (
                  payments.data.map((payment) => (
                    <tr key={payment.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-4 py-4 text-slate-600 font-medium">{payment.payment_date}</td>
                      <td className="px-4 py-4">
                        <p className="font-bold text-slate-900 leading-tight">{payment.user?.name || "-"}</p>
                        <p className="text-[11px] text-slate-400 font-medium mt-1">{payment.user?.phone || "-"}</p>
                      </td>
                      <td className="px-4 py-4 text-slate-600 font-bold">{payment.user_plan?.plan?.name || "-"}</td>
                      <td className="px-4 py-4 text-right font-black text-slate-900 text-base tracking-tight">₹{Number(payment.amount || 0).toLocaleString()}</td>
                      <td className="px-4 py-4">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-black bg-slate-100 text-slate-600 uppercase tracking-wider">
                          {payment.payment_mode}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-center">
                        {payment.otp_sent_count > 0 ? (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 mr-2 animate-pulse"></span>
                            {payment.otp_sent_count} Sent
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold bg-slate-100 text-slate-400">
                            0 Sent
                          </span>
                        )}
                      </td>

                      <td className="px-4 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => sendMessage(payment.id)}
                            disabled={sendingId === payment.id}
                            className="h-9 px-4 rounded-xl bg-red-600 text-white text-[11px] font-black hover:bg-red-700 disabled:opacity-50 transition-all shadow-md active:scale-95 tracking-wide uppercase"
                          >
                            {sendingId === payment.id ? "..." : <><i className="fab fa-whatsapp mr-1.5"></i> Send</>}
                          </button>
                          <button
                            onClick={() => setDeletingPaymentId(payment.id)}
                            className="h-9 w-9 rounded-xl bg-white border border-slate-200 text-red-600 hover:bg-red-50 transition-all shadow-sm active:scale-95"
                            title="Delete Transaction"
                          >
                            <i className="fas fa-trash text-[12px]"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {deletingPaymentId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              onClick={() => {
                if (isDeleting) return;
                setDeletingPaymentId(null);
                setDeleteStatus(null);
              }}
            ></div>
            <div className="relative z-10 bg-white w-full max-w-sm rounded-md p-4 text-center animate-in fade-in zoom-in-95 duration-200">
              <div className="w-14 h-14 bg-red-50 rounded-md flex items-center justify-center text-red-600 mx-auto mb-4">
                <i className="fas fa-trash-alt text-xl"></i>
              </div>
              <h3 className="text-lg font-black text-slate-900 mb-2">Delete this transaction?</h3>
              <p className="text-xs font-medium text-slate-500 leading-relaxed mb-4">
                This will permanently remove the payment record. Are you sure you want to proceed?
              </p>
              {deleteStatus === "success" && (
                <div className="mb-4 rounded-md bg-emerald-50 border border-emerald-100 p-2 text-emerald-700 text-xs font-bold">
                  Transaction deleted successfully.
                </div>
              )}
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setDeletingPaymentId(null);
                    setDeleteStatus(null);
                  }}
                  disabled={isDeleting}
                  className="flex-1 h-11 rounded-md bg-slate-100 text-xs font-bold text-slate-600 hover:bg-slate-200 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={() => confirmDelete(deletingPaymentId)}
                  disabled={isDeleting}
                  className="flex-1 h-11 rounded-md bg-red-700 text-white text-xs font-bold hover:bg-red-800 transition disabled:opacity-70"
                >
                  {isDeleting ? (
                    <span className="inline-flex items-center gap-2">
                      <span className="h-3.5 w-3.5 rounded-full border-2 border-white/60 border-t-white animate-spin"></span>
                      Deleting...
                    </span>
                  ) : (
                    "Delete Now"
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 flex justify-center sm:justify-end gap-1.5 flex-wrap px-1">
          {payments.links.map((link, index) => (
            <button
              key={index}
              disabled={!link.url}
              onClick={() => link.url && router.get(link.url, {}, { preserveState: true, preserveScroll: true })}
              className={`
                min-w-[36px] h-9 px-3 rounded-xl text-xs font-bold transition-all shadow-sm
                ${link.active ? "bg-red-600 text-white shadow-red-900/20 active:scale-95" : "bg-white text-slate-500 hover:bg-slate-50 active:scale-95"}
                ${!link.url ? "opacity-40 cursor-not-allowed" : ""}
                `}
              dangerouslySetInnerHTML={{ __html: link.label }}
            />
          ))}
        </div>

        {openMemberModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setOpenMemberModal(false)}></div>
            <div className="relative z-10 bg-white w-full max-w-lg rounded-[24px] p-6 shadow-2xl flex flex-col max-h-[80vh] overflow-hidden">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-black text-slate-900 tracking-tight">Select Member</h3>
                <button onClick={() => setOpenMemberModal(false)} className="h-10 w-10 rounded-full hover:bg-slate-100 flex items-center justify-center transition-colors">
                  <i className="fas fa-times text-slate-400"></i>
                </button>
              </div>

              <div className="flex gap-2 mb-6">
                <div className="relative flex-1">
                  <input
                    value={memberSearch}
                    onChange={(e) => setMemberSearch(e.target.value)}
                    placeholder="Name or phone..."
                    className="w-full h-12 rounded-xl bg-slate-50 border-none px-4 text-sm font-bold focus:ring-2 focus:ring-red-100"
                  />
                </div>
                <button
                  onClick={searchMembers}
                  className="h-12 px-6 rounded-xl bg-red-600 text-white text-sm font-bold shadow-lg shadow-red-900/20 active:scale-95 transition"
                >
                  Search
                </button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                {members.data.length === 0 ? (
                  <div className="text-center py-10 opacity-40 italic text-sm font-medium">No members found</div>
                ) : (
                  members.data.map((member) => (
                    <button
                      key={member.id}
                      onClick={() => selectMember(member)}
                      className="w-full p-4 text-left rounded-xl border border-slate-50 hover:bg-red-50 transition-all flex items-center justify-between group"
                    >
                      <div>
                        <p className="font-extrabold text-slate-900 text-sm tracking-tight">{member.name}</p>
                        <p className="text-[11px] text-slate-400 font-bold mt-1 tracking-wider uppercase">{member.phone}</p>
                      </div>
                      <div className="h-8 w-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-red-500 group-hover:text-white transition-all">
                        <i className="fas fa-chevron-right text-[10px]"></i>
                      </div>
                    </button>
                  ))
                )}
              </div>

              <div className="mt-6 pt-6 border-t border-slate-50 flex justify-center gap-1.5 flex-wrap">
                {members.links.map((link, index) => (
                  <button
                    key={index}
                    disabled={!link.url}
                    onClick={() => {
                      if (!link.url) return;
                      router.get(link.url, { member_query: memberSearch, open_member_modal: 1 }, { preserveState: true, replace: true });
                    }}
                    className={`
                      min-w-[32px] h-8 px-2 rounded-lg text-[10px] font-black transition-all
                      ${link.active ? "bg-red-600 text-white shadow-md" : "bg-slate-100 text-slate-500 hover:bg-slate-200"}
                      ${!link.url ? "opacity-40 cursor-not-allowed" : ""}
                    `}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
