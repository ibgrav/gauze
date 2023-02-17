import { useState } from "react";

export function Button() {
  const [count, setCount] = useState(0);

  const increment = () => setCount((c) => c + 1);

  return <button onClick={increment}>Count: {count}</button>;
}
