import Marker from "components/Marker";
import TrackerContext from "context/Tracker";
import dayjs from "dayjs";
import * as React from "react";

export default function CalendarHeaders() {
  const { dayWidth, rangeInYears, xPosition, sidebarWidth } =
    React.useContext(TrackerContext);
  const [years, setYears] = React.useState(() => [
    <Year
      start={dayjs().format("YYYY-MM-DD")}
      key={dayjs().format("YYYY-MM-DD")}
      dayWidth={dayWidth}
    />,
    <Year
      start={dayjs().subtract(1, "year").format("YYYY-MM-DD")}
      key={dayjs().subtract(1, "year").format("YYYY-MM-DD")}
      dayWidth={dayWidth}
    />,
  ]);
  React.useMemo(() => {
    if (rangeInYears > 1) {
      setYears((current) => [
        ...current,
        <Year
          start={dayjs().subtract(rangeInYears, "year").format("YYYY-MM-DD")}
          dayWidth={dayWidth}
        />,
        <Year
          start={dayjs()
            .add(rangeInYears - 1, "year")
            .format("YYYY-MM-DD")}
          dayWidth={dayWidth}
        />,
      ]);
    }
  }, [rangeInYears]);
  return (
    <div className="flex-1 relative overflow-hidden bg-base-200">
      <Marker xPosition={xPosition} />
      <div style={{ position: "absolute", left: "50%" }}>
        <div
          style={{
            transform: `translate(${xPosition}px, 0px)`,
            position: "relative",
          }}
        >
          {years}
        </div>
      </div>
    </div>
  );
}

const Year = React.memo(function MemoYear({
  start,
  dayWidth,
}: {
  start: string;
  dayWidth: number;
}) {
  const date = dayjs(start);
  const today = dayjs();
  const diff = today.diff(date, "days");
  return (
    <div
      style={{
        position: "absolute",
        left: -diff * dayWidth,
      }}
    >
      {new Array(dayjs(start).add(1, "year").diff(date, "days"))
        .fill(undefined)
        .map((v, idx) => {
          const d = date.clone().add(idx, "days");
          const id = d.format("YYYY-MM-DD");
          return (
            <React.Fragment key={`header_${id}`}>
              {d.date() === 1 && (
                <div
                  key={`day_${id}`}
                  style={{
                    position: "absolute",
                    left: idx * dayWidth,
                    top: 0,
                    width: "200px",
                  }}
                >
                  {d.month() === 0 ? d.format("YYYY MMMM") : d.format("MMMM")}
                </div>
              )}
              {d.day() === 1 && (
                <div
                  key={`month_${id}`}
                  style={{
                    position: "absolute",
                    left: idx * dayWidth,
                    top: 22,
                  }}
                >
                  {d.date()}
                </div>
              )}
            </React.Fragment>
          );
        })}
    </div>
  );
});
