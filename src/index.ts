import bodyParser from "body-parser";
import express, { Request, Response } from "express";
import { config } from "./configs";
import mongoose from "mongoose";
import { GetAttendeeByEmailController, RegisterController } from "./controllers/RegistrationController";
import { attendeeSignupValidator, emailLoginValidator } from "./validators/authValidators";

const cors = require("cors");

const app = express();
const port = config.app.PORT;

//configs
app.use(bodyParser.json());
app.use(cors({ origin: "*" }));

// handle malformed json body
app.use((err: any, req: Request, res: Response, next: any) => {
  if (err) {
    return res.status(400).send("Invalid JSON payload passed.");
  }
  next();
});

app.post("/gdg/register", attendeeSignupValidator, RegisterController);
app.post("/gdg/participant", emailLoginValidator, GetAttendeeByEmailController);


app.all("/health", (req: Request, res: Response) => {
  res.status(200).send({
    message: "Service is up and running",
  });
});

// handle 404s
app.use((req: Request, res: Response) => {
  res.status(404).send({
    message: "URL Not found",
  });
});

mongoose
  .connect(config.db.MONGO_URI, {
    dbName: config.db.DB_NAME,
  })
  .then(() => console.log("connected to mongodb"))
  .catch((err) => console.log("error occured connecting to mongodb", err));

app.listen(port, () => {
  console.log(`Message service listening at ${port}`);
});

process.on("beforeExit", (code) => {
  // Can make asynchronous calls
  setTimeout(() => {
    console.log(`Process will exit with code: ${code}`);
    process.exit(code);
  }, 100);
});
process.on("uncaughtException", (err) => {
  console.log(`Uncaught Exception: ${err.message}`);
  process.exit(1);
});

process.on("exit", (code) => {
  // Only synchronous calls
  console.log(`Process exited with code: ${code}`);
});
