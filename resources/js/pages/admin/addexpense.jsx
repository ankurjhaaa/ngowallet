import { useState } from "react";
import AdminLayout from"@/layouts/AdminLayout";
import { useForm, usePage, router } from"@inertiajs/react";

export default function addexpence() {
 const { expenses } = usePage().props;
 const [deletingExpenseId, setDeletingExpenseId] = useState(null);
 const [isDeleting, setIsDeleting] = useState(false);
 const [deleteStatus, setDeleteStatus] = useState(null);

 const { data, setData, post, processing, errors, reset } = useForm({
 amount:"",
 description:"",
 });

 const submit = (e) => {
 e.preventDefault();
 post("/admin/add-expenses", {
 onSuccess: () => reset(),
 });
 };

 const confirmDelete = (id) => {
 setIsDeleting(true);
 setDeleteStatus(null);
 router.delete(`/admin/expense/${id}`, {
 preserveScroll: true,
 onFinish: () => setIsDeleting(false),
 onSuccess: () => {
	setDeleteStatus("success");
	setTimeout(() => {
		setDeletingExpenseId(null);
		setDeleteStatus(null);
	}, 1500);
 },
 });
 };

 return (
 <AdminLayout>

 {/* ================= HEADER ================= */}
 <div className="mb-4">
 <h1 className="text-xl font-semibold text-gray-900">
 NGO Expenses
 </h1>
 <p className="text-sm text-gray-500 mt-1">
 Track and manage NGO spending
 </p>
 </div>

 {/* ================= MAIN GRID ================= */}
 <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">

 {/* ================= FORM ================= */}
 <div className="bg-white rounded-md p-3">

 <h2 className="text-sm font-semibold text-gray-900 mb-4">
 Add Expense
 </h2>

 <form onSubmit={submit} className="space-y-4">

 {/* AMOUNT */}
 <div>
 <label className="block text-xs font-medium text-gray-600 mb-1">
 Amount
 </label>
 <input
 type="number"
 value={data.amount}
 onChange={e => setData("amount", e.target.value)}
 className="
 w-full h-10 px-3 rounded-md
 border border-gray-300
 text-sm text-gray-700
 focus:outline-none
 focus:ring-2 focus:ring-red-200
 focus:border-red-300
"
 />
 {errors.amount && (
 <p className="text-xs text-red-700 mt-1">
 {errors.amount}
 </p>
 )}
 </div>

 {/* DESCRIPTION */}
 <div>
 <label className="block text-xs font-medium text-gray-600 mb-1">
 Description
 </label>
 <textarea
 rows="3"
 value={data.description}
 onChange={e => setData("description", e.target.value)}
 className="
 w-full px-3 py-2 rounded-md
 border border-gray-300
 text-sm text-gray-700
 resize-none
 focus:outline-none
 focus:ring-2 focus:ring-red-200
 focus:border-red-300
"
 />
 {errors.description && (
 <p className="text-xs text-red-700 mt-1">
 {errors.description}
 </p>
 )}
 </div>

 {/* ACTION */}
 <button
 type="submit"
 disabled={processing}
 className="
 w-full h-10 rounded-md text-sm font-medium
 bg-red-800 text-white
 hover:bg-red-900 transition
 disabled:opacity-60
"
 >
 Save Expense
 </button>
 </form>
 </div>

 {/* ================= HISTORY ================= */}
 <div className="lg:col-span-2 bg-white rounded-md p-3">

 <h2 className="text-sm font-semibold text-gray-900 mb-4">
 Expense History
 </h2>

 {/* ================= LIST ================= */}
 <div className="space-y-3">
 {expenses?.data?.length === 0 ? (
 <p className="text-sm text-gray-500">
 No expenses recorded
 </p>
 ) : (
 expenses.data.map(exp => (
 <div
 key={exp.id}
 className="
 bg-gray-50 rounded-md p-4
 hover:bg-red-50/40 transition
"
 >
 {/* TOP ROW */}
 <div className="flex items-center justify-between mb-1">
 <p className="text-sm font-semibold text-red-800">
 ₹ {exp.amount}
 </p>

 <span className="text-xs text-gray-400 whitespace-nowrap">
 {exp.date}
 </span>
 </div>

 {/* DESCRIPTION */}
 <p className="text-sm text-gray-700 leading-relaxed">
 {exp.description}
 </p>
 <div className="mt-3 flex justify-end">
 <button
  onClick={() => setDeletingExpenseId(exp.id)}
  className="h-7 px-3 rounded-md bg-white border border-gray-200 text-[10px] font-bold text-red-700 hover:bg-red-50 transition"
 >
  <i className="fas fa-trash mr-1"></i>
  Delete
 </button>
 </div>
 </div>
 ))
 )}
 </div>


 {/* PAGINATION */}
 {expenses.links.length > 1 && (
 <div className="mt-5 flex justify-end gap-1 flex-wrap">
 {expenses.links.map((link, index) => (
 <button
 key={index}
 disabled={!link.url}
 onClick={() =>
 link.url &&
 router.get(link.url, {}, { preserveState: true })
 }
 className={`
 min-w-8 h-8 px-2 rounded-md text-xs
 ${link.active
 ?"bg-red-800 text-white"
 :"bg-white text-gray-600 hover:bg-red-50"}
 ${!link.url &&"opacity-40 cursor-not-allowed"}
`}
 dangerouslySetInnerHTML={{ __html: link.label }}
 />
 ))}
 </div>
 )}
 </div>

 </div>

 {deletingExpenseId && (
 <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
 <div
	className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm"
	onClick={() => {
		if (isDeleting) return;
		setDeletingExpenseId(null);
		setDeleteStatus(null);
	}}
 ></div>
  <div className="bg-white w-full max-w-sm rounded-md p-4 text-center relative z-10 animate-in fade-in zoom-in-95 duration-200">
   <div className="w-14 h-14 bg-red-50 rounded-md flex items-center justify-center text-red-600 mx-auto mb-4">
	<i className="fas fa-trash-alt text-xl"></i>
   </div>
   <h3 className="text-lg font-black text-gray-900 mb-2">Delete this expense?</h3>
   <p className="text-xs font-medium text-gray-500 leading-relaxed mb-4">
	This will permanently remove the expense entry. Are you sure you want to proceed?
   </p>
	 {deleteStatus === "success" && (
		<div className="mb-4 rounded-md bg-emerald-50 border border-emerald-100 p-2 text-emerald-700 text-xs font-bold">
		 Expense deleted successfully.
		</div>
	 )}
   <div className="flex gap-3">
	<button
		 onClick={() => {
			setDeletingExpenseId(null);
			setDeleteStatus(null);
		 }}
		disabled={isDeleting}
	 className="flex-1 h-11 rounded-md bg-gray-100 text-xs font-bold text-gray-600 hover:bg-gray-200 transition"
	>
	 Cancel
	</button>
	<button
	 onClick={() => confirmDelete(deletingExpenseId)}
		disabled={isDeleting}
		className="flex-1 h-11 rounded-md bg-red-800 text-white text-xs font-bold hover:bg-red-900 transition disabled:opacity-70"
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

 </AdminLayout>
 );
}
