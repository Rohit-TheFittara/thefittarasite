"use client";

import { Open_Sans } from "next/font/google";
import { useEffect, useRef, useState } from "react";
import { createHubspotForm, loadHubspotScript } from "../lib/hubspot";

const openSans = Open_Sans({ subsets: ["latin"], weight: ["600", "700"] });

const HUBSPOT_PORTAL_ID = "244698844";
const REGISTER_FORMS = {
  website: {
    formId: "0fccc195-d574-4a13-9943-076e1dd7eb6a",
    title: {
      en: "Register for Apparel Brand Website",
      hi: "Apparel Brand Website के लिए रजिस्टर करें",
    },
  },
  tryon: {
    formId: "41aeb132-495e-4b86-a40c-f73f347ccf53",
    title: {
      en: "Register for 3D Virtual Trial Room",
      hi: "3D Virtual Trial Room के लिए रजिस्टर करें",
    },
  },
  photography: {
    formId: "d63503fc-2152-4770-9465-2e89d627e6b9",
    title: {
      en: "Register for AI Photography",
      hi: "AI Photography के लिए रजिस्टर करें",
    },
  },
};
type RegisterFormKey = keyof typeof REGISTER_FORMS;
type Language = "en" | "hi";

const copy = {
  en: {
    sectionEyebrow: "What we offer",
    sectionHeadline:
      "The operating system for modern ecommerce fashion brands",
    sectionBody:
      "Tools, insights, and workflows that help fashion brands sell smarter without losing their craft and money.",
    items: [
      {
        id: "website",
        title: "Apparel Brand Website",
      subtitle: "Go online in 24 Hours",
        features: [
          "No high-tech knowledge required",
          "3D visual trial room",
          "AI photography",
          "Integrated logistics",
          "Integrated payment gateway",
          "Customer insights",
          "Social media integration",
        ],
        iconLabel: "WB",
        iconImage: "/GlobalImage.png",
        videoSrc: "/FullWebsiteVid.mp4",
      },
      {
        id: "tryon",
        title: "3D Virtual Trial Room",
        subtitle: "Experience before you buy",
        features: [
          "First of its kind in India",
          "A web-based 3D experience",
          "Rotate, zoom, twirl your garment",
          "Know your fabric and its fall",
          "See the fit, make a choice",
          "Reduce the number of returns",
          "Increase your informed sales",
        ],
        iconLabel: "360",
        iconImage: "/3D.png",
        videoSrc: "/3DTryOnVid3.mp4",
      },
      {
        id: "photography",
        title: "AI Photography",
        subtitle: "No studio, no models, no product shoots",
        features: [
          "Experience the world of AI",
          "Simple phone pictures converted to beautiful,",
          "e-commerce ready photographs within seconds",
          "Save big, with no product shoots",
          "and no photographers",
        ],
        iconLabel: "AI",
        iconImage: "/AI.png",
        videoSrc: "/AiPhotoVid1.mp4",
      },
    ],
    buttons: {
      viewDemo: "View Demo",
      pricing: "Pricing",
      register: "Register now",
    },
    mensWear: {
      label: "Men's wear",
      andLabel: "and Jewellery",
    },
    waitlist: {
      title: "Join our early adopter list",
      body:
        "Join our early adopter list for Men's & Jewellery category by clicking submit.",
      placeholder: "Enter 10-digit mobile number",
      menCategory: "Men's category",
      jewelleryCategory: "Jewellery",
      submit: "Submit",
    },
    pricingPopup: {
      title: "Apparel Brand Website",
      subtitle: "For solo entrepreneurs",
      priceLine: "Flat 1999/- per month",
      startingAt: "Starting at",
      billed: "INR/month billed monthly",
      includedTitle: "What is included",
      includedList: [
        "Full working website.",
        "Paymens and logistics integrated",
        "100 AI photos per month",
        "Unlimited 3D trial room",
        "Fittara Intelligence added",
      ],
    },
    tryonPopup: {
      title: "Coming soon",
      body: "Join the queue to be the first to experience the 3D Try On.",
      cta: "Join the queue",
    },
    photographyPopup: {
      title: "AI Photography",
      price: "INR 5/- per photo",
      note: "Including 4K.",
    },
    registerPopup: {
      body: "Share your details and we will reach out shortly.",
    },
  },
  hi: {
    sectionEyebrow: "हम क्या ऑफर करते हैं",
    sectionHeadline:
      "Modern ecommerce fashion brands के लिए operating system",
    sectionBody:
      "ऐसे tools, insights और workflows जो fashion brands को craft खोए बिना smarter तरीके से बेचने में मदद करते हैं।",
    items: [
      {
        id: "website",
        title: "Apparel Brand Website",
        subtitle: "24 घंटों में ऑनलाइन जाएं",
        features: [
          "High-tech knowledge की जरूरत नहीं",
          "3D visual trial room",
          "AI photography",
          "Integrated logistics",
          "Integrated payment gateway",
          "Customer insights",
          "Social media integration",
        ],
        iconLabel: "WB",
        iconImage: "/GlobalImage.png",
        videoSrc: "/FullWebsiteVid.mp4",
      },
      {
        id: "tryon",
        title: "3D Virtual Trial Room",
        subtitle: "खरीदने से पहले अनुभव करें",
        features: [
          "भारत में पहली बार",
          "Web-based 3D अनुभव",
          "अपने garment को rotate, zoom, twirl करें",
          "फैब्रिक और उसका fall जानें",
          "Fit देखें, फैसला करें",
          "Returns कम करें",
          "Informed sales बढ़ाएं",
        ],
        iconLabel: "360",
        iconImage: "/3D.png",
        videoSrc: "/3DTryOnVid3.mp4",
      },
      {
        id: "photography",
        title: "AI Photography",
        subtitle: "No studio, no models, no product shoots",
        features: [
          "AI की दुनिया का अनुभव करें",
          "Simple phone pictures को खूबसूरत,",
          "e-commerce ready photos में सेकंड्स में बदलें",
          "Product shoots के बिना बड़ी बचत",
          "और बिना photographers के",
        ],
        iconLabel: "AI",
        iconImage: "/AI.png",
        videoSrc: "/AiPhotoVid1.mp4",
      },
    ],
    buttons: {
      viewDemo: "Demo देखें",
      pricing: "Pricing",
      register: "अभी रजिस्टर करें",
    },
    mensWear: {
      label: "Men's wear",
      andLabel: "और Jewellery",
    },
    waitlist: {
      title: "Early adopter list में जुड़ें",
      body:
        "Submit पर क्लिक करके Men's & Jewellery category के लिए हमारी early adopter list में जुड़ें।",
      placeholder: "10-अंकों का मोबाइल नंबर दर्ज करें",
      menCategory: "Men's category",
      jewelleryCategory: "Jewellery",
      submit: "सबमिट करें",
    },
    pricingPopup: {
      title: "Apparel Brand Website",
      subtitle: "Solo entrepreneurs के लिए",
      priceLine: "फ्लैट 1999/- प्रति माह",
      startingAt: "Starting at",
      billed: "INR/महीना (मासिक बिलिंग)",
      includedTitle: "क्या शामिल है",
      includedList: [
        "पूरी तरह काम करने वाली वेबसाइट.",
        "Payments और logistics integrated",
        "100 AI photos प्रति माह",
        "Unlimited 3D trial room",
        "Fittara Intelligence शामिल",
      ],
    },
    tryonPopup: {
      title: "जल्द आ रहा है",
      body: "3D Try On का सबसे पहले अनुभव करने के लिए queue में जुड़ें।",
      cta: "Queue में जुड़ें",
    },
    photographyPopup: {
      title: "AI Photography",
      price: "INR 5/- प्रति फोटो",
      note: "4K सहित।",
    },
    registerPopup: {
      body: "अपनी जानकारी शेयर करें, हम जल्द ही संपर्क करेंगे।",
    },
  },
};

