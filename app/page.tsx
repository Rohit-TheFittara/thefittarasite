"use client";

import { useEffect, useState } from "react";
import { createHubspotForm, loadHubspotScript } from "./lib/hubspot";
import FittaraHero from "./components/FittaraHero";
import WhatWeOffer from "./components/WhatWeOffer";

const HUBSPOT_PORTAL_ID = "244698844";
const WELCOME_FORM_ID = "e057bc98-2712-473e-9c1b-850c464fd8f9";
const LANGUAGE_STORAGE_KEY = "fittara_lang";

type Language = "en" | "hi";

const copy = {
  en: {
    clientsHeading: "Our Esteemed Clients",
    launchCompass: {
      eyebrow: "Pre-launch assessment",
      title: "Fittara Launch Compass",
      body:
        "Fittara's pre-launch assessment to help founders find direction before investing in build or ads.",
      quote:
        "\"Don't spend on a website. Don't spend on ads. Before you give money to agencies, platforms -- even us, find your direction.\"",
      cta: "Open the Launch Compass",
    },
    popup: {
      title: "Please enter your Whatsapp number",
      body: "In case we loose connection, we will reach out to you here.",
      cta: "Continue to site",
    },
    footer: {
      rightsPrefix: "©",
      rightsSuffix: "PurpleSeam. All rights reserved.",
      privacy: "Privacy",
      terms: "Terms",
      contact: "Contact",
    },
  },
  hi: {
    launchCompass: {
      eyebrow: "Pre-launch assessment",
      title: "Fittara Launch Compass",
      body:
        "Fittara's pre-launch assessment to help founders find direction before investing in build or ads.",
      quote:
        "\"Don't spend on a website. Don't spend on ads. Before you give money to agencies, platforms -- even us, find your direction.\"",
      cta: "Open the Launch Compass",
    },
    clientsHeading: "हमारे सम्मानित ग्राहक",
    popup: {
      title: "कृपया अपना WhatsApp नंबर दर्ज करें",
      body: "यदि कनेक्शन टूटे, तो हम आपसे यहीं संपर्क करेंगे।",
      cta: "साइट पर जाएं",
    },
    footer: {
      rightsPrefix: "©",
      rightsSuffix: "PurpleSeam. सभी अधिकार सुरक्षित।",
      privacy: "गोपनीयता",
      terms: "शर्तें",
      contact: "संपर्क",
    },
  },
};


