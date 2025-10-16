import React from "react";

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

export default function AnalyticsBoot() {
  React.useEffect(() => {
    const w = window as any;
    if (w.gtag) return; // evita duplicar

    const s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=G-R0HT0KQ6WL";
    document.head.appendChild(s);

    w.dataLayer = w.dataLayer || [];
    w.gtag = function () { w.dataLayer.push(arguments); };
    w.gtag("js", new Date());
    w.gtag("config", "G-R0HT0KQ6WL");
  }, []);
  return null;
}
