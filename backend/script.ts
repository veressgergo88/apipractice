import express from "express";
import type { Request, Response } from "express";
import cors from "cors";
import { z } from "zod";
import { Client } from "pg";

const client = new Client(
  "postgres://veress.gergo88:S68naWfBXvpT@ep-bitter-snow-42313997.us-west-2.aws.neon.tech/neondb?options=project%3Dep-bitter-snow-42313997&sslmode=require"
);

const server = express();

server.use(cors());
server.use(express.json());

const darkKnightSchema = z.object({
    id : z.number(),
    actor_actress : z.string(),
    gender : z.string()
});

//The Full Database
server.get("/darkknightcast", async (req: Request, res: Response) => {
  const answer = await client.query("SELECT * FROM darkknightcast");

  res.json(answer.rows);
});

//Request ID
server.get("/darkknightcast/:id", async (req: Request, res: Response) => {
 
});

//SELECT(Get) Actor/Actress
server.get("/darkknightcast/actor&actress", async (req: Request, res: Response) => {
 
});
//SELECT(Get) Role
server.get("/darkknightcast/roles", async (req: Request, res: Response) => {
 
});
//SELECT(Get) Gender: male
server.get("/darkknightcast/actors", async (req: Request, res: Response) => {
 
});
//SELECT(Get) Gender: female
server.get("/darkknightcast/actress", async (req: Request, res: Response) => {
 
});
//INSERT(Post) new Actor/Actress, Role, Gender
server.post("/darkknightcast", async (req: Request, res: Response) => {
 
});
//UPDATE



client.connect().then(() => server.listen(3333));
