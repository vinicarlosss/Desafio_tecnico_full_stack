import dotenv from "dotenv";
import path from "path";
import fs from 'fs';
import express from "express";
import bodyParser from "body-parser";
import  errorHandler  from "./Middlewares/ErrorHandler";
import cors from "cors";
import { corsOptions } from "./Config/CorsOptions";


const rootEnvPath = path.resolve(__dirname, "../../.env");
const apiEnvPath = path.resolve(__dirname, "../.env");
if(fs.existsSync(rootEnvPath)){
  dotenv.config({ path: rootEnvPath });
}else if (fs.existsSync(apiEnvPath)) {
  dotenv.config({ path: apiEnvPath });
}
import { router } from "./Routes/routes";
const app = express();
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(router);
app.use(errorHandler);
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });