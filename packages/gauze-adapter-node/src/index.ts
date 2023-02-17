import type { IncomingMessage, ServerResponse } from "http";
import type { GauzeRequest, GauzeHandler } from "gauze";

interface GauzeAdapterNodeProps {
  req: IncomingMessage;
  res: ServerResponse;
  handler: GauzeHandler;
}

export async function gauzeAdapterNode({ req, res, handler }: GauzeAdapterNodeProps): Promise<void> {
  try {
    const request: GauzeRequest = {
      method: req.method || "",
      url: new URL(req.url || "", `http://localhost`),
      headers: new Map(),
    };

    const response = await handler(request);

    if (!res.headersSent) {
      response.headers.forEach((val, key) => res.setHeader(key, val));
      res.statusCode = response.status;
      res.end(response.body);
    }
  } catch (e) {
    console.error(e);

    if (!res.headersSent) {
      res.statusCode = 500;
      res.end((e as Error).stack);
    }
  }
}
