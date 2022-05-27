import http from "http";
import { get as httpsGet } from "https";

export type Get<T> = {
  headers: http.IncomingHttpHeaders;
  statusCode?: number;
  data: string;
  json: () => T;
};

const get = <T>(url: string): Promise<Get<T>> => {
  return new Promise((resolve, reject) => {
    const request = httpsGet(url, (response) => {
      let chunks = "";

      response.on("data", (chunk) => {
        chunks += chunk;
      });
      response.on("end", () =>
        resolve({
          headers: response.headers,
          statusCode: response.statusCode,
          data: chunks,
          json: () => JSON.parse(chunks),
        })
      );
      response.on("error", (err) => reject(err));
    });
    request.on("error", (err) => reject(err));
  });
};

export { get };
