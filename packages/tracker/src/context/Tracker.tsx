import * as React from "react";
import useStateWithOverride from "utils/useStatewithOverride";
import dayjs from "dayjs";

type TrackerContextProps = {
  children: React.ReactNode;
  initialSidebarWidth?: number;
  canvasBounds: { width: number; height: number };
};

type TrackerContext = {
  sidebarWidth: number;
  xPosition: number;
  setXPosition: React.Dispatch<React.SetStateAction<number>>;
  rangeInYears: number;
  setRangeInYears: (value: number) => void;
  dayWidth: number;
  canvasBounds: { width: number; height: number };
  getXPoint: (date: Date) => number;
};

const TrackerContext = React.createContext<TrackerContext>({
  sidebarWidth: 0,
  xPosition: 0,
  setXPosition: (value) => {},
  rangeInYears: 1,
  setRangeInYears: (value: number) => {},
  dayWidth: 10,
  canvasBounds: { width: 0, height: 0 },
  getXPoint: () => 0,
});

export function TrackerContextProvider({
  children,
  canvasBounds,
}: TrackerContextProps) {
  const [sidebarWidth, setSidebarWidth] = useStateWithOverride(250);
  const [xPosition, setXPosition] = React.useState(0);
  const [rangeInYears, setRangeInYears] = React.useState(1);
  const now = React.useMemo(() => dayjs(), []);
  const dayWidth = 10;
  const rangeInDays = rangeInYears * 365;

  const currentDay = React.useMemo(() => {
    const pos = xPosition / dayWidth;
    if (isNaN(pos)) {
      return 0;
    }
    return Math.floor(-pos);
  }, [xPosition]);

  React.useMemo(() => {
    if (currentDay > rangeInDays * 0.66 || currentDay < -rangeInDays * 0.66) {
      // add another year!
      setRangeInYears((current) => current + 1);
    }
  }, [currentDay]);

  const getXPoint = React.useCallback(
    (date: Date) => {
      const days = dayjs(date).diff(now, "days");
      return days * dayWidth;
    },
    [now, dayWidth]
  );

  return (
    <TrackerContext.Provider
      value={{
        sidebarWidth,
        setXPosition,
        xPosition,
        rangeInYears,
        setRangeInYears,
        dayWidth,
        canvasBounds,
        getXPoint,
      }}
    >
      {children}
    </TrackerContext.Provider>
  );
}

export default TrackerContext;
