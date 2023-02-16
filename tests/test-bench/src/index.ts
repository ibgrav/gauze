#!/usr/bin/env ts-node

import { suite, add, cycle, complete } from "benny";

import { renderToString as gauzeRender, h as gauzeCreateElement } from "gauze";

// import { h as preactCreateElement } from "preact";
// import { render as preactRender } from "preact-render-to-string";

// import { createElement as reactCreateElement } from "react";
// import { renderToStaticMarkup as reactRender } from "react-dom/server";

// import { Fragment as InferoFragment } from "inferno";
import { h as infernoCreateElement } from "inferno-hyperscript";
import { renderToString as infernoRender } from "inferno-server";

// import { default as solidCreateElement } from "solid-js/h";
// import { renderToString as solidRender } from "solid-js/web";

function createElement(h: any) {
  const children: Array<JSX.Element> = [];

  for (let i = 0; i < 1000; i++) {
    children.push(
      h(
        "h1",
        { className: "test-one test-two" },
        "Hello, World!",
        h("span", { style: { color: "red" } }, ["second", "child", i, [], []])
      )
    );
  }

  return h("div", {}, h("main", { className: "test" }, ...children));
}

suite(
  "Render Bench",

  add("gauze", () => {
    gauzeRender(createElement(gauzeCreateElement));
  }),

  // add("react", () => {
  //   reactRender(createElement(reactCreateElement));
  // }),

  // add("preact", () => {
  //   preactRender(createElement(preactCreateElement));
  // }),

  add("inferno", () => {
    infernoRender(createElement(infernoCreateElement));
  }),

  // add("solid-js", () => {
  //   const result = solidRender(createElement(solidCreateElement));
  //   console.log(result);
  // }),

  cycle(),
  complete()
);
