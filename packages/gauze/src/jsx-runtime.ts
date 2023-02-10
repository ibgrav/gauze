import * as JSX from "./jsx";
export { type JSX };

export const IS_JSX = Symbol("jsx");

export const jsx = (type: JSX.Type = "", props: JSX.Props<unknown> = {}): JSX.Element => {
  return [IS_JSX, type, props];
};

export const jsxs = jsx;
export const jsxDev = jsx;

export const Fragment = (props: { children: unknown }): JSX.Children => {
  return props?.children as JSX.Children;
};
