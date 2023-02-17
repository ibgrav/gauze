import { GauzeResponse, GauzeHandler } from "./types";

export const handler: GauzeHandler = (request) => {
  const response: GauzeResponse = { status: 404, body: "Error: 404", headers: new Map() };

  response.status = 200;
  response.headers.set("content-type", "text/html");

  response.body = `<!DOCTYPE html><html>
<head>
  <title>Handler!</title>
</head>
<body>
  <pre>${JSON.stringify({ request }, null, 2)}</pre>
  <script type="module" src=""></script>
</body>
</html>`;

  return response;
};
