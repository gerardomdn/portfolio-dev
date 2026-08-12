"use client";
import { useEffect, useRef } from "react";

export default function AdBanner({ slot, format = "auto", responsive = true }) {
  const adRef = useRef(null);
  useEffect(() => {
    try {
      if (typeof window !== "undefined" && adRef.current) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (e) {
      console.error("AdSense error:", e);
    }
  }, []);

  return (
    <div style={{ margin: "2rem 0", textAlign: "center" }}>
      <ins
        className="adsbygoogle"
        ref={adRef}
        style={{ display: "block" }}
        data-ad-client="ca-pub-XXXXXXX"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? "true" : "false"}
      />
    </div>
  );
}
