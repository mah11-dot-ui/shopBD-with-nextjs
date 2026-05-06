import Link from "next/link";

export default function OrderSuccessPage() {
  return (
    <div className="max-w-xl mx-auto px-4 py-24 text-center">
      <div className="text-7xl mb-6 animate-bounce">🎉</div>
      <h1 className="text-3xl font-extrabold text-base-content mb-3">Order Placed!</h1>
      <p className="text-base-content/60 text-lg mb-2">
        Thank you for your order. We&apos;ll send a confirmation to your email.
      </p>
      <p className="text-base-content/50 text-sm mb-8">
        Expected delivery: <strong className="text-base-content">2–4 business days</strong>
      </p>

      <div className="card bg-base-200 p-5 mb-8 text-left space-y-2">
        <div className="flex items-center gap-2 text-sm text-base-content/70">
          <span className="text-success">✓</span> Order confirmed
        </div>
        <div className="flex items-center gap-2 text-sm text-base-content/70">
          <span className="text-success">✓</span> Payment received
        </div>
        <div className="flex items-center gap-2 text-sm text-base-content/50">
          <span>⏳</span> Preparing your package
        </div>
        <div className="flex items-center gap-2 text-sm text-base-content/50">
          <span>🚚</span> Out for delivery
        </div>
      </div>

      <div className="flex gap-3 justify-center">
        <Link href="/" className="btn btn-primary">Back to Home</Link>
        <Link href="/shop" className="btn btn-outline">Continue Shopping</Link>
      </div>
    </div>
  );
}
