import PublicLayout from "@/layouts/PublicLayout";

export default function vision() {
    return (
        <PublicLayout>

            {/* ================= HERO ================= */}
            <section className="max-w-7xl mx-auto px-4 pt-20 pb-16 text-center">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                    Our Vision
                </h1>
                <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                    We envision a society where every individual has equal access
                    to education, healthcare, and opportunities for a dignified life.
                </p>
            </section>

            {/* ================= MISSION & VISION ================= */}
            <section className="bg-gray-50 py-16">
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10">

                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">
                            Our Mission
                        </h2>
                        <p className="text-gray-600 leading-relaxed">
                            Our mission is to empower underprivileged communities
                            by providing access to quality education, essential
                            healthcare, and sustainable livelihood programs.
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">
                            Our Vision
                        </h2>
                        <p className="text-gray-600 leading-relaxed">
                            We strive to build a future where no child is denied
                            education, no family lacks basic healthcare, and every
                            community thrives with dignity and self-reliance.
                        </p>
                    </div>

                </div>
            </section>

            {/* ================= WHAT WE DO ================= */}
            <section className="max-w-7xl mx-auto px-4 py-16">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center">
                    What We Do
                </h2>
                <p className="text-gray-600 text-center mt-3 max-w-xl mx-auto">
                    Our work is focused on creating long-term impact through
                    well-structured programs.
                </p>

                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">

                    <FocusCard
                        icon="fa-graduation-cap"
                        title="Education"
                        desc="Supporting children with school education, digital learning,
                              scholarships, and skill development."
                    />

                    <FocusCard
                        icon="fa-hospital"
                        title="Healthcare"
                        desc="Organizing medical camps, providing treatments, medicines,
                              and preventive healthcare awareness."
                    />

                    <FocusCard
                        icon="fa-people-carry"
                        title="Community Support"
                        desc="Empowering communities through food programs, women empowerment,
                              and livelihood initiatives."
                    />

                </div>
            </section>

            {/* ================= TRANSPARENCY ================= */}
            <section className="bg-red-50 py-16">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                        Transparency & Accountability
                    </h2>
                    <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                        We believe trust is built through transparency. Every donation
                        received is tracked and publicly shared to ensure responsible
                        utilization of funds.
                    </p>

                    <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6">
                        <Stat value="₹12.5L+" reveal="Funds Raised" />
                        <Stat value="₹9.8L+" reveal="Spent on Programs" />
                        <Stat value="1450+" reveal="People Helped" />
                        <Stat value="100%" reveal="Public Records" />
                    </div>
                </div>
            </section>

            {/* ================= FUTURE GOALS ================= */}
            <section className="max-w-7xl mx-auto px-4 py-20">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center">
                    Our Future Goals
                </h2>
                <p className="text-gray-600 text-center mt-3 max-w-xl mx-auto">
                    We are committed to expanding our reach and impact in the coming years.
                </p>

                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <GoalCard
                        number="01"
                        title="Expand Education Programs"
                        desc="Reach 5,000+ children with quality education and digital resources."
                    />
                    <GoalCard
                        number="02"
                        title="Strengthen Healthcare Access"
                        desc="Conduct regular health camps across 50+ rural communities."
                    />
                    <GoalCard
                        number="03"
                        title="Empower Communities"
                        desc="Support sustainable livelihoods for 1,000+ families."
                    />
                </div>
            </section>

           

        </PublicLayout>
    );
}

/* ================= COMPONENTS ================= */

function FocusCard({ icon, title, desc }) {
    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm text-center">
            <div className="w-12 h-12 mx-auto rounded-xl bg-red-100 text-red-800 flex items-center justify-center">
                <i className={`fas ${icon}`}></i>
            </div>
            <h3 className="mt-4 font-semibold text-gray-900">{title}</h3>
            <p className="mt-2 text-sm text-gray-600">{desc}</p>
        </div>
    );
}

function Stat({ value, reveal }) {
    return (
        <div className="bg-white rounded-xl p-4 shadow-sm">
            <p className="text-xl font-bold text-gray-900">{value}</p>
            <p className="text-xs text-gray-500 mt-1">{reveal}</p>
        </div>
    );
}

function GoalCard({ number, title, desc }) {
    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm">
            <p className="text-red-800 font-bold text-lg">{number}</p>
            <h3 className="mt-2 font-semibold text-gray-900">{title}</h3>
            <p className="mt-2 text-sm text-gray-600">{desc}</p>
        </div>
    );
}
