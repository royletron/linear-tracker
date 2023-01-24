import { Row, RowMain, RowSide, Sausage, Tracker } from "tracker";
import data from "../data/tracker";

import "tracker/styles.css";

export default function Web() {
  return (
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
  );
}
