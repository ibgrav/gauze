import "./main.css";

import { render } from "preact";
import { App } from "./components/App";

const root = document.getElementById("root")!;

render(<App />, root);
