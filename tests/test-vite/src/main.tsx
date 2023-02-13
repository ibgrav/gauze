import { render } from "gauze";

const Message = () => (
  <h1 className="text-lg">
    Hello, World! <span>second child</span>
  </h1>
);

export const Main = () => (
  <main>
    <Message />
  </main>
);

console.log(<Main />);

const root = document.getElementById("root")!;
root.innerHTML = render(<Main />);
