import type * as JSX from "./types";
import { voidTags } from "./constants";
import { isJSX } from "./jsx";

export const render = (value: unknown): string => {
  if (typeof value === "string") return value;
  if (typeof value === "number") return value + "";

  if (Array.isArray(value)) {
    if (isJSX(value)) return renderElementToString(value);
    return value.map((value) => render(value)).join("");
  }

  return "";
};

const renderElementToString = (value: JSX.Element): string => {
  if (typeof value[1] === "string") {
    if (voidTags.includes(value[1])) {
      return `<${value[1] + renderPropsToString(value[2])}/>`;
    }

    if (value[2].children) {
      return `<${value[1] + renderPropsToString(value[2])}>${render(value[2].children)}</${value[1]}>`;
    }

    return `<${value[1] + renderPropsToString(value[2])}></${value[1]}>`;
  }

  if (typeof value[1] === "function") {
    return renderElementToString(value[1](value[2]));
  }

  return "";
};

const renderPropsToString = (props: JSX.Props<unknown>): string => {
  return Object.entries(props).reduce((previous, [key, value]) => {
    if (key !== "children") {
      if (typeof value === "string" || typeof value === "number") {
        if (previous) return previous + ` ${key}="${value}"`;
        return ` ${key}="${value}"`;
      }
    }

    return previous;
  }, "");
};
