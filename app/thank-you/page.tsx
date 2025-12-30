"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const LANGUAGE_STORAGE_KEY = "fittara_lang";

type Language = "en" | "hi";

const copy = {
  en: {
    title: "Thank you for reaching out",
    body:
      "We've received your details. Someone from the Fittara team will contact you on WhatsApp / phone to understand your boutique and walk you through the platform.",
    note:
      "If this was a test submission, you can close this tab and continue exploring the site.",
    cta: "Back to Fittara",
  },
  hi: {
    title: "हमसे संपर्क करने के लिए धन्यवाद",
    body:
      "हमने आपकी जानकारी प्राप्त कर ली है। Fittara टीम का कोई सदस्य WhatsApp / फोन पर आपसे संपर्क करेगा, आपके boutique को समझेगा और प्लेटफ़ॉर्म समझाएगा।",
    note:
      "अगर यह test submission था, तो आप इस टैब को बंद कर सकते हैं और साइट एक्सप्लोर करना जारी रख सकते हैं।",
    cta: "Fittara पर वापस जाएं",
  },
};

export default function ThankYouPage() {
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
    <main className="min-h-screen bg-slate-950 text-slate-50 flex items-center justify-center px-4">
      <div className="max-w-md text-center">
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
        <p className="text-sm md:text-base text-slate-300 mb-4">{t.body}</p>
        <p className="text-xs md:text-sm text-slate-500 mb-8">{t.note}</p>
        <Link
          href="/"
          className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-purple-500 hover:bg-purple-400 text-sm font-semibold"
        >
          {t.cta}
        </Link>
      </div>
    </main>
  );
}
