import express from "express";
import path from "path";
import { createProxyMiddleware } from "http-proxy-middleware";
import { createCellsRouter } from "./routes/cells";

export const serve = (
  port: number,
  filename: string,
  dir: string,
  useProxy: boolean
) => {
  const app = express();

  app.use(createCellsRouter(filename, dir));

  if (useProxy) {
    app.use(
      createProxyMiddleware({
        target: "http://127.0.0.1:3000",
        ws: true,
        secure: false,
        logLevel: "silent",
      })
    );
  } else {
    const packagePath = require.resolve(
      "@ts-bas-cli/local-client/build/index.html"
    );
    app.use(express.static(path.dirname(packagePath)));
  }

  return new Promise<void>((resolve, reject) => {
    app
      .listen(
        port,
        resolve
        //   () => {
        //   console.log("Listening on port: ", port);
        //   resolve();
        // }
      )
      .on("error", reject);
  });
};
