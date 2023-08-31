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

//----------------------The Full Database--------------------------------------
server.get("/darkknightcast", async (req: Request, res: Response) => {
  const data = await client.query("SELECT * FROM darkknightcast");
  const result = movieDataSchema.safeParse(data.rows)

  !result.success ? res.sendStatus(400) : res.json(result.data)
});

//--------------------------Request ID-----------------------------------------
server.get("/darkknightcast/:id", async (req: Request, res: Response) => {
  const id = +req.params.id
  
  const data = await client.query(`SELECT * FROM darkknightcast WHERE id='${id}';`,[]);
  const result = movieDataSchema.safeParse(data.rows)

  !result.success ? res.sendStatus(400) : res.json(result.data)
});

//---------------------------Actor/Actress-------------------------------------
server.get("/darkknightcast/actoractress", async (req: Request, res: Response) => {
  const data = await client.query(`SELECT actor_actress FROM darkknightcast";`, []);
  console.log(data)
 /* const result = movieDataSchema.safeParse(data.rows)

  !result.success ? res.sendStatus(400) : res.json(result.data)*/
});
//-----------------------------------Role-------------------------------------------
server.get("/darkknightcast/roles", async (req: Request, res: Response) => {

});
//---------------------------------Gender: male------------------------------------
server.get("/darkknightcast/actors", async (req: Request, res: Response) => {

});
//----------------------------------Gender: female-------------------------------------
server.get("/darkknightcast/actress", async (req: Request, res: Response) => {

});
//---------------------------INSERT new Actor/Actress, Role, Gender-----------------------
server.post("/darkknightcast", async (req: Request, res: Response) => {

});
//UPDATE



client.connect().then(() => server.listen(3333));
