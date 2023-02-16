import { renderToString, defineComponent, addComponentListeners } from "gauze";

interface ButtonProps {
  count: number;
}

const Button = defineComponent<ButtonProps>("button", ({ count }) => {
  return <button>{count}</button>;
});

console.log(<Button count={0} />);

const Message = ({ count }: { count: number }) => (
  <pre className="text-lg">
    <span style={{ color: "red", fontFamily: "arial" }}>message</span> {count}
  </pre>
);

export const Main = () => (
  <>
    <Button count={0} />
    <h1>Hello, World!</h1>
    <main>
      {[...Array(10)].map((_, i) => (
        <Message count={i} />
      ))}
    </main>
  </>
);

function renderToRoot() {
  const result = renderToString(<Main />);
  document.getElementById("root")!.innerHTML = result;

  addComponentListeners();
}

document.getElementById("render")?.addEventListener("click", renderToRoot);
