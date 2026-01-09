"use client";

import Link from "next/link";

const sections = [
  {
    title: "Before You Build Anything, Get Clarity",
    body: [
      "Most founders lose money not because they worked less -- but because they built the wrong thing first.",
      "Websites. Ads. Agencies. Tools. All paid for before knowing if they make sense.",
      "Fittara Launch Compass exists to stop that.",
    ],
  },
  {
    title: "What Is the Launch Compass?",
    body: [
      "The Launch Compass is a paid, independent evaluation that tells you:",
    ],
    bullets: [
      "Whether you should even build a website right now",
      "Which channel actually makes sense for your brand",
      "What to avoid spending money on -- including Fittara itself",
    ],
    footer: [
      "This is not onboarding. This is not consulting fluff. This is a decision filter.",
    ],
  },
  {
    title: "Who This Is For",
    body: ["This evaluation is for you if:"],
    bullets: [
      "You're planning to launch or grow a fashion / apparel D2C brand",
      "You're unsure whether to start with a website, marketplaces, or Instagram / WhatsApp",
      "You don't want to burn money learning the hard way",
      "You want truth over motivation",
    ],
    footer: [
      "If you're only looking for someone to say \"yes, build a website\", this is not for you.",
    ],
  },
  {
    title: "What We Evaluate (In Detail)",
    body: [
      "You'll answer a structured questionnaire (15-20 minutes). We evaluate your brand across four non-negotiable dimensions:",
    ],
  },
];

const dimensions = [
  {
    title: "1. Product Reality",
    items: [
      "Price points (AOV)",
      "SKU repeatability",
      "Return & exchange risk",
      "Visual storytelling strength",
      "Repeat purchase potential",
    ],
  },
  {
    title: "2. Founder Reality",
    items: [
      "Available budget",
      "Time commitment",
      "Operational readiness",
      "Comfort with selling & customer interaction",
    ],
  },
  {
    title: "3. Channel Readiness",
    items: [
      "Marketplace viability",
      "Instagram traction",
      "Website readiness",
      "Paid ads maturity",
    ],
  },
  {
    title: "4. Unit Economics Sanity",
    items: [
      "Gross margins",
      "Shipping & RTO tolerance",
      "Ability to survive early experiments",
    ],
  },
];

const deliverables = [
  {
    title: "1. A Clear Verdict (No Ambiguity)",
    body:
      "You will receive a direct recommendation such as: Do NOT build a website yet, start with Instagram + WhatsApp intelligence, marketplaces only for now, or you are ready to scale with a full website.",
    footer: "We don't soften this to sell you something.",
  },
  {
    title: "2. A Detailed Readiness Score",
    body:
      "You'll get a scored breakdown showing where you are strong, where you are exposed, and what is holding you back right now. This becomes your baseline, not just advice.",
  },
  {
    title: "3. Channel-by-Channel Recommendation",
    body:
      "Instead of everything everywhere, you'll know what to start with, what to delay, and what to completely avoid for now.",
    bullets: [
      "AI creatives",
      "Catalog intelligence",
      "Instagram auto-posting & engagement analysis",
      "WhatsApp marketing & conversation insights",
      "A full website (or not)",
    ],
  },
  {
    title: "4. A 90-Day Action Roadmap",
    body:
      "You'll receive a simple, practical plan: what to focus on in Month 1, what to test in Month 2, and when to re-evaluate bigger investments.",
    footer: "No dependency on agencies. No forced tooling.",
  },
];

const pricing = [
  "One-time evaluation fee",
  "No auto-upgrades",
  "No obligation to continue",
  "If the evaluation recommends a Fittara website later, the fee is adjusted into your onboarding.",
  "If it doesn't -- you still walk away with clarity.",
];

const whyBuilt = [
  "Starting with the wrong channel",
  "Spending too early",
  "Listening to people who always say \"yes\"",
];

