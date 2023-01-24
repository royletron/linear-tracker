import * as React from "react";
import TrackerContext from "context/Tracker";

export default function SidebarHeader() {
  const { sidebarWidth } = React.useContext(TrackerContext);
  return (
    <div
      className="bg-base-300"
      style={{ width: sidebarWidth, height: "100vh" }}
    ></div>
  );
}
