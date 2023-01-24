export default function Marker({ xPosition }: { xPosition: number }) {
  return (
    <div
      className="absolute left-1/2 top-0 bottom-0 bg-primary"
      style={{
        width: "1px",
        transform: `translate(${xPosition}px, 0px)`,
      }}
    />
  );
}
