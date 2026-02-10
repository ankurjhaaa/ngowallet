import PublicLayout from "@/layouts/PublicLayout";
import { useForm, usePage } from "@inertiajs/react";
import { useState } from "react";

/* ================= HELPERS ================= */
const formatDate = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
};

export default function Profile() {

    const { user, userPlans = [] } = usePage().props;

    // active plan index
    const [active, setActive] = useState(0);
    const [showEdit, setShowEdit] = useState(false);

    const activePlan = userPlans[active];

    return (
        <PublicLayout>
            <div className=" max-w-4xl mx-auto px-4 py-6">

                {/* ================= HEADER ================= */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <p className="text-sm text-gray-500">Welcome back,</p>
                        <h1 className="text-xl font-bold text-gray-900">
                            {user.name}
                        </h1>
                    </div>

                    <button
                        onClick={() => setShowEdit(true)}
                        className="h-9 w-9 rounded-md bg-gray-100 border border-gray-200
               flex items-center justify-center hover:bg-gray-200"
                        title="Edit Profile"
                    >
                        <i className="fa-regular fa-pen-to-square text-gray-700 text-sm"></i>
                    </button>

                </div>

                {/* ================= PLAN CARD ================= */}
                {userPlans.length > 0 ? (
                    <div className="bg-white rounded-xl shadow-sm p-5 mb-6">

                        {/* TITLE + SWITCH */}
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-sm font-semibold text-gray-900">
                                {activePlan.name}
                            </h2>

                            <div className="flex gap-2">
                                <button
                                    disabled={active === 0}
                                    onClick={() => setActive(active - 1)}
                                    className="h-7 w-7 rounded-full bg-gray-100 disabled:opacity-40"
                                >
                                    ‹
                                </button>
                                <button
                                    disabled={active === userPlans.length - 1}
                                    onClick={() => setActive(active + 1)}
                                    className="h-7 w-7 rounded-full bg-gray-100 disabled:opacity-40"
                                >
                                    ›
                                </button>
                            </div>
                        </div>

                        {/* PROGRESS */}
                        <div className="flex items-center gap-6 mb-5">

                            {/* CIRCLE */}
                            <div className="relative h-24 w-24">
                                <svg viewBox="0 0 36 36" className="h-full w-full">
                                    <path
                                        d="M18 2.0845
                                           a 15.9155 15.9155 0 0 1 0 31.831
                                           a 15.9155 15.9155 0 0 1 0 -31.831"
                                        fill="none"
                                        stroke="#e5e7eb"
                                        strokeWidth="4"
                                    />
                                    <path
                                        d="M18 2.0845
                                           a 15.9155 15.9155 0 0 1 0 31.831
                                           a 15.9155 15.9155 0 0 1 0 -31.831"
                                        fill="none"
                                        stroke="#16a34a"
                                        strokeWidth="4"
                                        strokeDasharray={`${activePlan.percentage_paid}, 100`}
                                    />
                                </svg>

                                <div className="absolute inset-0 flex items-center justify-center text-sm font-bold">
                                    {activePlan.percentage_paid}%
                                </div>
                            </div>

                            {/* LEGEND */}
                            <div className="text-sm space-y-2">
                                <Legend
                                    color="green"
                                    label="Paid"
                                    value={activePlan.yearly_amount - activePlan.due_amount}
                                />
                                <Legend
                                    color="red"
                                    label="Pending"
                                    value={activePlan.due_amount}
                                />
                            </div>
                        </div>

                        {/* STATS */}
                        <div className="grid grid-cols-3 text-center border-t pt-4 text-sm">
                            <Stat label="Commitment" value={activePlan.yearly_amount} />
                            <Stat
                                label="Paid"
                                value={activePlan.yearly_amount - activePlan.due_amount}
                                color="green"
                            />
                            <Stat
                                label="Pending"
                                value={activePlan.due_amount}
                                color="red"
                            />
                        </div>

                        {/* DATE RANGE */}
                        <p className="text-xs text-gray-500 text-center mt-3">
                            {formatDate(activePlan.start_date)} – {formatDate(activePlan.end_date)}
                        </p>
                    </div>
                ) : (
                    <div className="bg-white rounded-xl shadow-sm p-6 mb-6 flex flex-col items-center justify-center text-center min-h-55">

                        {/* ICON */}
                        <div className="h-14 w-14 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                            <i className="fa-regular fa-folder-open text-gray-400 text-xl"></i>
                        </div>

                        {/* TITLE */}
                        <h3 className="text-sm font-semibold text-gray-900 mb-1">
                            No Active Plan
                        </h3>

                        {/* DESC */}
                        <p className="text-sm text-gray-500 max-w-xs">
                            You don’t have any active contribution plan right now.
                            Once a plan is assigned, it will appear here with progress details.
                        </p>

                        {/* OPTIONAL CTA (future use) */}

                        <button className="mt-4 px-4 py-2 text-sm rounded-md bg-red-800 text-white">
                            Contact Us
                        </button>

                    </div>
                )}

                {/* ================= CONTRIBUTIONS ================= */}
                <div className="bg-white rounded-xl shadow-sm p-5">
                    <h3 className="text-sm font-semibold mb-4">
                        Your Contributions
                    </h3>

                    {activePlan && activePlan.payments.length > 0 ? (
                        <div className="space-y-3">
                            {activePlan.payments.map((p, i) => (
                                <div
                                    key={i}
                                    className="flex justify-between items-center bg-gray-50 rounded-lg px-4 py-3"
                                >
                                    <div>
                                        <p className="text-sm text-gray-900">
                                            {formatDate(p.payment_date)}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {p.payment_mode}
                                        </p>
                                    </div>

                                    <span className="text-green-600 font-semibold">
                                        ₹{p.amount}
                                    </span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-gray-500">
                            No contributions
                        </p>
                    )}
                </div>

            </div>
            {
                showEdit && (
                    <EditProfileModal
                        user={user}
                        onClose={() => setShowEdit(false)}
                    />
                )
            }
        </PublicLayout>

    );
}

/* ================= UI ATOMS ================= */

function Legend({ color, label, value }) {
    return (
        <div className="flex items-center gap-2">
            <span
                className={`h-2 w-2 rounded-full ${color === "green" ? "bg-green-500" : "bg-red-500"
                    }`}
            />
            <span className="text-gray-600">
                {label} – ₹{value}
            </span>
        </div>
    );
}

function Stat({ label, value, color }) {
    return (
        <div>
            <p className="text-xs text-gray-500">{label}</p>
            <p
                className={`font-semibold ${color === "green"
                    ? "text-green-600"
                    : color === "red"
                        ? "text-red-600"
                        : "text-gray-900"
                    }`}
            >
                ₹{value}
            </p>
        </div>
    );
}




function EditProfileModal({ user, onClose }) {

    const { data, setData, post, processing, errors } = useForm({
        name: user.name || "",
        email: user.email || "",
        address: user.address || "",
        gender: user.gender || "",
        date_of_birth: user.date_of_birth || "",
    });

    const submit = (e) => {
        e.preventDefault();
        post('profile_update', {
            onSuccess: () => onClose(),
        });
    };

    return (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">
            <div className="bg-white rounded-md w-full max-w-md p-6">

                {/* HEADER */}
                <div className="flex justify-between items-center mb-5">
                    <h3 className="text-lg font-semibold">Edit Profile</h3>
                    <button onClick={onClose} className="text-gray-400">✕</button>
                </div>

                <form onSubmit={submit} className="space-y-4 text-sm">

                    <Input
                        label="Full Name"
                        value={data.name}
                        onChange={e => setData("name", e.target.value)}
                        error={errors.name}
                    />

                    <Input
                        label="Email"
                        value={data.email}
                        onChange={e => setData("email", e.target.value)}
                        error={errors.email}
                    />


                    {/* GENDER */}
                    <div>
                        <label className="text-xs text-gray-500">Gender</label>
                        <select
                            value={data.gender}
                            onChange={e => setData("gender", e.target.value)}
                            className="w-full h-11 mt-1 rounded-md bg-gray-50 px-4
                           border border-gray-200 text-sm
                           focus:ring-2 focus:ring-red-200 border-outline-none"
                        >
                            <option value="">Select gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                        {errors.gender && <Error text={errors.gender} />}
                    </div>

                    <Input
                        type="date"
                        label="Date of Birth"
                        value={data.date_of_birth}
                        onChange={e => setData("date_of_birth", e.target.value)}
                        error={errors.date_of_birth}
                        
                    />

                    <div>
                        <label className="text-xs text-gray-500">Address</label>
                        <textarea
                            value={data.address}
                            onChange={e => setData("address", e.target.value)}
                            rows="3"
                            className="w-full mt-1 rounded-md bg-gray-50 px-4 py-2 border focus:ring-2 focus:ring-red-200 border-gray-200"
                        />
                        {errors.address && <Error text={errors.address} />}
                    </div>

                    {/* ACTIONS */}
                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 h-11 rounded-md bg-gray-200"
                        >
                            Cancel
                        </button>
                        <button
                            disabled={processing}
                            className="flex-1 h-11 rounded-md bg-red-800 text-white disabled:opacity-60"
                        >
                            Save Changes
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}

function Error({ text }) {
    return (
        <p className="text-xs text-red-600 mt-1">
            {text}
        </p>
    );
}

function Input({ label, ...props }) {
    return (
        <div>
            <label className="text-xs text-gray-500">{label}</label>
            <input
                {...props}
                className="w-full h-11 mt-1 rounded-md bg-gray-50 px-4
                           border border-gray-200 text-sm
                           focus:ring-2 focus:ring-red-200 border-outline-none"
            />
        </div>
    );
}
