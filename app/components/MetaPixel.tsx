"use client";

import { useEffect } from "react";

const PIXEL_ID = "1892564474801041";

function getTestEventCode(): string | null {
  if (typeof window === "undefined") {
    return null;
  }
  const params = new URLSearchParams(window.location.search);
  return params.get("test_event_code");
}

export default function MetaPixel() {
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    if ((window as typeof window & { fbq?: (...args: unknown[]) => void }).fbq) {
      return;
    }

    (function (f: typeof window, b: Document, e: string, v: string) {
      const w = f as typeof window & {
        fbq?: (...args: unknown[]) => void;
        _fbq?: (...args: unknown[]) => void;
      };
      if (w.fbq) {
        return;
      }
      let fbq: any;
      fbq = function (...args: unknown[]) {
        if (fbq.callMethod) {
          fbq.callMethod.apply(fbq, args);
        } else if (fbq.queue) {
          fbq.queue.push(args);
        }
      };
      fbq.loaded = true;
      fbq.version = "2.0";
      fbq.queue = [];
      w.fbq = fbq;
      w._fbq = fbq;
      const t = b.createElement(e);
      t.async = true;
      t.src = v;
      const s = b.getElementsByTagName(e)[0];
      if (s?.parentNode) {
        s.parentNode.insertBefore(t, s);
      } else {
        b.head.appendChild(t);
      }
    })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");

    const fbq = (window as typeof window & { fbq?: (...args: unknown[]) => void })
      .fbq;
    if (!fbq) {
      return;
    }
    fbq("init", PIXEL_ID);
    const testEventCode = getTestEventCode();
    if (testEventCode) {
      fbq("track", "PageView", { test_event_code: testEventCode });
    } else {
      fbq("track", "PageView");
    }
  }, []);

  return null;
}
