import express, { Request, Response } from "express";
import fs from "fs/promises";
import path from "path";

interface Cell {
  id: string;
  content: string;
  type: "text" | "code";
}

export const createCellsRouter = (filename: string, dir: string) => {
  const router = express.Router();
  router.use(express.json());

  const fullPath = path.join(dir, filename);

  router.get("/cells", async (req: Request, res: Response) => {
    try {
      const result = await fs.readFile(fullPath, { encoding: "utf-8" });
      res.json(JSON.parse(result));
    } catch (error: any) {
      if (error.code === "ENOENT") {
        // create a file and add default cells
        await fs.writeFile(fullPath, "[]", { encoding: "utf-8" });
        res.json([]);
      } else {
        throw error;
      }
    }
  });

  router.post("/cells", async (req: Request, res: Response) => {
    const { cells }: { cells: Cell[] } = req.body;
    // serialize cells to the file
    await fs.writeFile(fullPath, JSON.stringify(cells), "utf-8");
    res.json({ status: 200, message: "ok" });
  });

  return router;
};
