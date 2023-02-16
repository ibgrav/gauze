import type * as JSX from "./types";
import { isJSX } from "./jsx";
import { voidTags } from "./void-tags";

const snakeCaseCache: Map<string, string> = new Map();

export const renderToString = (value: unknown): string => {
  if (typeof value === "string") return value;
  if (typeof value === "number") return value + "";

  if (Array.isArray(value) && value.length > 0) {
    if (isJSX(value)) {
      return elementToString(value);
    }

    const length = value.length;

    let result = "";

    for (let i = 0; i < length; i++) {
      result += renderToString(value[i]);
    }

    return result;
  }

  return "";
};

const elementToString = (value: JSX.Element): string => {
  if (typeof value[1] === "function") {
    return renderToString(value[1](value[2]));
  }

  if (voidTags.has(value[1])) {
    return `<${value[1]}${propsToString(value[2])}/>`;
  }

  return `<${value[1]}${propsToString(value[2])}>${renderToString(value[2].children)}</${value[1]}>`;
};

const propsToString = <P extends JSX.Props<unknown>, K extends keyof P>(props: P): string => {
  if (props === null || typeof props !== "object") return "";

  const keys = Object.keys(props);
  const length = keys.length;

  let result = "";

  for (let i = 0; i < length; i++) {
    if (keys[i] !== "children") {
      if (keys[i] === "style") {
        result += ` style="${styleToString(props[keys[i] as K])}"`;
      } else {
        result += ` ${keys[i] === "className" ? "class" : keys[i]}="${props[keys[i] as K]}"`;
      }
    }
  }

  return result;
};

const styleToString = (value: unknown): string => {
  if (typeof value !== "object" || value === null) return "";

  const keys = Object.keys(value);
  const length = keys.length;

  let result = "";

  for (let i = 0; i < length; i++) {
    result += `${result ? "; " : ""}${camelToSnakeCase(keys[i])}: ${value[keys[i] as keyof typeof value]}`;
  }

  return result;
};

const camelToSnakeCase = (value: string) => {
  const cached = snakeCaseCache.get(value);
  if (cached) return cached;

  const length = value.length;

  let result = "";

  for (let i = 0; i < length; i++) {
    const lower = value[i].toLowerCase();
    if (value[i] !== lower) result += `-${lower}`;
    else result += value[i];
  }

  snakeCaseCache.set(value, result);

  return result;
};

// const propValueToString = (value: unknown): string => {
//   if (value) {
//     if (typeof value === "string") return value;
//     if (typeof value === "number") return value + "";

//     if (Array.isArray(value)) {
//       return value.reduce<string>((previous: string, value: unknown) => {
//         if (!previous) return propValueToString(value);
//         return previous + " " + propValueToString(value);
//       }, "");
//     }

//     if (value !== null && typeof value === "object") {
//       return Object.entries(value).reduce<string>((previous, [key, value]) => {
//         if (value) {
//           if (!previous) return key;
//           return previous + " " + key;
//         }
//         return previous;
//       }, "");
//     }
//   }

//   return "";
// };
