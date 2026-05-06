const values = [
  {
    icon: "🛡️",
    title: "Trust & Quality",
    desc: "Every product is verified for authenticity. We partner only with trusted brands and sellers.",
  },
  {
    icon: "🏆",
    title: "Best Prices",
    desc: "We negotiate directly with suppliers to bring you the most competitive prices in Bangladesh.",
  },
  {
    icon: "👥",
    title: "Customer First",
    desc: "Our 24/7 support team is always ready to help. Your satisfaction is our top priority.",
  },
  {
    icon: "🚀",
    title: "Fast Delivery",
    desc: "Same-day delivery in Dhaka, 2-3 days nationwide. We get your orders to you fast.",
  },
];

const team = [
  { name: "Arif Rahman", role: "CEO & Founder", avatar: "A", color: "bg-primary" },
  { name: "Nadia Islam", role: "Head of Operations", avatar: "N", color: "bg-secondary" },
  { name: "Tanvir Ahmed", role: "CTO", avatar: "T", color: "bg-accent" },
  { name: "Sadia Hossain", role: "Head of Marketing", avatar: "S", color: "bg-success" },
];

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <div className="bg-gradient-to-br from-primary/10 via-base-100 to-secondary/10 py-20 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="badge badge-primary badge-lg mb-4">Our Story</div>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-base-content mb-4">
            Bangladesh&apos;s Most Trusted Online Shop
          </h1>
          <p className="text-base-content/60 text-lg leading-relaxed">
            Founded in 2020, ShopBD started with a simple mission: make quality products accessible to everyone in Bangladesh at fair prices with fast delivery.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-primary text-primary-content py-12 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: "50K+", label: "Happy Customers" },
            { value: "10K+", label: "Products" },
            { value: "500+", label: "Brands" },
            { value: "64", label: "Districts Covered" },
          ].map((stat, i) => (
            <div key={i}>
              <p className="text-3xl font-extrabold">{stat.value}</p>
              <p className="text-primary-content/70 text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Values */}
      <div className="py-16 px-4 bg-base-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-1">Why Us</p>
            <h2 className="text-3xl font-bold text-base-content">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <div key={i} className="card bg-base-100 border border-base-200 p-6 hover:shadow-md hover:border-primary/30 transition-all text-center">
                <div className="text-4xl mb-3">{v.icon}</div>
                <h3 className="font-bold text-base-content mb-2">{v.title}</h3>
                <p className="text-sm text-base-content/60 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team */}
      <div className="py-16 px-4 bg-base-200">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-1">People</p>
            <h2 className="text-3xl font-bold text-base-content">Meet the Team</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <div key={i} className="card bg-base-100 border border-base-200 p-6 text-center hover:shadow-md transition-shadow">
                <div className={`w-16 h-16 rounded-full ${member.color} text-white flex items-center justify-center text-2xl font-bold mx-auto mb-3`}>
                  {member.avatar}
                </div>
                <p className="font-bold text-base-content text-sm">{member.name}</p>
                <p className="text-xs text-base-content/50 mt-1">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
