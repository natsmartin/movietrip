"use client";

import { useEffect } from "react";

export default function PreventZoom() {
  useEffect(() => {
    // Instead of changing viewport (which disables pinch-zoom), ensure focused
    // form controls have at least 16px font-size to avoid mobile auto-zoom.
    const prevSizes = new WeakMap<HTMLElement, string | null>();

    const ensureSize = (el: HTMLElement) => {
      try {
        const cs = window.getComputedStyle(el);
        const fontSize = parseFloat(cs.fontSize || "0");
        if (isNaN(fontSize) || fontSize >= 16) return;
        prevSizes.set(el, el.style.fontSize ?? null);
        el.style.fontSize = "16px";
      } catch (e) {
        // ignore
      }
    };

    const restoreSize = (el: HTMLElement) => {
      if (!prevSizes.has(el)) return;
      const prev = prevSizes.get(el);
      if (prev === null || prev === "") el.style.removeProperty("font-size");
      else if (prev) el.style.fontSize = prev;
      prevSizes.delete(el);
    };

    const onFocusIn = (e: FocusEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const tag = target.tagName?.toLowerCase();
      if (["input", "textarea", "select"].includes(tag || "")) {
        ensureSize(target);
      }
    };

    const onFocusOut = (e: FocusEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const tag = target.tagName?.toLowerCase();
      if (["input", "textarea", "select"].includes(tag || "")) {
        restoreSize(target);
      }
    };

    window.addEventListener("focusin", onFocusIn);
    window.addEventListener("focusout", onFocusOut);

    return () => {
      window.removeEventListener("focusin", onFocusIn);
      window.removeEventListener("focusout", onFocusOut);
      prevSizes.clear();
    };
  }, []);

  return null;
}
