export default function PricingPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Pricing for boutiques & ethnic brands
        </h1>
        <p className="text-sm md:text-base text-slate-300 mb-8">
          Start simple, grow as your sales grow. These are example structures
          — we&apos;ll tune them with you based on your volume and needs.
        </p>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <h2 className="text-lg font-semibold mb-1">Starter</h2>
            <p className="text-sm text-slate-400 mb-3">
              For small boutiques just getting online.
            </p>
            <p className="text-2xl font-bold mb-4">₹0</p>
            <ul className="text-xs text-slate-300 space-y-2 mb-4">
              <li>• Basic storefront</li>
              <li>• Upto 50 products</li>
              <li>• Manual marketing support</li>
            </ul>
            <button className="w-full text-sm rounded-full bg-purple-500 hover:bg-purple-400 py-2 font-semibold">
              Talk to us
            </button>
          </div>

          <div className="bg-slate-900 border border-purple-500 rounded-2xl p-5">
            <h2 className="text-lg font-semibold mb-1">Growth</h2>
            <p className="text-sm text-slate-400 mb-3">
              For active boutiques selling regularly.
            </p>
            <p className="text-2xl font-bold mb-4">Revenue share</p>
            <ul className="text-xs text-slate-300 space-y-2 mb-4">
              <li>• Higher product limits</li>
              <li>• Marketing & ad support</li>
              <li>• Priority onboarding</li>
            </ul>
            <button className="w-full text-sm rounded-full bg-purple-500 hover:bg-purple-400 py-2 font-semibold">
              Request detailed plan
            </button>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <h2 className="text-lg font-semibold mb-1">Custom</h2>
            <p className="text-sm text-slate-400 mb-3">
              For brands with multiple locations or high volume.
            </p>
            <p className="text-2xl font-bold mb-4">Let&apos;s talk</p>
            <ul className="text-xs text-slate-300 space-y-2 mb-4">
              <li>• Custom workflows</li>
              <li>• Deeper integrations</li>
              <li>• Shared risk / upside models</li>
            </ul>
            <button className="w-full text-sm rounded-full bg-purple-500 hover:bg-purple-400 py-2 font-semibold">
              Book strategy call
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
