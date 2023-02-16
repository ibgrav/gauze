import type * as JSX from "./types";
import { isJSX } from "./jsx";

export const addComponentListeners = () => {
  document.querySelectorAll<HTMLElement>("[data-component]").forEach((component) => {
    const name = component.dataset.component;
    const props = component.querySelector("script")?.innerText;

    console.log({ name, props });

    component.addEventListener("click", async () => {
      const res = await fetch(`/component/${name}`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name, props }),
      });

      const data = await res.json();

      console.log({ data });
    });
  });
};

export const defineComponent = <P>(name: string, component: JSX.Component<P>) => {
  return (props: JSX.Props<P>) => {
    const root = component(props);

    console.log(root);

    if (isJSX(root)) {
      const template = `<script type="application/json">${JSON.stringify(root[2])}</script>`;

      root[2].children = [template, root[2].children] as JSX.Children;
      root[2]["data-component"] = name;
    }

    console.log({ root });

    return root;
  };
};
