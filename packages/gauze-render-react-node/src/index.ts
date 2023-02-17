import type { GauzeRequest, GauzeResponse } from "gauze";
import { Writable } from "stream";
import { renderToPipeableStream } from "react-dom/server";

interface GauzeRenderReactNodeProps {
  request: GauzeRequest;
  response: GauzeResponse;
  Document: JSX.Element;
}

export async function gauzeRenderReactNode({ response, Document }: GauzeRenderReactNodeProps) {
  return new Promise((resolve) => {
    const stream = new Writable({
      write(chunk) {
        response.body += chunk.toString();
      },
    });

    const { pipe } = renderToPipeableStream(Document, {
      onAllReady() {
        pipe(stream);

        response.headers.set("content-type", "text/html");
        response.status = 200;

        resolve(true);
      },
    });
  });
}
