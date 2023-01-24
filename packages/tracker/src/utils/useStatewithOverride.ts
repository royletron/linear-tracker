import * as React from "react";

export default function useStateWithOverride<T>(
  initialAndOverride: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = React.useState(initialAndOverride);
  React.useMemo(() => setValue(initialAndOverride), [initialAndOverride]);
  return [value, setValue];
}
