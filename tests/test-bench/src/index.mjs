//@ts-check

import { suite, add, cycle, complete, save } from "benny";
import { render, createElement } from "gauze";

const children = [];

for (let i = 0; i < 1000; i++) {
  children.push(
    createElement("h1", { className: "text-lg" }, "Hello, World!", createElement("span", {}, ["second", "child", i]))
  );
}

const Main = () => createElement("main", { className: "test" }, ...children);

suite(
  "Render Bench",

  add("render", () => {
    render(Main());
  }),

  // add("render async", async () => {
  //   await renderAsync(Main());
  // }),

  cycle(),
  complete()
);
