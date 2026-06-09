import express, { type Express } from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import router from "./routes";
import { logger } from "./lib/logger";
import { initTelegramBot } from "./services/telegram";
import { runSetup } from "./lib/setup";

const app: Express = express();

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

if (process.env.NODE_ENV === "production") {
  const __dirname_prod = path.dirname(fileURLToPath(import.meta.url));
  const staticPath =
    process.env.STATIC_PATH ||
    path.resolve(__dirname_prod, "../../bloum-cash/dist/public");

  app.use(express.static(staticPath));

  app.use((_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });
}

runSetup();
initTelegramBot();

export default app;
