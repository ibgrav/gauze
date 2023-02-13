import type * as JSX from "./types";

export const JsxSymbol = Symbol("jsx");

export const isJSX = (value: Array<unknown>): value is JSX.Element => value[0] === JsxSymbol;

export const jsx = (type?: JSX.Type, props?: JSX.Props<unknown>): JSX.Element => {
  return [JsxSymbol, type || "", props || {}];
};

export const Fragment = (props: JSX.InherentProps): JSX.Children => {
  return props?.children;
};

export const h = (type: JSX.Type, props: JSX.Props<unknown>, ...children: Array<JSX.Children>) => {
  if (children.length > 0) props.children = children as JSX.Children;
  return jsx(type, props);
};
