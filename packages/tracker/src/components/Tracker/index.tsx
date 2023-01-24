import Content from "components/Content";
import { TrackerContextProvider } from "context/Tracker";
import { ReactNode, useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import Headers from "../Headers";

export function Tracker({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  const [bounds, setBounds] = useState({
    width: 1024,
    height: 768,
  });

  useEffect(() => {
    const onResize = () => {
      const newBounds = ref?.current?.getBoundingClientRect();
      if (newBounds) {
        setBounds({ width: newBounds.width, height: newBounds.height });
      }
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <TrackerContextProvider canvasBounds={bounds}>
      <style>
        {`body, html {
          overscroll-behavior: none;
        }`}
      </style>
      <div ref={ref} className="absolute inset-0 flex flex-col">
        <Headers height={50} />
        <Content>{children}</Content>
      </div>
    </TrackerContextProvider>
  );
}
