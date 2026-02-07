import PublicLayout from "@/layouts/PublicLayout";

export default function Home() {
  return (
    <PublicLayout>

      {/* ================= HERO ================= */}
      <section className="max-w-7xl mx-auto px-4 pt-20 pb-16 text-center">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
          Small Help,
          <span className="block text-red-800">Big Impact</span>
        </h1>

        <p className="mt-4 text-gray-600 max-w-xl mx-auto text-base md:text-lg">
          We believe in <span className="font-medium text-gray-800">complete transparency</span>.
          Every rupee is publicly tracked and responsibly used.
        </p>

        {/* <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <button className="bg-red-800 text-white px-6 py-3 rounded-full shadow hover:bg-red-700 flex items-center justify-center gap-2">
            <i className="fas fa-heart"></i>
            Donate Now
          </button>
          <button className="border border-red-800 text-red-800 px-6 py-3 rounded-full hover:bg-red-50">
            Transparency
          </button>
        </div> */}
      </section>

      {/* ================= STATS ================= */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">

          <StatCard icon="fa-wallet" title="Funds Raised" value="₹12.5L" />
          <StatCard icon="fa-hand-holding-heart" title="Spent" value="₹9.8L" />
          <StatCard icon="fa-piggy-bank" title="Balance" value="₹2.7L" />
          <StatCard icon="fa-users" title="People Helped" value="1450+" />

        </div>
      </section>

      {/* ================= FUND BREAKDOWN ================= */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center">
          Where Your Money Goes
        </h2>
        <p className="text-gray-600 text-center mt-3 max-w-xl mx-auto">
          A clear and honest breakdown of how donations are used.
        </p>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <InfoCard
            icon="fa-graduation-cap"
            title="Education"
            desc="Books, fees, digital learning for children."
            percent="45%"
          />
          <InfoCard
            icon="fa-hospital"
            title="Healthcare"
            desc="Medical camps and emergency treatments."
            percent="35%"
          />
          <InfoCard
            icon="fa-people-carry"
            title="Community"
            desc="Food drives & skill development."
            percent="20%"
          />
        </div>
      </section>

      {/* ================= IMPACT ================= */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center">
            Our Impact So Far
          </h2>
          <p className="text-gray-600 text-center mt-3 max-w-xl mx-auto">
            Real numbers that show the difference we are making together.
          </p>

          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
            <ImpactStat icon="fa-briefcase" value="120+" label="Programs" />
            <ImpactStat icon="fa-map-marked-alt" value="35+" label="Villages" />
            <ImpactStat icon="fa-hands-helping" value="500+" label="Volunteers" />
            <ImpactStat icon="fa-calendar-check" value="5+" label="Years of Service" />
          </div>
        </div>
      </section>


      {/* ================= CTA ================= */}
      <section className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
          Be Part of the Change
        </h2>
        <p className="mt-3 text-gray-600 max-w-md mx-auto">
          Donate, volunteer, or support our mission in any way.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <button className="bg-red-800 text-white px-6 py-3 rounded-full shadow hover:bg-red-700">
            Donate Today
          </button>
          <button className="border border-red-800 text-red-800 px-6 py-3 rounded-full hover:bg-red-50">
            Join as Volunteer
          </button>
        </div>
      </section>

    </PublicLayout>
  );
}

/* ================= COMPONENTS ================= */

function StatCard({ icon, title, value }) {
  return (
    <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm text-center border border-red-200 cursor-pointer">
      <div className="w-10 h-10 mx-auto rounded-full bg-red-100 text-red-800 flex items-center justify-center">
        <i className={`fas ${icon}`}></i>
      </div>
      <p className="mt-2 text-xs md:text-sm text-gray-500">{title}</p>
      <p className="text-lg md:text-xl font-bold text-gray-900">{value}</p>
    </div>
  );
}

function InfoCard({ icon, title, desc, percent }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-red-200 cursor-pointer">
      <div className="w-12 h-12 rounded-xl bg-red-100 text-red-800 flex items-center justify-center">
        <i className={`fas ${icon}`}></i>
      </div>
      <h3 className="mt-4 font-semibold text-gray-900">{title}</h3>
      <p className="mt-2 text-sm text-gray-600">{desc}</p>
      <p className="mt-4 text-sm font-semibold text-red-800">
        {percent} of funds
      </p>
    </div>
  );
}

function ImpactStat({ icon, value, label }) {
  return (
    <div className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition border border-red-200 cursor-pointer">

      <div className="w-12 h-12 mx-auto rounded-full bg-red-100 text-red-800 flex items-center justify-center text-lg">
        <i className={`fas ${icon}`}></i>
      </div>

      <p className="mt-4 text-2xl md:text-3xl font-bold text-gray-900">
        {value}
      </p>

      <p className="mt-1 text-sm text-gray-500">
        {label}
      </p>
    </div>
  );
}

