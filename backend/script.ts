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

const movieDataSchema = z.array(
  z.object({
    id: z.number(),
    actor_actress: z.string(),
    role: z.string(),
    gender: z.string()
})
)

const actorActressSchema = z.array(
  z.object({
    actor_actress: z.string()
  })
)

const roleSchema = z.array(
  z.object({
    role: z.string()
  })
)

//----------------------The Full Database--------------------------------------
server.get("/darkknightcast", async (req: Request, res: Response) => {
  const data = await client.query("SELECT * FROM darkknightcast");
  const result = movieDataSchema.safeParse(data.rows)

  if(!result.success) 
    res.sendStatus(400) 
  else 
    res.json(result.data)
});

//--------------------------Request ID-----------------------------------------
server.get("/darkknightcast/actoractress/:id", async (req: Request, res: Response) => {
  const id = +req.params.id
  
  const data = await client.query(`SELECT * FROM darkknightcast WHERE id='${id}';`,[]);
  const result = movieDataSchema.safeParse(data.rows)

  if(!result.success) 
    res.sendStatus(400) 
  else 
    res.json(result.data)
});
//---------------------------Actor/Actress-------------------------------------
server.get("/darkknightcast/actoractress", async (req: Request, res: Response) => {
  const data = await client.query(`SELECT actor_actress FROM darkknightcast;`, []);
  const result = actorActressSchema.safeParse(data.rows)

  if(!result.success)
    res.sendStatus(400)
  else
    res.json(result.data)
});
//-----------------------------------Role-------------------------------------------
server.get("/darkknightcast/role", async (req: Request, res: Response) => {
  const data = await client.query(`SELECT role FROM darkknightcast;`, []);
  const result = roleSchema.safeParse(data.rows)

  if(!result.success)
    res.sendStatus(400)
  else
    res.json(result.data)
});
//---------------------------------Gender: male------------------------------------
server.get("/darkknightcast/actors", async (req: Request, res: Response) => {
  const data = await client.query(`SELECT * FROM darkknightcast WHERE gender='male';`,[]);
  const result = movieDataSchema.safeParse(data.rows)

  if(!result.success) 
    res.sendStatus(400) 
  else 
    res.json(result.data)
});
//----------------------------------Gender: female-------------------------------------
server.get("/darkknightcast/actress", async (req: Request, res: Response) => {
  const data = await client.query(`SELECT * FROM darkknightcast WHERE gender='female';`,[]);
  const result = movieDataSchema.safeParse(data.rows)

  if(!result.success) 
    res.sendStatus(400) 
  else 
    res.json(result.data)
});
//---------------------------INSERT new Actor/Actress, Role, Gender-----------------------
server.post("/darkknightcast", async (req: Request, res: Response) => {

});
//UPDATE



client.connect().then(() => server.listen(3333));
