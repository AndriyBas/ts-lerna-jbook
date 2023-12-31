import path from "path";
import { Command } from "commander";
import { serve } from "@ts-bas-cli/local-api";

const isProduction = process.env.NODE_ENV === "production";
// const isProduction = true; // cos 'createProxyMiddleware' doesn't work for 'localhost', but works for '127.0.0.1'

export const serveCommand = new Command()
  .command("serve [filename]")
  .description("Open a file for editing")
  .option("-p, --port <number>", "port to run server on", "4005")
  .action(
    async (filename: string = "notebook.js", options: { port: string }) => {
      const port = parseInt(options.port);
      if (isNaN(port) || port < 0 || port >= 65536) {
        console.log("port must be a number and should be >= 0 and < 65536");
        return;
      }
      try {
        const dir = path.join(process.cwd(), path.dirname(filename));
        const baseFilename = path.basename(filename);
        // console.log(dir);
        // console.log(baseFilename);
        await serve(port, baseFilename, dir, !isProduction);
        console.log(`Opened ${filename}. Navigate to http://localhost:${port}`);
      } catch (error: any) {
        if (error.code === "EADDRINUSE") {
          console.log(
            `Port ${port} is in use. Try running on a different port.`
          );
        } else {
          console.log("Error: ", error.message);
        }
        process.exit(1);
      }
    }
  );
