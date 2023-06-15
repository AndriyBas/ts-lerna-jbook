"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serveCommand = void 0;
const path_1 = __importDefault(require("path"));
const commander_1 = require("commander");
const local_api_1 = require("@ts-bas-cli/local-api");
const isProduction = process.env.NODE_ENV === "production";
// const isProduction = true; // cos 'createProxyMiddleware' doesn't work for 'localhost', but works for '127.0.0.1'
exports.serveCommand = new commander_1.Command()
    .command("serve [filename]")
    .description("Open a file for editing")
    .option("-p, --port <number>", "port to run server on", "4005")
    .action((filename = "notebook.js", options) => __awaiter(void 0, void 0, void 0, function* () {
    const port = parseInt(options.port);
    if (isNaN(port) || port < 0 || port >= 65536) {
        console.log("port must be a number and should be >= 0 and < 65536");
        return;
    }
    try {
        const dir = path_1.default.join(process.cwd(), path_1.default.dirname(filename));
        const baseFilename = path_1.default.basename(filename);
        // console.log(dir);
        // console.log(baseFilename);
        yield (0, local_api_1.serve)(port, baseFilename, dir, !isProduction);
        console.log(`Opened ${filename}. Navigate to http://localhost:${port}`);
    }
    catch (error) {
        if (error.code === "EADDRINUSE") {
            console.log(`Port ${port} is in use. Try running on a different port.`);
        }
        else {
            console.log("Error: ", error.message);
        }
        process.exit(1);
    }
}));