type WhatWeOfferProps = {
  language: Language;
};

export default function WhatWeOffer({ language }: WhatWeOfferProps) {
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const [activeVideoPhase, setActiveVideoPhase] = useState<"idle" | "playing">(
    "idle"
  );
  const [showWaitlistPopup, setShowWaitlistPopup] = useState(false);
  const [showPricingPopup, setShowPricingPopup] = useState(false);
  const [showTryonPopup, setShowTryonPopup] = useState(false);
  const [showPhotographyPopup, setShowPhotographyPopup] = useState(false);
  const [activeRegisterForm, setActiveRegisterForm] =
    useState<RegisterFormKey | null>(null);
  const [leadNumber, setLeadNumber] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const numberKey = "fittara_lead_number";
    const storedNumber = sessionStorage.getItem(numberKey);
    if (storedNumber) {
      setLeadNumber(storedNumber);
    }
  }, []);

  useEffect(() => {
    if (!activeRegisterForm || typeof window === "undefined") {
      return;
    }

    const formConfig = REGISTER_FORMS[activeRegisterForm];
    let isActive = true;

    loadHubspotScript()
      .then(() => {
        if (!isActive) {
          return;
        }
        createHubspotForm({
          portalId: HUBSPOT_PORTAL_ID,
          formId: formConfig.formId,
          target: `#hubspot-register-${activeRegisterForm}`,
          redirectUrl: "/thank-you",
          onFormReady: (form) => {
            const storedNumber = sessionStorage.getItem("fittara_lead_number");
            const phoneInput =
              form.querySelector<HTMLInputElement>('input[name="phone"]');
            if (storedNumber && phoneInput && !phoneInput.value) {
              phoneInput.value = storedNumber;
            }
          },
          onFormSubmitted: () => {
            setActiveRegisterForm(null);
          },
        });
      })
      .catch(() => {});

    return () => {
      isActive = false;
    };
  }, [activeRegisterForm]);
  const t = copy[language];
  const items = t.items;

  function getTestEventCode(): string | null {
    if (typeof window === "undefined") {
      return null;
    }
    const params = new URLSearchParams(window.location.search);
    return params.get("test_event_code");
  }

  function getEventId(): string {
    if (typeof crypto !== "undefined" && crypto.randomUUID) {
      return crypto.randomUUID();
    }
    return `evt_${Date.now()}_${Math.random().toString(16).slice(2)}`;
  }

  function trackMetaEvent(
    eventName: string,
    payload?: Record<string, string>,
    standardEvent?: string
  ) {
    if (typeof window === "undefined") {
      return;
    }
    const fbq = (window as typeof window & { fbq?: (...args: unknown[]) => void })
      .fbq;
    const eventId = getEventId();
    const testEventCode = getTestEventCode();
    const fullPayload = testEventCode
      ? { ...payload, test_event_code: testEventCode }
      : payload;
    const trackOptions = { eventID: eventId };
    if (fbq) {
      if (standardEvent) {
        fbq("track", standardEvent, fullPayload, trackOptions);
      }
      fbq("trackCustom", eventName, fullPayload, trackOptions);
    }
  }

  function stopVideo(id: string | null) {
    if (!id) {
      return;
    }
    const video = videoRefs.current[id];
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  }

  function playVideo(id: string) {
    const video = videoRefs.current[id];
    if (video) {
      video.currentTime = 0;
      void video.play();
    }
  }

  function openRegisterForm(formKey: RegisterFormKey) {
    setShowWaitlistPopup(false);
    setShowPricingPopup(false);
    setShowTryonPopup(false);
    setShowPhotographyPopup(false);
    setActiveRegisterForm(formKey);
  }

  return (
    <section className="relative z-10 -mt-10 md:-mt-16 rounded-t-[32px] md:rounded-t-[40px] bg-white/95 text-slate-900 px-4 py-14 md:py-20 shadow-[0_-12px_30px_rgba(15,23,42,0.08)] overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute hidden md:block md:left-[66px] md:top-[200px] md:h-[737px] md:w-[696px] bg-[url('/Compass.png')] bg-contain bg-no-repeat opacity-[0.04]"
      />
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2
            className={`${openSans.className} text-[32px] leading-[40px] md:text-[40px] md:leading-[46px] font-semibold text-[#444444] tracking-[-0.04em] mb-3`}
          >
            {t.sectionEyebrow}
          </h2>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="fabric-ink" style={{ animationDelay: "6s" }}>
              {t.sectionHeadline}
            </span>
          </h2>
          <div className="mx-auto h-1 w-16 rounded-full bg-purple-500 mb-4" />
          <p className="text-sm md:text-base text-slate-600">
            {t.sectionBody}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 md:items-stretch md:justify-items-stretch tile-perspective">
          {items.map((item) => (
            <div key={item.id} className="relative w-full md:max-w-[280px] md:mx-auto">
              {item.videoSrc ? (
                <div
                  className={`transition-opacity duration-200 ease-out ${
                    activeVideoId === item.id && activeVideoPhase === "playing"
                      ? "opacity-0"
                      : "opacity-100"
                  }`}
                >
                  {item.id === "website" ? (
                    <div className="pointer-events-none absolute right-5 top-5 z-10 h-10 w-10 rounded-full bg-white shadow-md shadow-purple-200/60 ring-1 ring-purple-100">
                      <div className="absolute inset-[7px] rounded-full bg-[conic-gradient(from_120deg,_#5b47ff,_#ff5ea0,_#6cc8ff,_#5b47ff)] opacity-80" />
                      <div className="absolute inset-[10px] rounded-full bg-white" />
                      <div className="absolute left-1/2 top-1/2 h-[20px] w-[1px] -translate-x-1/2 -translate-y-1/2 bg-purple-200" />
                      <div className="absolute left-1/2 top-1/2 h-[1px] w-[20px] -translate-x-1/2 -translate-y-1/2 bg-purple-200" />
                    </div>
                  ) : null}
                  <div
                    className={`pointer-events-auto absolute right-0 top-24 z-10 w-[72px] md:w-[92px] translate-x-0 md:translate-x-1/2 rounded-2xl bg-white p-2 shadow-lg shadow-slate-200/60 ring-1 ring-slate-100 transition-all duration-300 ease-out hover:inset-0 hover:z-20 hover:w-full hover:h-full hover:translate-x-0 hover:rounded-3xl hover:p-4 ${
                      item.id === "photography" ? "md:translate-x-[60%]" : ""
                    }`}
                  >
                    <video
                      className="h-[88px] md:h-[110px] w-full rounded-xl object-cover transition-all duration-300 ease-out hover:h-full hover:rounded-2xl"
                      src={item.videoSrc}
                      muted
                      playsInline
                      autoPlay
                      loop
                    />
                    <div className="mt-2 text-[9px] font-semibold text-slate-500 text-center transition-all duration-300 ease-out hover:text-base">
                      {item.title}
                    </div>
                  </div>
                </div>
              ) : null}
              <div
                className="tile-3d group relative h-full rounded-3xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/40 flex flex-col overflow-hidden"
                onClick={() => {
                  if (!item.videoSrc) {
                    return;
                  }
                  if (activeVideoId === item.id && activeVideoPhase === "playing") {
                    stopVideo(item.id);
                    setActiveVideoPhase("idle");
                    setActiveVideoId(null);
                    return;
                  }
                  if (activeVideoId && activeVideoId !== item.id) {
                    stopVideo(activeVideoId);
                  }
                  setActiveVideoId(item.id);
                  setActiveVideoPhase("playing");
                  playVideo(item.id);
                }}
              >
              {item.videoSrc ? (
                <div
                  className={`absolute inset-0 transition-opacity duration-200 ease-out ${
                    activeVideoId === item.id && activeVideoPhase === "playing"
                      ? "opacity-100"
                      : "opacity-0"
                  }`}
                >
                  <video
                    ref={(node) => {
                      videoRefs.current[item.id] = node;
                    }}
                    className={`h-full w-full object-cover ${
                      item.id === "photography" ? "object-right" : ""
                    }`}
                    muted
                    playsInline
                    preload="metadata"
                    onEnded={() => {
                      if (activeVideoId !== item.id) {
                        return;
                      }
                      setActiveVideoPhase("idle");
                      setActiveVideoId(null);
                      if (videoRefs.current[item.id]) {
                        videoRefs.current[item.id]!.currentTime = 0;
                      }
                    }}
                  >
                    <source src={item.videoSrc} type="video/mp4" />
                  </video>
                </div>
              ) : null}
              <div
                className={`relative z-10 flex h-full flex-col transition-opacity duration-200 ease-out ${
                  activeVideoId === item.id && activeVideoPhase === "playing"
                    ? "opacity-0 pointer-events-none"
                    : "opacity-100"
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div />
                  <div className="h-9 w-9 rounded-full border border-purple-200 text-purple-600 flex items-center justify-center text-xs font-semibold bg-white">
                    {item.iconImage ? (
                      <img
                        src={item.iconImage}
                        alt=""
                        className="h-5 w-5 object-contain"
                        aria-hidden="true"
                      />
                    ) : (
                      item.iconLabel
                    )}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-purple-600 fabric-reactive mb-2">
                  {item.title}
                </h3>
                <div className="h-px w-full bg-slate-200 mb-3" />
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-3">
                  {item.subtitle}
                </p>
                <ul className="text-sm text-slate-600 space-y-1 mb-6">
                  {item.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
                <div className="mt-auto flex items-center gap-3">
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      trackMetaEvent(
                        "ViewDemo",
                        {
                          item_id: item.id,
                          item_name: item.title,
                        },
                        "ViewContent"
                      );
                    }}
                    className="flex-1 rounded-lg border border-purple-500 text-purple-600 text-sm font-semibold py-2 hover:bg-purple-50"
                  >
                    {t.buttons.viewDemo}
                  </button>
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      if (item.id === "website") {
                        setShowPricingPopup(true);
                        return;
                      }
                      if (item.id === "tryon") {
                        setShowTryonPopup(true);
                        return;
                      }
                      if (item.id === "photography") {
                        setShowPhotographyPopup(true);
                      }
                    }}
                    className="flex-1 rounded-lg bg-purple-600 text-white text-sm font-semibold py-2 hover:bg-purple-500"
                  >
                    {t.buttons.pricing}
                  </button>
                </div>
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    trackMetaEvent(
                      "RegisterClick",
                      {
                        item_id: item.id,
                        item_name: item.title,
                      },
                      "Lead"
                    );
                    openRegisterForm(item.id as RegisterFormKey);
                  }}
                  className="mt-3 w-full rounded-lg border border-purple-500 text-purple-600 text-sm font-semibold py-2 hover:bg-purple-50"
                >
                  {t.buttons.register}
                </button>
              </div>
            </div>
          </div>
          ))}
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={() => setShowWaitlistPopup(true)}
            className={`${openSans.className} text-right text-[18px] md:text-[20px] leading-[1.36] font-bold text-[#9853F9] hover:text-[#7a2ff5] transition`}
          >
            {t.mensWear.label}{" "}
            <span className="font-semibold text-[#9853F9]">
              {t.mensWear.andLabel}
            </span>
          </button>
        </div>
      </div>
      {showWaitlistPopup ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm px-4">
          <div className="relative w-full max-w-md rounded-3xl bg-white px-6 py-8 text-center shadow-2xl">
            <button
              type="button"
              onClick={() => setShowWaitlistPopup(false)}
              className="absolute right-5 top-4 text-2xl leading-none text-slate-400 hover:text-slate-700"
              aria-label="Close"
            >
              ×
            </button>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              {t.waitlist.title}
            </h3>
            <p className="text-sm text-slate-500 mb-6">
              {t.waitlist.body}
            </p>
            {leadNumber ? (
              <div className="rounded-full border border-slate-200 px-4 py-3 text-sm text-slate-700 mb-4">
                {leadNumber}
              </div>
            ) : (
              <input
                type="tel"
                inputMode="numeric"
                placeholder={t.waitlist.placeholder}
                value={leadNumber}
                onChange={(event) => setLeadNumber(event.target.value)}
                className="w-full rounded-full border border-slate-200 px-4 py-3 text-sm text-slate-700 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-200"
              />
            )}
            <div className="grid grid-cols-2 gap-3 mb-5">
              <button
                type="button"
                onClick={() => setSelectedCategory("men")}
                className={`rounded-full border px-4 py-2 text-sm font-semibold ${
                  selectedCategory === "men"
                    ? "border-purple-500 bg-purple-50 text-purple-700"
                    : "border-slate-200 text-slate-600 hover:border-purple-300 hover:text-purple-700"
                }`}
              >
                {t.waitlist.menCategory}
              </button>
              <button
                type="button"
                onClick={() => setSelectedCategory("jewellery")}
                className={`rounded-full border px-4 py-2 text-sm font-semibold ${
                  selectedCategory === "jewellery"
                    ? "border-purple-500 bg-purple-50 text-purple-700"
                    : "border-slate-200 text-slate-600 hover:border-purple-300 hover:text-purple-700"
                }`}
              >
                {t.waitlist.jewelleryCategory}
              </button>
            </div>
            <button
              type="button"
              onClick={() => {
                if (!leadNumber) {
                  return;
                }
                if (typeof window !== "undefined") {
                  sessionStorage.setItem("fittara_lead_number", leadNumber.replace(/\D/g, ""));
                }
                if (!selectedCategory) {
                  return;
                }
                setShowWaitlistPopup(false);
              }}
              className="w-full rounded-full bg-purple-600 py-3 text-sm font-semibold text-white disabled:opacity-50"
              disabled={!selectedCategory || !leadNumber}
            >
              {t.waitlist.submit}
            </button>
          </div>
        </div>
      ) : null}
      {showPricingPopup ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm px-4"
          onClick={() => setShowPricingPopup(false)}
          role="button"
          tabIndex={-1}
        >
          <div
            className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white text-left shadow-2xl"
            onClick={(event) => event.stopPropagation()}
            role="presentation"
          >
            <button
              type="button"
              onClick={() => setShowPricingPopup(false)}
              className="absolute right-4 top-4 text-2xl leading-none text-white/90 hover:text-white"
              aria-label="Close"
            >
              x
            </button>
            <div className="px-6 py-7">
              <div className="mb-3 flex items-center justify-between gap-3">
                <h3 className="text-2xl font-semibold text-slate-900">
                  {t.pricingPopup.title}
                </h3>
                {/* <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700">
                  Most Popular
                </span> */}
              </div>
              <p className="text-sm text-slate-600 mb-1">
                {t.pricingPopup.subtitle}
              </p>
              <p className="mt-2 text-base font-semibold text-slate-900">
                {t.pricingPopup.priceLine}
              </p>
              <div className="mt-4">
                <p className="text-xs uppercase tracking-wide text-slate-400">
                  {t.pricingPopup.startingAt}
                </p>
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-semibold text-slate-900">
                    ₹1,999
                  </span>
                  <span className="text-sm text-slate-500">
                    {t.pricingPopup.billed}
                  </span>
                </div>
              </div>
              <div className="mt-5 text-sm font-semibold text-slate-700">
                {t.pricingPopup.includedTitle}
              </div>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                {t.pricingPopup.includedList.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : null}
      {showTryonPopup ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm px-4"
          onClick={() => setShowTryonPopup(false)}
          role="button"
          tabIndex={-1}
        >
          <div
            className="relative w-full max-w-md rounded-3xl bg-white px-6 py-8 text-center shadow-2xl"
            onClick={(event) => event.stopPropagation()}
            role="presentation"
          >
            <button
              type="button"
              onClick={() => setShowTryonPopup(false)}
              className="absolute right-5 top-4 text-2xl leading-none text-slate-400 hover:text-slate-700"
              aria-label="Close"
            >
              x
            </button>
            <h3 className="text-2xl font-semibold text-slate-900 mb-3">
              {t.tryonPopup.title}
            </h3>
            <p className="text-sm text-slate-600 mb-6">
              {t.tryonPopup.body}
            </p>
            <button
              type="button"
              onClick={() => openRegisterForm("tryon")}
              className="w-full rounded-full bg-purple-600 py-3 text-sm font-semibold text-white hover:bg-purple-500"
            >
              {t.tryonPopup.cta}
            </button>
          </div>
        </div>
      ) : null}
      {showPhotographyPopup ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm px-4"
          onClick={() => setShowPhotographyPopup(false)}
          role="button"
          tabIndex={-1}
        >
          <div
            className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white text-left shadow-2xl"
            onClick={(event) => event.stopPropagation()}
            role="presentation"
          >
            <button
              type="button"
              onClick={() => setShowPhotographyPopup(false)}
              className="absolute right-4 top-4 text-2xl leading-none text-white/90 hover:text-white"
              aria-label="Close"
            >
              x
            </button>
            <div className="px-6 py-7">
              <h3 className="text-2xl font-semibold text-slate-900 mb-2">
                {t.photographyPopup.title}
              </h3>
              <p className="text-base font-semibold text-slate-900 mb-1">
                {t.photographyPopup.price}
              </p>
              <p className="text-sm text-slate-600">
                {t.photographyPopup.note}
              </p>
            </div>
          </div>
        </div>
      ) : null}
      {activeRegisterForm ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm px-4">
          <div className="relative w-full max-w-lg rounded-3xl bg-white px-6 py-8 text-center shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setActiveRegisterForm(null)}
              className="absolute right-5 top-4 text-2xl leading-none text-slate-400 hover:text-slate-700"
              aria-label="Close"
            >
              x
            </button>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              {REGISTER_FORMS[activeRegisterForm].title[language]}
            </h3>
            <p className="text-sm text-slate-500 mb-6">
              {t.registerPopup.body}
            </p>
            <div
              id={`hubspot-register-${activeRegisterForm}`}
              className="text-left"
            />
          </div>
        </div>
      ) : null}
    </section>
  );
}
