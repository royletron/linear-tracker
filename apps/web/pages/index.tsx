import { Row, RowMain, RowSide, Sausage, Tracker } from "tracker";
import data from "../data/tracker";

import "tracker/styles.css";
import Link from "next/link";

export default function Web() {
  return (
    <div className="h-full flex flex-col">
      <div className="bg-base-300">
        <h1 className="text-2xl m-4">Linear style tracker</h1>
      </div>
      <div className="flex-1 relative">
        <Tracker>
          {data.map(({ name, from, to }, idx) => (
            <Row key={`row_${idx}`}>
              <RowSide>{name}</RowSide>
              <RowMain>
                <Sausage from={from} to={to} text={name} />
              </RowMain>
            </Row>
          ))}
        </Tracker>
      </div>
      <footer className="p-4 bg-base-200">
        <Link href="https://cv.royletron.dev" className="link">
          🧙‍♂️ Made by royletron
        </Link>
      </footer>
    </div>
  );
}