export default function LaunchCompassPage() {
  return (
    <main className="min-h-screen bg-[#f7f4fb] text-slate-900">
      <div className="relative overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(107,89,250,0.18),_transparent_55%)]">
        <div className="absolute -top-24 right-0 h-64 w-64 rounded-full bg-[#6b59fa]/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-52 w-52 rounded-full bg-[#c1b7ff]/30 blur-2xl" />
        <div className="relative max-w-5xl mx-auto px-4 pt-16 pb-10 md:pt-24">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 hover:text-slate-700"
          >
            Back to Fittara
          </Link>
          <h1 className="mt-6 text-4xl md:text-5xl font-semibold text-slate-900">
            The Fittara Launch Compass
          </h1>
          <p className="mt-4 text-base md:text-lg text-slate-600 max-w-2xl">
            A paid, independent evaluation built to protect founders from
            expensive early mistakes.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-6">
            <div className="flex items-center gap-4">
              <img
                src="/Compass.png"
                alt="Fittara Launch Compass"
                className="h-16 w-16 rounded-full border border-white/80 bg-white p-2 shadow-md"
              />
              <p className="text-sm text-slate-600 max-w-sm">
                "Don't spend on a website. Don't spend on ads. Before you give
                money to agencies, platforms -- even us, find your direction."
              </p>
            </div>
            <a
              href="https://purpleseamdevtest-d3bgh7ddhwewb3hu.centralindia-01.azurewebsites.net/explore/fittaracompass"
              className="inline-flex items-center justify-center rounded-full bg-[#6b59fa] px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white shadow-lg shadow-[#6b59fa]/30 hover:bg-[#5a48e5]"
            >
              Start the Compass (INR 199/-)
            </a>
          </div>
        </div>
      </div>

      <section className="max-w-5xl mx-auto px-4 pb-16 md:pb-24">
        <div className="mt-10 grid gap-8">
          {sections.map((section) => (
            <div
              key={section.title}
              className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg shadow-slate-200/50"
            >
              <h2 className="text-2xl md:text-3xl font-semibold text-slate-900">
                {section.title}
              </h2>
              {section.body?.map((paragraph) => (
                <p key={paragraph} className="mt-4 text-slate-600">
                  {paragraph}
                </p>
              ))}
              {section.bullets ? (
                <ul className="mt-4 grid gap-2 text-slate-600">
                  {section.bullets.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-1 h-2 w-2 rounded-full bg-[#6b59fa]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
              {section.footer?.map((paragraph) => (
                <p key={paragraph} className="mt-4 text-slate-700 font-medium">
                  {paragraph}
                </p>
              ))}
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {dimensions.map((dimension) => (
            <div
              key={dimension.title}
              className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-md shadow-slate-200/40"
            >
              <h3 className="text-lg font-semibold text-slate-900">
                {dimension.title}
              </h3>
              <ul className="mt-4 grid gap-2 text-sm text-slate-600">
                {dimension.items.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-[#6b59fa]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-6">
          {deliverables.map((deliverable) => (
            <div
              key={deliverable.title}
              className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg shadow-slate-200/50"
            >
              <h3 className="text-xl font-semibold text-slate-900">
                {deliverable.title}
              </h3>
              <p className="mt-4 text-slate-600">{deliverable.body}</p>
              {deliverable.bullets ? (
                <ul className="mt-4 grid gap-2 text-slate-600">
                  {deliverable.bullets.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-1 h-2 w-2 rounded-full bg-[#6b59fa]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
              {deliverable.footer ? (
                <p className="mt-4 text-slate-700 font-medium">
                  {deliverable.footer}
                </p>
              ) : null}
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-3xl border border-slate-200 bg-white p-8 shadow-lg shadow-slate-200/50">
          <h3 className="text-2xl font-semibold text-slate-900">
            Important: This Is NOT a Sales Pitch
          </h3>
          <p className="mt-4 text-slate-600">
            This evaluation is intentionally behind a paywall for one reason: if
            the evaluation is free, it becomes marketing. If it's paid, it
            becomes truth. We are comfortable telling you "don't build a website
            yet", "don't run ads yet", and "don't use Fittara yet". That honesty
            is the product.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg shadow-slate-200/50">
            <h3 className="text-xl font-semibold text-slate-900">
              Pricing & Fairness
            </h3>
            <ul className="mt-4 grid gap-3 text-slate-600">
              {pricing.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-[#6b59fa]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg shadow-slate-200/50">
            <h3 className="text-xl font-semibold text-slate-900">
              Why We Built This
            </h3>
            <p className="mt-4 text-slate-600">
              Because most founders don't fail from lack of effort. They fail
              from:
            </p>
            <ul className="mt-4 grid gap-3 text-slate-600">
              {whyBuilt.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-[#6b59fa]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-slate-700 font-medium">
              The Launch Compass exists to be the voice that says: "Pause. Let's
              think first."
            </p>
          </div>
        </div>

        <div className="mt-12 rounded-3xl border border-[#6b59fa]/30 bg-[#f0ecff] p-10 text-center shadow-xl shadow-[#6b59fa]/20">
          <h3 className="text-2xl md:text-3xl font-semibold text-slate-900">
            Ready to Start?
          </h3>
          <p className="mt-4 text-slate-600">
            If you want clarity before valuation, tech, ads, or agencies: begin
            with the Fittara Launch Compass. Don't spend on tools yet -- even
            ours. Spend on knowing what actually makes sense.
          </p>
          <a
            href="https://purpleseamdevtest-d3bgh7ddhwewb3hu.centralindia-01.azurewebsites.net/explore/fittaracompass"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-[#6b59fa] px-8 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white shadow-lg shadow-[#6b59fa]/30 hover:bg-[#5a48e5]"
          >
            Start the Compass (INR 199/-)
          </a>
        </div>
      </section>
    </main>
  );
}
