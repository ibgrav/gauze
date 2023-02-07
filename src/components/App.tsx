import { count } from "../signals";

export function App() {
  return (
    <main>
      <h1>Hello World!</h1>
      <button className="border-2 px-4 py-1" onClick={() => count.value++}>
        {count}
      </button>
    </main>
  );
}
