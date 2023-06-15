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
    const packagePath = require.resolve("local-client/build/index.html");
    app.use(express.static(path.dirname(packagePath)));
  }

  app.use(createCellsRouter(filename, dir));

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
