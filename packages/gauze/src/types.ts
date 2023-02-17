export interface GauzeRequest {
  url: URL;
  method: string;
  headers: Map<string, string>;
  // optional
  body?: unknown;
}

export interface GauzeResponse {
  body: string;
  status: number;
  headers: Map<string, string>;
}

export type GauzeHandler = (request: GauzeRequest) => GauzeResponse | Promise<GauzeResponse>;
