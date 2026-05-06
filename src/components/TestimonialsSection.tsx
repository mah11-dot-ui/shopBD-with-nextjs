import Rating from "@mui/material/Rating";

const testimonials = [
  {
    name: "Rahim Uddin",
    location: "Dhaka",
    rating: 5,
    text: "ShopBD is my go-to for everything! Fast delivery and the products are always authentic. Highly recommend!",
    avatar: "R",
    color: "bg-primary",
  },
  {
    name: "Fatema Khatun",
    location: "Chittagong",
    rating: 5,
    text: "Amazing deals and super easy checkout. Got my order in just 2 days. The customer support is also very helpful.",
    avatar: "F",
    color: "bg-secondary",
  },
  {
    name: "Karim Hossain",
    location: "Sylhet",
    rating: 4,
    text: "Great variety of products. The prices are competitive and the quality is exactly as described. Will shop again!",
    avatar: "K",
    color: "bg-accent",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-14 px-4 bg-base-100">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-1">Testimonials</p>
          <h2 className="text-3xl font-bold text-base-content">What Our Customers Say</h2>
        </div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="card bg-base-100 border border-base-200 shadow-sm hover:shadow-md transition-shadow p-6"
            >
              <div className="text-primary/30 text-5xl mb-2 font-serif leading-none">&ldquo;</div>
              <p className="text-base-content/70 text-sm leading-relaxed mb-4">{t.text}</p>
              <Rating value={t.rating} readOnly size="small" />
              <div className="flex items-center gap-3 mt-4">
                <div
                  className={`w-10 h-10 rounded-full ${t.color} text-white flex items-center justify-center font-bold`}
                >
                  {t.avatar}
                </div>
                <div>
                  <p className="font-semibold text-sm text-base-content">{t.name}</p>
                  <p className="text-xs text-base-content/50">{t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
