"use client";

import FittaraHero from "./components/FittaraHero";
import WhatWeOffer from "./components/WhatWeOffer";


export default function Home() {
  return (
    <main className="min-h-screen bg-transparent text-slate-900 flex flex-col">
      <div className="relative overflow-hidden bg-[url('/hero-bg.jpeg')] bg-cover bg-top">
        <div className="absolute inset-0 bg-white/80" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.12),_transparent_55%)]" />
        <div className="relative">
          {/* Top navigation bar */}
          <header className="border-b border-slate-200/80 bg-white/40 backdrop-blur-sm">
            <div className="max-w-6xl mx-auto px-4 py-4 md:py-5 grid grid-cols-2 md:grid-cols-[1fr_auto_1fr] items-center gap-4">
              <div className="flex items-center gap-2">
                <img
                  src="/LogoFittara.png"
                  alt="Fittara"
                  className="h-8 w-auto"
                />
                <span className="font-bold text-lg text-[#6b59fa]">fittara</span>
              </div>

              <nav className="hidden md:flex items-center justify-center gap-10 text-sm text-slate-600">
                <a href="#" className="hover:text-slate-900">
                  Features
                </a>
                <a href="/pricing" className="hover:text-slate-900">
                  Pricing
                </a>
                <a href="#" className="hover:text-slate-900">
                  About Us
                </a>
              </nav>

              <div className="hidden md:flex items-center justify-end text-sm text-slate-500">
                &nbsp;
              </div>
            </div>
          </header>
        
          <FittaraHero />
        </div>
      </div>
      <WhatWeOffer />
      {/* Client testimonials */}
      <section className="bg-[#efeaf3] px-4 py-14 md:py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center text-2xl md:text-3xl font-semibold text-slate-600 mb-10">
            Client Testimonials
          </h2>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                name: "Sheetal Sugandhi",
                handle: "@Sanskritubysheetal",
                brand: "Sanskriti by Sheetal",
                note:
                  "I had a wonderful experience with Fittara. The process was so easy and smooth. I even made my first delivery in 2 days.",
                date: "10 Oct, 2025",
                accent: "bg-orange-500",
              },
              {
                name: "Reena Patil",
                handle: "@Dreamsboutique",
                brand: "Dreams Boutique",
                note:
                  "The 3D experience was fantastic. My client got to see the garments in 360 degrees.",
                date: "10 Oct, 2025",
                accent: "bg-emerald-500",
              },
              {
                name: "Devina Mehra",
                handle: "@Eksoot",
                brand: "Eksoot",
                note:
                  "The photography process was so simple and easy. They have beautiful options to choose from without the hassle of shoots.",
                date: "10 Oct, 2025",
                accent: "bg-amber-600",
              },
              {
                name: "Priti Pishwikar",
                handle: "@Fabzone",
                brand: "Fabzone",
                note:
                  "I had a wonderful experience with Fittara. The process was so easy and smooth. I even made my first delivery in 2 days.",
                date: "10 Oct, 2025",
                accent: "bg-slate-800",
              },
              {
                name: "Rohit Magdum",
                handle: "@Kasmira",
                brand: "Kasmira",
                note:
                  "I had a wonderful experience with Fittara. The process was so easy and smooth. I even made my first delivery in 2 days.",
                date: "10 Oct, 2025",
                accent: "bg-slate-800",
              },
              {
                name: "Arav Khanna",
                handle: "@Aravkhanna",
                brand: "Aravkhanna",
                note:
                  "I had a wonderful experience with Fittara. The process was so easy and smooth. I even made my first delivery in 2 days.",
                date: "10 Oct, 2025",
                accent: "bg-slate-800",
              },
            ].map((card) => (
              <div
                key={card.handle}
                className="bg-white rounded-2xl border border-slate-200 shadow-md shadow-slate-300/40 p-6 flex flex-col min-h-[220px]"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-base font-semibold text-slate-900">
                      {card.name}
                    </h3>
                    <p className="text-xs text-slate-500">{card.handle}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <span className={`h-6 w-6 rounded ${card.accent}`} />
                      <div>
                        <p className="text-xs font-semibold text-slate-700">
                          {card.brand}
                        </p>
                        <p className="text-[10px] text-slate-400">
                          Powered by Fittara
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed flex-1">
                  {card.note}
                </p>
                <p className="text-xs text-slate-400 mt-4 text-right">
                  {card.date}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-800/80 px-4 py-6 text-xs text-slate-500">
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

