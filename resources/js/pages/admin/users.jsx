 import { useState } from "react";
 import AdminLayout from "@/layouts/AdminLayout";
 import { Link, usePage, router } from "@inertiajs/react";
 import { UserPlus, Search, ChevronRight, Filter } from "lucide-react";
 import { cn } from "@/lib/utils";

 export default function Users() {
  const { users, filters } = usePage().props;

  const [search, setSearch] = useState(filters?.search || "");
  const [role, setRole] = useState(filters?.role || "all");
   const [deletingUserId, setDeletingUserId] = useState(null);

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

  const confirmDelete = (id) => {
  router.delete(`/admin/users/${id}`, {
  preserveScroll: true,
  onSuccess: () => setDeletingUserId(null),
  });
  };

  return ( 
  <AdminLayout>

  {/* HEADER */}
  <div className="flex items-center justify-between mb-4 mt-2 px-1">
  <div>
  <h1 className="text-xl font-bold text-slate-900 tracking-tight">
  Members Directory
  </h1>
  <p className="text-xs text-slate-500 font-medium tracking-wide">
  Total: {users.total} entries
  </p>
  </div>
  <Link
  href="/admin/add-member-page"
  className="flex items-center justify-center h-10 w-10 sm:h-auto sm:w-auto sm:px-4 rounded-md bg-red-600 text-white hover:bg-red-700 transition-colors active:scale-95"
  >
  <UserPlus className="h-4 w-4 sm:mr-2" />
  <span className="hidden sm:inline text-sm font-semibold">Add New</span>
  </Link>
  </div>

  {/* FILTER BAR */}
  <div className="mb-4 flex flex-col sm:flex-row gap-3">
  {/* SEARCH */}
  <div className="relative flex-1">
    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
    <input
    value={search}
    onChange={handleSearch}
    placeholder="Search members..."
    className="w-full h-11 pl-10 pr-4 rounded-md bg-white border-none focus:ring-2 focus:ring-red-100 transition-all text-sm shadow-sm"
    />
  </div>

  {/* ROLE FILTER */}
  <div className="flex gap-1 overflow-x-auto custom-scrollbar pb-1 sm:pb-0">
  {["all", "member", "user", "admin"].map(r => (
  <button
  key={r}
  onClick={() => changeRole(r)}
  className={cn(
    "whitespace-nowrap h-11 px-4 rounded-md text-xs font-bold uppercase tracking-widest transition-all shadow-sm",
    role === r ? "bg-slate-900 text-white" : "bg-white text-slate-500 hover:bg-slate-50"
  )}
  >
  {r}
  </button>
  ))}
  </div>
  </div>

  {/* USER LIST (MOBILE/APP STYLE) */}
  <div className="space-y-2 pb-20">
  {users.data.length === 0 ? (
    <div className="text-center py-10 bg-white rounded-md">
      <Filter className="h-8 w-8 text-slate-300 mx-auto mb-2" />
      <span className="text-sm font-medium text-slate-500">No members found</span>
    </div>
  ) : (
  users.data.map(user => (
  <div
  key={user.id}
  className="flex items-center justify-between p-3 sm:p-4 rounded-md bg-white border border-slate-50 group hover:shadow-md hover:border-red-100 transition-all active:scale-[0.98]"
  >
  <Link
  href={`/admin/userdetail/${user.id}`}
  className="flex items-center gap-3 sm:gap-4 overflow-hidden flex-1 min-w-0"
  >
  <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-md bg-slate-100 flex-shrink-0 flex items-center justify-center text-slate-500 font-bold group-hover:bg-red-500 group-hover:text-white transition-colors">
    {user.name.charAt(0)}
  </div>
  <div className="min-w-0">
    <p className="text-sm sm:text-base font-bold text-slate-900 tracking-tight truncate leading-tight mb-1">
      {user.name}
    </p>
    <div className="flex items-center gap-2">
      <p className="text-[10px] sm:text-xs text-slate-500 font-medium truncate">
        {user.phone || user.email}
      </p>
      <span className={cn(
        "inline-flex items-center px-1.5 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider",
        user.role === 'admin' ? 'bg-purple-100 text-purple-700' :
        user.role === 'member' ? 'bg-emerald-100 text-emerald-700' :
        'bg-slate-100 text-slate-600'
      )}>
        {user.role}
      </span>
    </div>
  </div>
  </Link>
  
  <div className="flex items-center gap-2 pl-2">
    <button
      onClick={() => setDeletingUserId(user.id)}
      className="h-8 w-8 rounded-md bg-slate-50 flex items-center justify-center text-red-600 hover:bg-red-50 transition-all"
      title="Delete User"
    >
      <i className="fas fa-trash text-[11px]"></i>
    </button>
    <Link
      href={`/admin/userdetail/${user.id}`}
      className="h-8 w-8 rounded-md bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-red-50 group-hover:text-red-600 transition-all"
    >
      <ChevronRight className="h-4 w-4" />
    </Link>
  </div>
  </div>
  ))
  )}
  </div>

  {/* PAGINATION */}
  {users.links.length > 3 && (
  <div className="mt-4 pb-20 flex justify-center gap-1 flex-wrap">
  {users.links.map((link, index) => (
  <button
  key={index}
  disabled={!link.url}
  onClick={() =>
  link.url &&
  router.get(link.url, {}, { preserveState: true })
  }
  className={cn(
    "min-w-[36px] h-9 px-3 rounded-md text-xs font-bold transition-all",
    link.active ? "bg-red-600 text-white shadow-sm" : "bg-white text-slate-500 hover:bg-slate-50",
    !link.url && "opacity-40 cursor-not-allowed shadow-none"
  )}
  dangerouslySetInnerHTML={{ __html: link.label }}
  />
  ))}
  </div>
  )}

    {deletingUserId && (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={() => setDeletingUserId(null)}></div>
      <div className="bg-white w-full max-w-sm rounded-md p-4 text-center relative z-10 animate-in fade-in zoom-in-95 duration-200">
        <div className="w-14 h-14 bg-red-50 rounded-md flex items-center justify-center text-red-600 mx-auto mb-4">
          <i className="fas fa-user-times text-xl"></i>
        </div>
        <h3 className="text-lg font-black text-gray-900 mb-2">Delete this user?</h3>
        <p className="text-xs font-medium text-gray-500 leading-relaxed mb-4">
          This will remove the user and all related plans, payments, and expenses. Are you sure you want to proceed?
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => setDeletingUserId(null)}
            className="flex-1 h-11 rounded-md bg-gray-100 text-xs font-bold text-gray-600 hover:bg-gray-200 transition"
          >
            Cancel
          </button>
          <button
            onClick={() => confirmDelete(deletingUserId)}
            className="flex-1 h-11 rounded-md bg-red-800 text-white text-xs font-bold hover:bg-red-900 transition"
          >
            Delete Now
          </button>
        </div>
      </div>
    </div>
    )}

 </AdminLayout>
 );
}
