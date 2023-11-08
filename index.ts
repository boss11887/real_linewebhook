import express from "express";
import bodyParser from "body-parser";
import { Request, Response } from "express";
import * as db from "./query";

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

app.post("/hook", (req: Request, res: Response) => {
  // All message events
  const events = req.body.events;
  console.log(events);
  console.log("===============");

  // UserID of Line API
  const UserId = req.body.events[0].source.userId;
  console.log("UserID = " + UserId);

  // User message of Line API
  const message = req.body.events[0].message.text;
  console.log("Message = " + message);

  console.log("-------------");
  console.log("hel12312lo");
  res.status(200).end();
});

app.get("/users", db.getUsers);
