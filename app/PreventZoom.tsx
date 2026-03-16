"use client";

import { useEffect } from "react";

export default function PreventZoom() {
  useEffect(() => {
    const metaName = "viewport";
    let meta = document.querySelector(`meta[name=\"${metaName}\"]`) as HTMLMetaElement | null;
    const created = !meta;
    const original = meta?.getAttribute("content") ?? "width=device-width, initial-scale=1";
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = metaName;
      meta.setAttribute("content", original);
      document.head.appendChild(meta);
    }

    const noZoomContent = "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no";

    const onFocusIn = (e: FocusEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const tag = target.tagName?.toLowerCase();
      if (["input", "textarea", "select"].includes(tag || "")) {
        meta!.setAttribute("content", noZoomContent);
      }
    };

    const onFocusOut = () => {
      meta!.setAttribute("content", original);
    };

    window.addEventListener("focusin", onFocusIn);
    window.addEventListener("focusout", onFocusOut);

    return () => {
      window.removeEventListener("focusin", onFocusIn);
      window.removeEventListener("focusout", onFocusOut);
      if (created && meta?.parentNode) meta.parentNode.removeChild(meta);
      else if (meta) meta.setAttribute("content", original);
    };
  }, []);

  return null;
}
