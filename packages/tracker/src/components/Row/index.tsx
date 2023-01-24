import * as React from "react";
import TrackerContext from "context/Tracker";
import { createContext } from "react";

export const RowContext = createContext(30);

export function RowSide({ children }: { children: React.ReactNode }) {
  const { sidebarWidth } = React.useContext(TrackerContext);
  return (
    <div
      className="py-2 px-4 flex items-center"
      style={{ width: sidebarWidth }}
    >
      {children}
    </div>
  );
}

export function RowMain({ children }: { children: React.ReactNode }) {
  const { xPosition } = React.useContext(TrackerContext);
  return (
    <div className="flex-1 relative overflow-hidden">
      <div className="absolute left-1/2">
        <div
          className="relative"
          style={{
            transform: `translate(${xPosition}px, 0px)`,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export function Row({
  children,
  rowHeight = 50,
}: {
  children: React.ReactNode;
  rowHeight?: number;
}) {
  return (
    <RowContext.Provider value={rowHeight}>
      <div style={{ height: rowHeight }} className="w-full inline-flex z-10">
        {children}
      </div>
    </RowContext.Provider>
  );
}
