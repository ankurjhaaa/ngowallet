import PublicLayout from "@/layouts/PublicLayout";

export default function join() {
    return (
        <PublicLayout>

            {/* ================= HERO ================= */}
            <section className="max-w-7xl mx-auto px-4 pt-20 pb-14 text-center">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                    Join Our Mission
                </h1>
                <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                    We believe meaningful change comes through long-term commitment,
                    not one-time donations.
                </p>
            </section>

            {/* ================= WHY CONTACT FIRST ================= */}
            <section className="bg-gray-50 py-16">
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10">

                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">
                            Why We Don’t Accept Direct Donations
                        </h2>
                        <p className="text-gray-600 leading-relaxed">
                            Our NGO works on a planned and transparent funding model.
                            Instead of random donations, we prefer meaningful yearly
                            commitments discussed directly with our team.
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">
                            How It Works
                        </h2>
                        <ul className="space-y-3 text-gray-600 text-sm">
                            <li className="flex gap-2">
                                <i className="fas fa-phone text-red-800 mt-1"></i>
                                You contact our team and discuss your intent to support.
                            </li>
                            <li className="flex gap-2">
                                <i className="fas fa-calendar-alt text-red-800 mt-1"></i>
                                A yearly contribution amount is mutually decided.
                            </li>
                            <li className="flex gap-2">
                                <i className="fas fa-database text-red-800 mt-1"></i>
                                Our admin records your commitment in our system.
                            </li>
                            <li className="flex gap-2">
                                <i className="fas fa-hand-holding-heart text-red-800 mt-1"></i>
                                You contribute gradually during the year until the
                                committed amount is fulfilled.
                            </li>
                        </ul>
                    </div>

                </div>
            </section>

            {/* ================= TRANSPARENCY ================= */}
            <section className="max-w-7xl mx-auto px-4 py-16">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center">
                    Complete Transparency
                </h2>
                <p className="text-gray-600 text-center mt-3 max-w-xl mx-auto">
                    Every commitment, payment, and utilization is tracked and
                    publicly reported to maintain trust and accountability.
                </p>

                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <InfoCard
                        icon="fa-file-invoice"
                        title="Recorded Commitments"
                        desc="Your yearly contribution commitment is formally recorded."
                    />
                    <InfoCard
                        icon="fa-chart-line"
                        title="Tracked Contributions"
                        desc="Each contribution during the year is transparently tracked."
                    />
                    <InfoCard
                        icon="fa-eye"
                        title="Public Reports"
                        desc="Overall fund usage is shared publicly on our platform."
                    />
                </div>
            </section>

            {/* ================= WHO CAN JOIN ================= */}
            <section className="bg-gray-50 py-16">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                        Who Can Join?
                    </h2>
                    <p className="mt-4 text-gray-600 max-w-xl mx-auto">
                        Individuals, families, professionals, and organizations
                        who believe in sustained social impact are welcome.
                    </p>
                </div>
            </section>

            {/* ================= CONTACT CTA ================= */}
            <section className="max-w-7xl mx-auto px-4 py-20 text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    Start the Conversation
                </h2>
                <p className="mt-4 text-gray-600 max-w-xl mx-auto">
                    If you wish to support our work, please reach out to our team.
                    We will guide you through the process personally.
                </p>

                <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                    <a
                        href="/contact"
                        className="bg-red-800 text-white px-6 py-3 rounded-md hover:bg-red-700 transition"
                    >
                        Contact Our Team
                    </a>
                    <a
                        href="tel:+919000000000"
                        className="border border-red-800 text-red-800 px-6 py-3 rounded-md hover:bg-red-50 transition"
                    >
                        Call Us Directly
                    </a>
                </div>
            </section>

        </PublicLayout>
    );
}

/* ================= COMPONENT ================= */

function InfoCard({ icon, title, desc }) {
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
