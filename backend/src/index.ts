import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

const app = express();
const prisma = new PrismaClient();
const port = 3001;

app.use(cors());
app.use(express.json());

app.get("/tasks", async (req: Request, res: Response) => {
  const tasks = await prisma.task.findMany();
  res.json(tasks);
});

app.get("/tasks/:id", async (req: Request, res: Response) => {
  const tasks = await prisma.task.findFirst();
  res.json(tasks);
});

app.post("/tasks", async (req: Request, res: Response) => {
  const task = await prisma.task.create({
    data: req.body,
  });
  res.json(task);
});

app.put('/tasks/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const task = await prisma.task.update({
        where: { id: parseInt(id) },
        data: req.body,
    });
    res.json(task);
});

app.delete('/tasks/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    await prisma.task.delete({
        where: { id: parseInt(id) },
    });
    res.sendStatus(204);
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});