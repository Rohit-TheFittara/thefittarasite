"use client";

import { useEffect, useState } from "react";

const LANGUAGE_STORAGE_KEY = "fittara_lang";

type Language = "en" | "hi";

const copy = {
  en: {
    title: "Pricing for boutiques & ethnic brands",
    subtitle:
      "Start simple, grow as your sales grow. These are example structures — we'll tune them with you based on your volume and needs.",
    cards: [
      {
        title: "Starter",
        description: "For small boutiques just getting online.",
        price: "₹0",
        bullets: ["Basic storefront", "Up to 50 products", "Manual marketing support"],
        cta: "Talk to us",
      },
      {
        title: "Growth",
        description: "For active boutiques selling regularly.",
        price: "Revenue share",
        bullets: ["Higher product limits", "Marketing & ad support", "Priority onboarding"],
        cta: "Request detailed plan",
      },
      {
        title: "Custom",
        description: "For brands with multiple locations or high volume.",
        price: "Let's talk",
        bullets: ["Custom workflows", "Deeper integrations", "Shared risk / upside models"],
        cta: "Book strategy call",
      },
    ],
  },
  hi: {
    title: "Boutiques और ethnic brands के लिए pricing",
    subtitle:
      "सरल शुरुआत करें, जैसे-जैसे बिक्री बढ़े वैसे बढ़ें। ये example structures हैं — आपकी जरूरत और volume के हिसाब से हम इन्हें tune करेंगे।",
    cards: [
      {
        title: "Starter",
        description: "छोटी boutiques के लिए जो अभी ऑनलाइन आ रही हैं।",
        price: "₹0",
        bullets: ["Basic storefront", "50 products तक", "Manual marketing support"],
        cta: "हमसे बात करें",
      },
      {
        title: "Growth",
        description: "Active boutiques के लिए जो नियमित रूप से बेच रही हैं।",
        price: "Revenue share",
        bullets: ["Higher product limits", "Marketing & ad support", "Priority onboarding"],
        cta: "डिटेल्ड प्लान मांगें",
      },
      {
        title: "Custom",
        description: "Multiple locations या high volume वाले brands के लिए।",
        price: "आइए बात करें",
        bullets: ["Custom workflows", "Deeper integrations", "Shared risk / upside models"],
        cta: "Strategy call बुक करें",
      },
    ],
  },
};

export default function PricingPage() {
  const [language, setLanguage] = useState<Language>("en");
  const t = copy[language];

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (stored === "en" || stored === "hi") {
      setLanguage(stored);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    document.documentElement.lang = language;
  }, [language]);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-end mb-6">
          <div className="flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/70 px-2 py-1 text-xs">
            <button
              type="button"
              onClick={() => setLanguage("en")}
              className={`px-2 py-1 rounded-full text-[11px] font-semibold uppercase transition ${
                language === "en"
                  ? "bg-white text-slate-900"
                  : "text-slate-400 hover:text-slate-200"
              }`}
              aria-pressed={language === "en"}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLanguage("hi")}
              className={`px-2 py-1 rounded-full text-[11px] font-semibold transition ${
                language === "hi"
                  ? "bg-white text-slate-900"
                  : "text-slate-400 hover:text-slate-200"
              }`}
              aria-pressed={language === "hi"}
            >
              हिंदी
            </button>
          </div>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{t.title}</h1>
        <p className="text-sm md:text-base text-slate-300 mb-8">
          {t.subtitle}
        </p>

        <div className="grid gap-6 md:grid-cols-3">
          {t.cards.map((card, index) => (
            <div
              key={card.title}
              className={`bg-slate-900 border rounded-2xl p-5 ${
                index === 1 ? "border-purple-500" : "border-slate-800"
              }`}
            >
              <h2 className="text-lg font-semibold mb-1">{card.title}</h2>
              <p className="text-sm text-slate-400 mb-3">{card.description}</p>
              <p className="text-2xl font-bold mb-4">{card.price}</p>
              <ul className="text-xs text-slate-300 space-y-2 mb-4">
                {card.bullets.map((bullet) => (
                  <li key={bullet}>- {bullet}</li>
                ))}
              </ul>
              <button className="w-full text-sm rounded-full bg-purple-500 hover:bg-purple-400 py-2 font-semibold">
                {card.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
