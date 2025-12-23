"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const form = e.currentTarget;
      const formData = new FormData(form);

      const res = await fetch("/api/lead", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Request failed");
      }

      // Optionally we can read JSON, but we don't need it now:
      // const data = await res.json();

      // On success, go to thank-you page (browser-side)
      router.push("/thank-you");
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 flex flex-col">
      {/* Top navigation bar */}
      <header className="border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-400 to-fuchsia-500" />
            <span className="font-semibold text-lg">PurpleSeam</span>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm text-slate-300">
            <a href="#" className="hover:text-white">
              Platform
            </a>
            <a href="#" className="hover:text-white">
              Features
            </a>
            <a href="/pricing" className="hover:text-white">
              Pricing
            </a>
            <a href="#" className="hover:text-white">
              Blog
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <button className="text-sm text-slate-300 hover:text-white">
              Log in
            </button>
            <button className="px-4 py-2 rounded-full bg-purple-500 hover:bg-purple-400 text-sm font-semibold">
              Book a demo
            </button>
          </div>
        </div>
      </header>

      {/* Hero section */}
      <section className="flex items-center justify-center px-4 py-12 md:py-20">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm font-semibold tracking-wide text-purple-300 mb-2">
            Platform for women&apos;s ethnic apparel
          </p>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Build, manage, and grow{" "}
            <span className="text-purple-400">
              boutiques and saree brands
            </span>{" "}
            online.
          </h1>
          <p className="text-base md:text-lg text-slate-300 mb-8 max-w-2xl">
            PurpleSeam gives Indian boutiques an end-to-end infrastructure —
            cataloging, storefront, logistics, and marketing — without needing
            a tech team or agency.
          </p>

          <div className="flex flex-wrap items-center gap-4 mb-6">
            <button className="px-6 py-3 rounded-full bg-purple-500 hover:bg-purple-400 font-semibold text-sm md:text-base">
              Book a demo
            </button>
            <button className="px-6 py-3 rounded-full border border-slate-600 hover:border-slate-400 text-sm md:text-base">
              Watch product walkthrough
            </button>
          </div>

          <p className="text-xs md:text-sm text-slate-500">
            Designed for boutiques, saree stores, and dress material brands
            across India. No prior online selling experience required.
          </p>
        </div>
      </section>

      {/* CTA section */}
      <section className="bg-slate-900 border-t border-slate-800 px-4 py-10 md:py-14">
        <div className="max-w-4xl mx-auto grid gap-8 md:grid-cols-2 items-start">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold mb-3">
              Ready to see how PurpleSeam fits your boutique?
            </h2>
            <p className="text-sm md:text-base text-slate-300 mb-4">
              Share a few details and we&apos;ll reach out with a personalised
              walkthrough, rough sales projections, and a clear next step.
            </p>
            <ul className="text-sm text-slate-400 space-y-2">
              <li>• Tailored demo for saree / dress material businesses</li>
              <li>• No obligation, no pushy sales</li>
              <li>• Understand setup effort, costs, and support</li>
            </ul>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 md:p-6 shadow-lg shadow-slate-950/40">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Your name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="e.g. Anjali Patil"
                  className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Mobile / WhatsApp number
                </label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="e.g. 98xxxxxx10"
                  className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Boutique / brand name
                </label>
                <input
                  type="text"
                  name="boutique"
                  placeholder="e.g. Saaj Boutique"
                  className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  placeholder="e.g. Pune"
                  className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Anything specific you want help with?
                </label>
                <textarea
                  rows={3}
                  name="note"
                  placeholder="e.g. Getting my sarees online, handling shipping, WhatsApp marketing…"
                  className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 rounded-full bg-purple-500 hover:bg-purple-400 text-sm font-semibold py-2.5 disabled:opacity-60"
                disabled={submitting}
              >
                {submitting ? "Sending..." : "Request callback"}
              </button>

              {error && (
                <p className="text-[11px] text-red-400 mt-2">{error}</p>
              )}

              <p className="text-[11px] text-slate-500 mt-2">
                By submitting, you agree to be contacted on WhatsApp / phone
                about PurpleSeam. No spam, ever.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-800 px-4 py-6 text-xs text-slate-500">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <p>
            © {new Date().getFullYear()} PurpleSeam. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-slate-300">
              Privacy
            </a>
            <a href="#" className="hover:text-slate-300">
              Terms
            </a>
            <a href="#" className="hover:text-slate-300">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
