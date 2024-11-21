import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { router } from "./Routes/routes";

dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use(router);
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });