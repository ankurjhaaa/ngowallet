import PublicLayout from "@/layouts/PublicLayout";

export default function programs() {
    return (
        <PublicLayout>

            {/* ================= HEADER ================= */}
            <section className="max-w-7xl mx-auto px-4 pt-20 pb-14 text-center">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                    Our Programs
                </h1>
                <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                    We run focused programs that create real impact in education,
                    healthcare, and community development.
                </p>
            </section>

            {/* ================= PROGRAM LIST ================= */}
            <section className="bg-gray-50 py-16">
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">

                    <ProgramCard
                        icon="fa-graduation-cap"
                        title="Education Support"
                        desc="Providing school fees, books, uniforms, and digital learning
                              resources to underprivileged children."
                        stats={[
                            "1,200+ students supported",
                            "35 schools covered",
                        ]}
                    />

                    <ProgramCard
                        icon="fa-hospital"
                        title="Healthcare Assistance"
                        desc="Medical camps, emergency treatments, free medicines,
                              and health awareness programs."
                        stats={[
                            "50+ medical camps",
                            "8,000+ patients treated",
                        ]}
                    />

                    <ProgramCard
                        icon="fa-people-carry"
                        title="Community Development"
                        desc="Food distribution, skill development, women empowerment,
                              and livelihood support initiatives."
                        stats={[
                            "25 villages impacted",
                            "500+ families supported",
                        ]}
                    />

                </div>
            </section>

            {/* ================= CTA ================= */}
            <section className="max-w-7xl mx-auto px-4 py-20 text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    Want to Support a Program?
                </h2>
                <p className="mt-3 text-gray-600 max-w-xl mx-auto">
                    You can donate to a specific program or join us as a volunteer
                    to make a direct impact.
                </p>

                <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                    <a
                        href="/donate"
                        className="bg-red-800 text-white px-6 py-3 rounded-md hover:bg-red-700 transition"
                    >
                        Donate Now
                    </a>
                    <a
                        href="/signup"
                        className="border border-red-800 text-red-800 px-6 py-3 rounded-md hover:bg-red-50 transition"
                    >
                        Join as Volunteer
                    </a>
                </div>
            </section>

        </PublicLayout>
    );
}

/* ================= PROGRAM CARD ================= */

function ProgramCard({ icon, title, desc, stats }) {
    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition">

            <div className="w-12 h-12 rounded-xl bg-red-100 text-red-800 flex items-center justify-center text-lg">
                <i className={`fas ${icon}`}></i>
            </div>

            <h3 className="mt-4 text-xl font-semibold text-gray-900">
                {title}
            </h3>

            <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                {desc}
            </p>

            <ul className="mt-4 space-y-2 text-sm text-gray-500">
                {stats.map((item, index) => (
                    <li key={index} className="flex items-center gap-2">
                        <i className="fas fa-check-circle text-red-700 text-xs"></i>
                        {item}
                    </li>
                ))}
            </ul>

            <div className="mt-6 flex gap-3">
                <a
                    href="/donate"
                    className="flex-1 text-center bg-red-800 text-white py-2 rounded-md text-sm hover:bg-red-700"
                >
                    Donate
                </a>
                <a
                    href="/program-details"
                    className="flex-1 text-center border border-gray-300 py-2 rounded-md text-sm hover:bg-gray-50"
                >
                    Details
                </a>
            </div>
        </div>
    );
}
