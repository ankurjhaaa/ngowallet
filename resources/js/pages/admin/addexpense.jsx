import AdminLayout from "@/layouts/AdminLayout";
import { useForm, usePage, router } from "@inertiajs/react";

export default function addexpence() {
    const { expenses } = usePage().props;

    const { data, setData, post, processing, errors, reset } = useForm({
        amount: "",
        description: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post("/admin/add-expenses", {
            onSuccess: () => reset(),
        });
    };

    return (
        <AdminLayout>

            {/* ================= HEADER ================= */}
            <div className="mb-6">
                <h1 className="text-xl font-semibold text-gray-900">
                    NGO Expenses
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                    Track and manage NGO spending
                </p>
            </div>

            {/* ================= MAIN GRID ================= */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

                {/* ================= FORM ================= */}
                <div className="bg-white rounded-lg shadow-sm p-5">

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
                <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-5">

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
                                            ? "bg-red-800 text-white"
                                            : "bg-white text-gray-600 hover:bg-red-50"}
                                        ${!link.url && "opacity-40 cursor-not-allowed"}
                                    `}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    )}
                </div>

            </div>

        </AdminLayout>
    );
}
