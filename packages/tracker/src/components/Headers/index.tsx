import * as React from "react";
import CalendarHeaders from "./Calendar";
import SidebarHeader from "./Sidebar";

export default function Headers({ height }: { height: number }) {
  return (
    <div style={{ height }} className="flex">
      <SidebarHeader />
      <CalendarHeaders />
    </div>
  );
}
