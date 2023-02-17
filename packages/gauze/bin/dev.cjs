//@ts-check

const { join } = require("path");
const { Server } = require("http");
const { createServer: createViteServer } = require("vite");
const { gauzeAdapterNode } = require("gauze-adapter-node");
const { gauzeRenderReactNode } = require("gauze-render-react-node");
const glob = require("fast-glob");

const root = process.cwd();

const [, , ...args] = process.argv;

const portArg = args.indexOf("-p");

/** @type {number} */
const port = portArg > -1 ? parseInt(args[portArg + 1]) : 5172;

createServer();

async function createServer() {
  const vite = await createViteServer({
    root,
    appType: "custom",
    server: { middlewareMode: true },
  });

  const server = new Server((req, res) => {
    vite.middlewares(req, res, async () => {
      try {
        const routes = await glob(join(root, "src/routes/**/*"));

        const route = (await vite.ssrLoadModule(routes[0])).default;

        /** @type {import('../src/types').GauzeHandler} */
        const devHandler = async (request) => {
          /** @type {import('../src/types').GauzeResponse} */
          const response = { status: 404, headers: new Map(), body: "" };

          await gauzeRenderReactNode({ request, response, Document: route() });

          if (response.body && response.headers.get("content-type") === "text/html") {
            response.body = await vite.transformIndexHtml(request.url.pathname, response.body);
          }

          return response;
        };

        await gauzeAdapterNode({ req, res, handler: devHandler });
      } catch (e) {
        if (e instanceof Error) {
          vite.ssrFixStacktrace(e);
          console.error(e);

          if (!res.headersSent) {
            res.statusCode = 500;
            res.setHeader("content-type", "text/plain");
            res.end(e.stack);
          }
        }
      }
    });
  });

  server.listen(port, () => console.log(`❤️‍🩹 http://localhost:${port}/ ❤️‍🩹\n`));

  process.on("SIGINT", async () => {
    server.close();
    process.exit(0);
  });
}
