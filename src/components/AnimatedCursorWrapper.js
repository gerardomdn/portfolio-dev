"use client";
import dynamic from "next/dynamic";

const AnimatedCursor = dynamic(() => import("@/hooks/AnimatedCursor"), { ssr: false });

export default function AnimatedCursorWrapper() {
  return (
    <div className="cursor__dot">
      <AnimatedCursor
        innerSize={15}
        outerSize={15}
        color="255, 255, 255"
        outerAlpha={0.4}
        innerScale={0.7}
        outerScale={5}
      />
    </div>
  );
}
