import AdminLayout from "@/layouts/AdminLayout";

export default function Dashboard() {
    return (
        <AdminLayout>

            {/* ================= HEADER ================= */}
            <div className="mb-8">
                <h1 className="text-2xl font-semibold text-gray-900">
                    Dashboard Overview
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                    Complete snapshot of NGO commitments & activities
                </p>
            </div>

            {/* ================= STATS ================= */}
            <div className="
                grid grid-cols-2
                lg:grid-cols-4
                gap-4 sm:gap-6
            ">
                <StatCard
                    title="Total Commitment"
                    value="₹ 2,500"
                    icon="fa-hand-holding-heart"
                />
                <StatCard
                    title="Amount Received"
                    value="₹ 18,000"
                    icon="fa-wallet"
                />
                <StatCard
                    title="Remaining Balance"
                    value="₹ 68,600"
                    icon="fa-piggy-bank"
                />
                <StatCard
                    title="Active Supporters"
                    value="62"
                    icon="fa-users"
                />
            </div>

            {/* ================= LOWER GRID ================= */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10">

                {/* ================= ACTIVITY ================= */}
                <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-sm font-semibold text-gray-900 mb-5">
                        Recent Activity
                    </h2>

                    <div className="space-y-4">
                        <Activity text="₹50,000 received from Ramesh Kumar" time="2 hours ago" />
                        <Activity text="New yearly commitment added (₹1,20,000)" time="Yesterday" />
                        <Activity text="Healthcare program updated" time="2 days ago" />
                        <Activity text="New supporter joined: Anita Sharma" time="3 days ago" />
                    </div>
                </div>

                {/* ================= QUICK ACTIONS ================= */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-sm font-semibold text-gray-900 mb-5">
                        Quick Actions
                    </h2>

                    <div className="space-y-2">
                        <Action label="Add New Program" icon="fa-plus" href="/admin/programs/create" />
                        <Action label="Add Commitment" icon="fa-calendar-plus" href="/admin/commitments/create" />
                        <Action label="View Reports" icon="fa-file-alt" href="/admin/reports" />
                    </div>
                </div>

            </div>

        </AdminLayout>
    );
}

/* ================= COMPONENTS ================= */

function StatCard({ title, value, icon }) {
    return (
        <div className="
            bg-white rounded-lg shadow-sm
            px-5 py-4
            hover:shadow transition
        ">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-xs text-gray-500">
                        {title}
                    </p>
                    <p className="text-xl font-semibold text-gray-900 mt-1">
                        {value}
                    </p>
                </div>

                <div className="
                    w-10 h-10 rounded-md
                    bg-red-50 text-red-700
                    flex items-center justify-center
                ">
                    <i className={`fas ${icon} text-sm`}></i>
                </div>
            </div>
        </div>
    );
}

function Activity({ text, time }) {
    return (
        <div className="flex items-start justify-between gap-4">
            <p className="text-sm text-gray-700 leading-relaxed">
                {text}
            </p>
            <span className="text-xs text-gray-400 whitespace-nowrap">
                {time}
            </span>
        </div>
    );
}

function Action({ label, icon, href }) {
    return (
        <a
            href={href}
            className="
                flex items-center gap-3 px-3 py-2 rounded-md
                text-sm text-gray-700
                hover:bg-red-50 transition
            "
        >
            <div className="
                w-8 h-8 rounded-md
                bg-red-50 text-red-700
                flex items-center justify-center
            ">
                <i className={`fas ${icon} text-xs`}></i>
            </div>
            {label}
        </a>
    );
}
