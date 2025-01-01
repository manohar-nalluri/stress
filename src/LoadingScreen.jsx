import React, { forwardRef, useRef } from "react";
 
import { cn } from "@/lib/utils";
import { AnimatedBeam } from "@/components/ui/animated-beam";
 
const Circle = forwardRef(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex size-12 items-center justify-center rounded-full border-2 bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
        className,
      )}
    >
      {children}
    </div>
  );
});
 
Circle.displayName = "Circle";
 
const LoadingScreen=()=> {
  const containerRef = useRef(null);
  const div1Ref = useRef(null);
  const div2Ref = useRef(null);
 
  return (
    <div
      className="relative flex w-[500px] max-w-[500px] items-center justify-center overflow-hidden rounded-lg border bg-background p-10 md:shadow-xl"
      ref={containerRef}
    >
      <div className="flex size-full flex-col items-stretch justify-between gap-10">
        <div className=" text-center font-semibold">Analizing the values...
        </div>
        <div className="flex flex-row justify-between">
          <Circle ref={div1Ref}>
            <Icons.user />
          </Circle>
          <Circle ref={div2Ref}>
            <Icons.openai />
          </Circle>
        </div>
      </div>
 
      <AnimatedBeam
        duration={3}
        containerRef={containerRef}
        fromRef={div1Ref}
        toRef={div2Ref}
      />
    </div>
  );
}
 
const Icons = {
  openai: () => (
    
<svg
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  strokeWidth="2"
  strokeLinecap="round"
  strokeLinejoin="round"
>
  <circle cx="12" cy="12" r="10" />
  <circle cx="8" cy="8" r="1" />
  <circle cx="16" cy="8" r="1" />
  <circle cx="8" cy="16" r="1" />
  <circle cx="16" cy="16" r="1" />
  <line x1="8" y1="8" x2="16" y2="8" />
  <line x1="8" y1="8" x2="8" y2="16" />
  <line x1="16" y1="8" x2="16" y2="16" />
  <line x1="8" y1="16" x2="16" y2="16" />
</svg>
  ),
  user: () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#000000"
      strokeWidth="2"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
};
export default LoadingScreen
