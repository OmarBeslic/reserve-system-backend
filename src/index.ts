
import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import rateLimit from "express-rate-limit";
import router from "./routes";
import { config } from "./config";


const app = express();
const PORT = config.port || 8080;
const server = http.createServer(app);
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
  standardHeaders: true, 
  legacyHeaders: false, 
});

app.use(cors({
  credentials: true,
}));

app.use(limiter);
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

app.use("/", router());

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
