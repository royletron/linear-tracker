import * as React from "react";
import dayjs from "dayjs";
import TrackerContext from "context/Tracker";
import getRelativeCoordinates from "utils/getRelativeCoordinates";
import useStateWithOverride from "utils/useStatewithOverride";
import { RowContext } from "components/Row";

const PADDING = 5;

function SausageComponent({
  from,
  to,
  text,
}: {
  from: Date;
  to: Date;
  text: string;
}) {
  const { dayWidth, xPosition, canvasBounds, sidebarWidth, getXPoint } =
    React.useContext(TrackerContext);

  const DRAGWIDTH = dayWidth;
  const rowHeight = React.useContext(RowContext);
  const [localFrom, setLocalFrom] = useStateWithOverride(from);
  const [localTo, setLocalTo] = useStateWithOverride(to);
  const labelRef = React.useRef<HTMLDivElement>(null);
  const leftRef = React.useRef<HTMLDivElement>(null);
  const rightRef = React.useRef<HTMLDivElement>(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  const left = React.useMemo(() => getXPoint(localFrom), [localFrom, dayWidth]);
  const width = React.useMemo(
    () => getXPoint(localTo) - left,
    [left, localTo, dayWidth]
  );
  React.useEffect(() => {
    if (labelRef.current) {
      const spanWidth = labelRef.current.getBoundingClientRect().width;
      setLabelWidth(spanWidth);
    }
  }, []);
  const spanLeft = React.useMemo(() => {
    const boundaryLeft = -xPosition - (canvasBounds.width - sidebarWidth) / 2;
    const diff = boundaryLeft - left;
    if (diff < 0) {
      return 0;
    } else if (diff > 0) {
      if (diff > width - labelWidth) {
        return width - labelWidth;
      }
      return diff;
    }
  }, [left, xPosition, canvasBounds.width]);
  const [dragging, setDragging] = React.useState(false);
  const onRightMove = React.useCallback(
    (e) => {
      const coords = getRelativeCoordinates(e, rightRef.current);
      setLocalTo((current) => {
        return dayjs(current)
          .add(Math.floor((coords.x - xPosition) / dayWidth), "days")
          .toDate();
      });
    },
    [setLocalTo, xPosition]
  );
  const onLeftMove = React.useCallback(
    (e) => {
      const coords = getRelativeCoordinates(e, leftRef.current);
      setLocalFrom((current) =>
        dayjs(current)
          .add(Math.floor((coords.x - xPosition) / dayWidth), "days")
          .toDate()
      );
    },
    [setLocalFrom, xPosition]
  );
  const rightDown = () => {
    const onUp = () => {
      window.removeEventListener("mousemove", onRightMove);
      window.removeEventListener("mouseup", onUp);
      setDragging(false);
    };
    setDragging(true);
    window.addEventListener("mousemove", onRightMove);
    window.addEventListener("mouseup", onUp);
  };
  const leftDown = () => {
    setDragging(true);
    const onUp = () => {
      setDragging(false);
      window.removeEventListener("mousemove", onLeftMove);
      window.removeEventListener("mouseup", onUp);
    };
    window.addEventListener("mousemove", onLeftMove);
    window.addEventListener("mouseup", onUp);
  };
  const leftTotal = left - DRAGWIDTH;
  const widthTotal = width + 2 * DRAGWIDTH;
  return (
    <div
      className="relative bg-base-200 rounded-md overflow-hidden"
      style={{
        left: leftTotal,
        width: widthTotal,
        top: PADDING,
        height: rowHeight - PADDING * 2,
      }}
    >
      <div
        className="absolute cursor-col-resize bg-primary"
        style={{
          height: rowHeight - PADDING * 2,
          width: DRAGWIDTH,
          left: 0,
        }}
        ref={leftRef}
        onMouseDown={leftDown}
      />
      <div
        className="absolute"
        style={{
          position: "absolute",
          height: rowHeight - PADDING * 2,
          width,
          left: DRAGWIDTH,
        }}
      >
        <span
          className="absolute whitespace-nowrap inline-block overflow-x-hidden overflow-ellipsis"
          style={{
            left: spanLeft,
            padding: "0px 4px",
            maxWidth: width - 8,
            userSelect: dragging ? "none" : "auto",
            lineHeight: `${rowHeight - PADDING * 2}px`,
          }}
          ref={labelRef}
        >
          {text}
        </span>
      </div>
      <div
        className="absolute cursor-col-resize bg-primary"
        style={{
          height: rowHeight - PADDING * 2,
          width: DRAGWIDTH,
          left: width + DRAGWIDTH,
        }}
        ref={rightRef}
        onMouseDown={rightDown}
      />
    </div>
  );
}

export const Sausage = React.memo(SausageComponent);
