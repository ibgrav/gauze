//@ts-check

import express from "express";
import bodyParser from "body-parser";
import { createServer } from "vite";

const vite = await createServer({
  server: { middlewareMode: true },
  optimizeDeps: { include: [] },
  appType: "custom",
});

const app = express();

app.use(bodyParser.json());
app.use(vite.middlewares);

app.post("/component/*", (req, res) => {
  const { name, props } = req.body;

  props.count += 1;

  res.json({ name, props });
});

app.use("/", async (req, res) => {
  const props = { count: 0 };

  const { default: button } = await vite.ssrLoadModule("/src/button.ts");

  let template = `<!DOCTYPE html>
<html>
    <head></head>
    <body>
        <h1>Hello, World!</h1>

        <div id="root">
            ${button(props)}
        </div>

        <script type="module" src="/src/main.ts"></script>
    </body>
</html>`;

  template = await vite.transformIndexHtml(req.originalUrl, template);

  res.status(200).set({ "Content-Type": "text/html" }).end(template);
});

const server = app.listen(5173, () => {
  console.log("http://localhost:5173/");
});

process.on("SIGINT", () => {
  server.close();
  process.exit(0);
});
