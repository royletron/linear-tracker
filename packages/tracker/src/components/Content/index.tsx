import TrackerContext from "context/Tracker";
import Sidebar from "components/Sidebar";
import Marker from "components/Marker";
import { useContext, useRef } from "react";

export default function Content({ children }: { children: React.ReactNode }) {
  const contentRef = useRef<HTMLDivElement>(null);
  const { xPosition, setXPosition, sidebarWidth } = useContext(TrackerContext);
  const onScroll = (e: any) => {
    setXPosition((current: number) => (current || 0) - e.deltaX);
  };
  return (
    <div
      style={{
        flex: 1,
        position: "relative",
        overflowX: "hidden",
        overscrollBehaviorX: "none",
        willChange: "transform",
      }}
      onWheel={onScroll}
    >
      <Sidebar />
      <div
        ref={contentRef}
        className="overflow-x-visible z-10 absolute inset-0"
      >
        {children}
        <div
          style={{
            height: "100%",
            position: "absolute",
            left: `${sidebarWidth}px`,
            right: 0,
            top: 0,
            bottom: 0,
            overflow: "hidden",
            pointerEvents: "none",
          }}
        >
          <Marker xPosition={xPosition} />
        </div>
      </div>
    </div>
  );
}
