"use client";

import { Open_Sans } from "next/font/google";
import { useEffect, useRef, useState } from "react";

const openSans = Open_Sans({ subsets: ["latin"], weight: ["600", "700"] });

export default function WhatWeOffer() {
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});
  const spinRemainingRef = useRef(0);
  const allowHoverTimeoutRef = useRef<number | null>(null);
  const spinTimeoutRef = useRef<Record<string, number>>({});
  const returnTimeoutRef = useRef<Record<string, number>>({});
  const activeVideoIdRef = useRef<string | null>(null);
  const activeVideoPhaseRef = useRef<"idle" | "spinning" | "playing" | "returning">(
    "idle"
  );
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const [activeVideoPhase, setActiveVideoPhase] = useState<
    "idle" | "spinning" | "playing" | "returning"
  >("idle");
  const [animateIn, setAnimateIn] = useState(false);
  const [allowHoverSpin, setAllowHoverSpin] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    activeVideoIdRef.current = activeVideoId;
    activeVideoPhaseRef.current = activeVideoPhase;
  }, [activeVideoId, activeVideoPhase]);

  useEffect(() => {
    const storageKey = "fittara_tiles_spin_in";
    if (typeof window === "undefined") {
      return;
    }
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleMotionPreference = () => {
      setPrefersReducedMotion(mediaQuery.matches);
      if (mediaQuery.matches) {
        setAllowHoverSpin(true);
      }
    };
    handleMotionPreference();
    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", handleMotionPreference);
    } else {
      mediaQuery.addListener(handleMotionPreference);
    }
    if (sessionStorage.getItem(storageKey) !== "1") {
      spinRemainingRef.current = items.length;
      setAnimateIn(true);
      sessionStorage.setItem(storageKey, "1");
      allowHoverTimeoutRef.current = window.setTimeout(() => {
        setAllowHoverSpin(true);
      }, 1200);
      return;
    }
    setAllowHoverSpin(true);
    return () => {
      if (allowHoverTimeoutRef.current) {
        window.clearTimeout(allowHoverTimeoutRef.current);
      }
      Object.values(spinTimeoutRef.current).forEach((timeoutId) => {
        window.clearTimeout(timeoutId);
      });
      spinTimeoutRef.current = {};
      Object.values(returnTimeoutRef.current).forEach((timeoutId) => {
        window.clearTimeout(timeoutId);
      });
      returnTimeoutRef.current = {};
      if (typeof mediaQuery.removeEventListener === "function") {
        mediaQuery.removeEventListener("change", handleMotionPreference);
      } else {
        mediaQuery.removeListener(handleMotionPreference);
      }
    };
  }, []);
  const items = [
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
      videoSrc: "/SeaNavigation.mp4",
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
      videoSrc: "/3DTryOn.mp4",
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
      videoSrc: "/AICatalog.mp4",
    },
  ];

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

  function clearSpinTimeout(id: string) {
    if (spinTimeoutRef.current[id]) {
      window.clearTimeout(spinTimeoutRef.current[id]);
      delete spinTimeoutRef.current[id];
    }
  }

  function clearReturnTimeout(id: string) {
    if (returnTimeoutRef.current[id]) {
      window.clearTimeout(returnTimeoutRef.current[id]);
      delete returnTimeoutRef.current[id];
    }
  }

  return (
    <section className="relative z-10 -mt-10 md:-mt-16 rounded-t-[32px] md:rounded-t-[40px] bg-white/95 text-slate-900 px-4 py-14 md:py-20 shadow-[0_-12px_30px_rgba(15,23,42,0.08)]">
      <div
        aria-hidden
        className="pointer-events-none absolute left-[66px] top-[200px] h-[737px] w-[696px] bg-[url('/Compass.png')] bg-contain bg-no-repeat opacity-[0.04]"
      />
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2
            className={`${openSans.className} text-[40px] leading-[46px] font-semibold text-[#444444] tracking-[-0.04em] mb-3`}
          >
            What we offer
          </h2>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="fabric-ink" style={{ animationDelay: "6s" }}>
              The operating system for modern ecommerce fashion brands
            </span>
          </h2>
          <div className="mx-auto h-1 w-16 rounded-full bg-purple-500 mb-4" />
          <p className="text-sm md:text-base text-slate-600">
            Tools, insights, and workflows that help fashion brands sell
            smarter without losing their craft and money.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 md:justify-items-center tile-perspective">
          {items.map((item) => (
            <div key={item.id} className="relative w-full md:max-w-[280px]">
              {item.id === "website" ? (
                <div
                  className={`pointer-events-none transition-opacity duration-200 ease-out ${
                    activeVideoId === item.id && activeVideoPhase === "playing"
                      ? "opacity-0"
                      : "opacity-100"
                  }`}
                >
                  <div className="pointer-events-none absolute right-5 top-5 z-10 h-10 w-10 rounded-full bg-white shadow-md shadow-purple-200/60 ring-1 ring-purple-100">
                    <div className="absolute inset-[7px] rounded-full bg-[conic-gradient(from_120deg,_#5b47ff,_#ff5ea0,_#6cc8ff,_#5b47ff)] opacity-80" />
                    <div className="absolute inset-[10px] rounded-full bg-white" />
                    <div className="absolute left-1/2 top-1/2 h-[20px] w-[1px] -translate-x-1/2 -translate-y-1/2 bg-purple-200" />
                    <div className="absolute left-1/2 top-1/2 h-[1px] w-[20px] -translate-x-1/2 -translate-y-1/2 bg-purple-200" />
                  </div>
                  <div className="pointer-events-none absolute right-0 top-24 z-10 w-[92px] translate-x-1/2 rounded-2xl bg-white p-2 shadow-lg shadow-slate-200/60 ring-1 ring-slate-100">
                    <video
                      className="h-[110px] w-full rounded-xl object-cover"
                      src="/3DTryOnVid.mp4"
                      muted
                      playsInline
                      autoPlay
                      loop
                    />
                    <div className="mt-2 text-[9px] font-semibold text-slate-500 text-center">
                      3D Try-On
                    </div>
                  </div>
                </div>
              ) : null}
              <div
                className={`tile-3d group relative rounded-3xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/40 flex flex-col overflow-hidden ${
                  animateIn ? "motion-safe:animate-[tile-spin-in_1125ms_ease-out_1]" : ""
                } ${
                  allowHoverSpin
                    ? item.videoSrc
                      ? activeVideoId === item.id && activeVideoPhase === "spinning"
                        ? "motion-safe:animate-[tile-spin-hover_1125ms_ease-in-out_1]"
                        : activeVideoId === item.id && activeVideoPhase === "returning"
                          ? "motion-safe:animate-[tile-spin-hover_1125ms_ease-in-out_1]"
                        : ""
                      : "motion-safe:hover:animate-[tile-spin-hover_1125ms_ease-in-out_1]"
                    : ""
                }`}
                onAnimationEnd={(event) => {
                  if (
                    event.animationName === "tile-spin-hover" &&
                    item.videoSrc &&
                    activeVideoId === item.id &&
                    activeVideoPhase === "spinning"
                  ) {
                    clearSpinTimeout(item.id);
                    setActiveVideoPhase("playing");
                    const video = videoRefs.current[item.id];
                    if (video) {
                      video.currentTime = 0;
                      void video.play();
                    }
                  }
                  if (
                    event.animationName === "tile-spin-hover" &&
                    item.videoSrc &&
                    activeVideoId === item.id &&
                    activeVideoPhase === "returning"
                  ) {
                    clearSpinTimeout(item.id);
                    clearReturnTimeout(item.id);
                    setActiveVideoPhase("idle");
                    setActiveVideoId(null);
                  }
                  if (!animateIn || spinRemainingRef.current <= 0) {
                    return;
                  }
                  if (event.animationName !== "tile-spin-in") {
                    return;
                  }
                  spinRemainingRef.current -= 1;
                  if (spinRemainingRef.current === 0) {
                    setAllowHoverSpin(true);
                  }
                }}
                onMouseEnter={() => {
                  if (!item.videoSrc) {
                    return;
                  }
                  if (!allowHoverSpin || activeVideoPhase !== "idle") {
                    return;
                  }
                  if (activeVideoId && activeVideoId !== item.id) {
                    stopVideo(activeVideoId);
                  }
                  setActiveVideoId(item.id);
                  if (prefersReducedMotion) {
                    setActiveVideoPhase("playing");
                    const video = videoRefs.current[item.id];
                    if (video) {
                      video.currentTime = 0;
                      void video.play();
                    }
                    return;
                  }
                  setActiveVideoPhase("spinning");
                  clearSpinTimeout(item.id);
                  spinTimeoutRef.current[item.id] = window.setTimeout(() => {
                    if (
                      activeVideoIdRef.current === item.id &&
                      activeVideoPhaseRef.current === "spinning"
                    ) {
                      setActiveVideoPhase("playing");
                      const video = videoRefs.current[item.id];
                      if (video) {
                        video.currentTime = 0;
                        void video.play();
                      }
                    }
                  }, 1200);
                }}
                onMouseLeave={() => {
                  if (!item.videoSrc) {
                    return;
                  }
                  if (activeVideoId !== item.id) {
                    return;
                  }
                  if (activeVideoPhase === "playing") {
                    stopVideo(item.id);
                    clearSpinTimeout(item.id);
                    setActiveVideoPhase("returning");
                    clearReturnTimeout(item.id);
                    returnTimeoutRef.current[item.id] = window.setTimeout(() => {
                      if (
                        activeVideoIdRef.current === item.id &&
                        activeVideoPhaseRef.current === "returning"
                      ) {
                        setActiveVideoPhase("idle");
                        setActiveVideoId(null);
                      }
                    }, 1200);
                    return;
                  }
                  clearSpinTimeout(item.id);
                  clearReturnTimeout(item.id);
                  setActiveVideoPhase("idle");
                  setActiveVideoId(null);
                  stopVideo(item.id);
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
                      setActiveVideoPhase("returning");
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
                  <div className="h-9 w-9 rounded-full border border-purple-200 text-purple-600 flex items-center justify-center text-xs font-semibold">
                    {item.iconLabel}
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
                  <button className="flex-1 rounded-lg border border-purple-500 text-purple-600 text-sm font-semibold py-2 hover:bg-purple-50">
                    View Demo
                  </button>
                  <button className="flex-1 rounded-lg bg-purple-600 text-white text-sm font-semibold py-2 hover:bg-purple-500">
                    Register now
                  </button>
                </div>
              </div>
            </div>
          </div>
          ))}
        </div>

        <div className="mt-6 flex justify-end">
          <div
            className={`${openSans.className} text-right text-[20px] leading-[1.36] font-bold text-[#9853F9]`}
          >
            Men&apos;s wear{" "}
            <span className="font-semibold text-[#9853F9]">and Jewellery</span>
          </div>
        </div>
      </div>
    </section>
  );
}
