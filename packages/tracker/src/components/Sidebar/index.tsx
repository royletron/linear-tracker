import * as React from "react";
import TrackerContext from "context/Tracker";

// a simple 'underlay' to have a visible sidebar
export default function Sidebar() {
  const { sidebarWidth } = React.useContext(TrackerContext);
  return (
    <div
      className="border-r border-base-300 bg-base-300 overflow-y-hidden absolute top-0 left-0 bottom-0 pointer-events-none z-0"
      style={{
        width: sidebarWidth,
        zIndex: 0,
      }}
    ></div>
  );
}