export default function Home() {
  const [showPopup, setShowPopup] = useState(false);
  const [language, setLanguage] = useState<Language>("en");
  const t = copy[language];

  function handleWelcomeSubmitted(form?: HTMLFormElement | null) {
    if (typeof window === "undefined") {
      return;
    }
    const storageKey = "fittara_lead_popup";
    const numberKey = "fittara_lead_number";
    const phoneInput =
      form?.querySelector<HTMLInputElement>('input[name="phone"]') ??
      document.querySelector<HTMLInputElement>(
        "#hubspot-welcome-form input[name=\"phone\"]"
      );
    if (phoneInput?.value) {
      sessionStorage.setItem(numberKey, phoneInput.value.replace(/\D/g, ""));
    }
    sessionStorage.setItem(storageKey, "1");
    setShowPopup(false);
  }

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const storageKey = "fittara_lead_popup";
    if (sessionStorage.getItem(storageKey) !== "1") {
      setShowPopup(true);
    }
  }, []);

  useEffect(() => {
    if (!showPopup || typeof window === "undefined") {
      return;
    }

    let isActive = true;
    loadHubspotScript()
      .then(() => {
        if (!isActive) {
          return;
        }
        createHubspotForm({
          portalId: HUBSPOT_PORTAL_ID,
          formId: WELCOME_FORM_ID,
          target: "#hubspot-welcome-form",
          onFormReady: (form) => {
            const storedNumber = sessionStorage.getItem("fittara_lead_number");
            const phoneInput =
              form.querySelector<HTMLInputElement>('input[name="phone"]');
            if (storedNumber && phoneInput && !phoneInput.value) {
              phoneInput.value = storedNumber;
            }
          },
          onFormSubmit: () => {
            window.setTimeout(() => {
              handleWelcomeSubmitted(null);
            }, 600);
          },
          onFormSubmitted: (form) => {
            handleWelcomeSubmitted(form);
          },
        });
      })
      .catch(() => {});

    return () => {
      isActive = false;
    };
  }, [showPopup]);

  useEffect(() => {
    if (!showPopup || typeof window === "undefined") {
      return;
    }

    const container = document.querySelector("#hubspot-welcome-form");
    if (!container) {
      return;
    }

    if (container.querySelector(".submitted-message")) {
      handleWelcomeSubmitted(null);
      return;
    }

    const observer = new MutationObserver(() => {
      if (container.querySelector(".submitted-message")) {
        handleWelcomeSubmitted(null);
        observer.disconnect();
      }
    });

    observer.observe(container, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
    };
  }, [showPopup]);

  useEffect(() => {
    if (!showPopup || typeof window === "undefined") {
      return;
    }

    const handler = (event: MessageEvent) => {
      const data = event.data as {
        type?: string;
        eventName?: string;
        id?: string;
      };
      if (
        data?.type === "hsFormCallback" &&
        (data?.eventName === "onFormSubmitted" ||
          data?.eventName === "onFormSubmit") &&
        (!data?.id || data?.id === WELCOME_FORM_ID)
      ) {
        handleWelcomeSubmitted(null);
      }
    };

    window.addEventListener("message", handler);

    return () => {
      window.removeEventListener("message", handler);
    };
  }, [showPopup]);

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

  function handleLanguageChange(nextLanguage: Language) {
    setLanguage(nextLanguage);
  }

  return (
    <main className="min-h-screen bg-transparent text-slate-900 flex flex-col">
      <div className={showPopup ? "blur-sm pointer-events-none" : ""}>
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
                  <span className="font-bold text-lg text-[#6b59fa]">
                    fittara
                  </span>
                </div>

                <nav className="hidden md:flex items-center justify-center gap-10 text-sm text-slate-600" />

                <div className="flex items-center justify-end text-xs md:text-sm text-slate-500">
                  <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-2 py-1">
                    <button
                      type="button"
                      onClick={() => handleLanguageChange("en")}
                      className={`px-2 py-1 rounded-full text-[11px] font-semibold uppercase transition ${
                        language === "en"
                          ? "bg-slate-900 text-white"
                          : "text-slate-500 hover:text-slate-700"
                      }`}
                      aria-pressed={language === "en"}
                    >
                      EN
                    </button>
                    <button
                      type="button"
                      onClick={() => handleLanguageChange("hi")}
                      className={`px-2 py-1 rounded-full text-[11px] font-semibold transition ${
                        language === "hi"
                          ? "bg-slate-900 text-white"
                          : "text-slate-500 hover:text-slate-700"
                      }`}
                      aria-pressed={language === "hi"}
                    >
                      हिंदी
                    </button>
                  </div>
                </div>
              </div>
            </header>

            <FittaraHero language={language} />
        </div>
      </div>
        <section
          id="launch-compass"
          className="bg-white px-4 py-16 md:py-20"
        >
          <div className="max-w-6xl mx-auto grid gap-10 md:grid-cols-[1.1fr_0.9fr] items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
                {t.launchCompass.eyebrow}
              </p>
              <h2 className="mt-3 text-3xl md:text-4xl font-semibold text-slate-900">
                {t.launchCompass.title}
              </h2>
              <p className="mt-4 text-base md:text-lg text-slate-600">
                {t.launchCompass.body}
              </p>
              <blockquote className="mt-6 border-l-2 border-[#6b59fa] pl-4 text-slate-700 italic">
                {t.launchCompass.quote}
              </blockquote>
            </div>
            <a
              href="/launch-compass"
              className="group flex flex-col items-center gap-4 rounded-3xl border border-slate-200 bg-[#f7f4fb] p-8 shadow-lg shadow-slate-200/40 transition hover:-translate-y-1 hover:shadow-xl"
              aria-label={t.launchCompass.cta}
            >
              <img
                src="/Compass.png"
                alt="Fittara Launch Compass"
                className="h-36 w-36 md:h-44 md:w-44 object-contain transition group-hover:rotate-6"
              />
              <span className="text-sm font-semibold text-slate-700">
                {t.launchCompass.cta}
              </span>
            </a>
          </div>
        </section>
        <WhatWeOffer language={language} />
        {/* Our esteemed clients */}
        <section className="bg-[#efeaf3] px-4 py-14 md:py-20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-center text-2xl md:text-3xl font-semibold text-slate-600 mb-10">
              {t.clientsHeading}
            </h2>

            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  handle: "@sanskrutiboutiqueofficial",
                  brand: "Sanskriti by Sheetal",
                  url: "www.sanskrutibysheetal.com",
                  instaUrl:
                    "https://www.instagram.com/sanskrutiboutiqueofficial?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
                  logo: "/Sankruti_by_sheetal.png",
                  accent: "bg-orange-500",
                },
                {
                  handle: "@Dreamsboutique",
                  brand: "Dreams Boutique",
                  url: "www.dreamsdesignerboutique.com",
                  logo: "/DreamsLogo.jpg",
                  accent: "bg-emerald-500",
                },
                {
                  handle: "@eksoot.in",
                  brand: "Eksoot",
                  url: "eksoot.the-fittara.com",
                  instaUrl:
                    "https://www.instagram.com/eksoot.in?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
                  logo: "/EksootLogo.jpeg",
                  accent: "bg-amber-600",
                },
              ].map((card) => (
                <div
                  key={card.handle}
                  className="bg-white rounded-2xl border border-slate-200 shadow-md shadow-slate-300/40 p-6 flex flex-col items-center text-center gap-4"
                >
                  {card.logo ? (
                    <img
                      src={card.logo}
                      alt={card.brand}
                      className="h-14 w-14 rounded-full object-contain border border-slate-200 bg-white p-1"
                    />
                  ) : (
                    <div
                      className={`h-14 w-14 rounded-full ${card.accent} text-white flex items-center justify-center text-sm font-semibold`}
                      aria-hidden="true"
                    >
                      {card.brand.slice(0, 2).toUpperCase()}
                    </div>
                  )}
                  {card.instaUrl ? (
                    <a
                      href={card.instaUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm font-semibold text-slate-700 hover:text-slate-900"
                    >
                      {card.handle}
                    </a>
                  ) : (
                    <p className="text-sm font-semibold text-slate-700">
                      {card.handle}
                    </p>
                  )}
                  <a
                    href={`https://${card.url}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-slate-500 hover:text-slate-700"
                  >
                    {card.url}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {showPopup ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm px-4"
          onClick={() => handleWelcomeSubmitted(null)}
          role="button"
          tabIndex={-1}
        >
          <div
            className="relative w-full max-w-md rounded-3xl bg-[#7c27f6] px-8 py-10 text-center text-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
            role="presentation"
          >
            <button
              type="button"
              onClick={() => handleWelcomeSubmitted(null)}
              className="absolute right-5 top-4 text-2xl leading-none text-white/80 hover:text-white"
              aria-label="Close"
            >
              ×
            </button>
            <h2 className="text-2xl font-semibold mb-2">
              {t.popup.title}
            </h2>
            <p className="text-sm text-white/80 mb-6">
              {t.popup.body}
            </p>
            <div id="hubspot-welcome-form" className="space-y-4 text-left" />
            <button
              type="button"
              onClick={() => handleWelcomeSubmitted(null)}
              className="mt-4 w-full rounded-full border border-white/60 py-2 text-xs font-semibold text-white/90 hover:bg-white/10"
            >
              {t.popup.cta}
            </button>
          </div>
        </div>
      ) : null}
      {/* Footer */}
      <footer className="mt-auto border-t border-slate-800/80 px-4 py-6 text-xs text-slate-500">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <p>
            {t.footer.rightsPrefix} {new Date().getFullYear()}{" "}
            {t.footer.rightsSuffix}
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="https://www.instagram.com/thefittara?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
              target="_blank"
              rel="noreferrer"
              className="hover:text-slate-300"
              aria-label="Fittara on Instagram"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="currentColor"
              >
                <path d="M12 7.35a4.65 4.65 0 1 0 0 9.3 4.65 4.65 0 0 0 0-9.3zm0 7.68a3.03 3.03 0 1 1 0-6.06 3.03 3.03 0 0 1 0 6.06zm5.92-7.97a1.08 1.08 0 1 1-2.16 0 1.08 1.08 0 0 1 2.16 0z" />
                <path d="M16.46 3.5H7.54A4.04 4.04 0 0 0 3.5 7.54v8.92A4.04 4.04 0 0 0 7.54 20.5h8.92a4.04 4.04 0 0 0 4.04-4.04V7.54A4.04 4.04 0 0 0 16.46 3.5zm2.42 12.96a2.42 2.42 0 0 1-2.42 2.42H7.54a2.42 2.42 0 0 1-2.42-2.42V7.54a2.42 2.42 0 0 1 2.42-2.42h8.92a2.42 2.42 0 0 1 2.42 2.42z" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/company/voidstar-experiences/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-slate-300"
              aria-label="Fittara on LinkedIn"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="currentColor"
              >
                <path d="M4.98 3.5A2.48 2.48 0 1 0 5 8.46a2.48 2.48 0 0 0-.02-4.96zM3.5 9h3v11.5h-3zM14.2 9c-1.56 0-2.62.86-3.05 1.67V9h-3v11.5h3v-6.04c0-1.6.3-3.15 2.28-3.15 1.95 0 1.98 1.82 1.98 3.25v5.94h3V14.1c0-3.05-.65-5.1-4.21-5.1z" />
              </svg>
            </a>
            <a href="#" className="hover:text-slate-300">
              {t.footer.privacy}
            </a>
            <a href="#" className="hover:text-slate-300">
              {t.footer.terms}
            </a>
            <a href="#" className="hover:text-slate-300">
              {t.footer.contact}
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}

