import Koa, { Context } from "koa";
import bodyParser from "koa-bodyparser";
import serve from "koa-static";
import cors from "@koa/cors";
import jwt from "koa-jwt";
import { createConnection } from "typeorm";
import path from "path";
import logger from "./middleware/logger";
import router from "./route";
import errorHanlder from "./middleware/errorHandler";

const staticPath: string = "../build";
const dbName: string = process.env.NODE_ENV === "production" ? "prod" : "test";
const origin: string =
  process.env.NODE_ENV == "production"
    ? "http://localhost:9000"
    : "http://localhost:3000";

createConnection(dbName)
  .then(connection => {
    const app = new Koa();
    // check the env and allow which port will be access
    app.use(
      cors({
        origin
      })
    );

    // use middlewares
    app.use(bodyParser());
    app.use(logger);
    app.use(errorHanlder);
    app.use(
      jwt({ secret: "react-koa-secret" }).unless({
        path: [/^\//, /^\/api\/v1\/user\/login/, /^\/api\/v1\/user\/register/]
      })
    );

    // if env is production, use the static files
    if (process.env.NODE_ENV === "production") {
      app.use(serve(path.join(__dirname, staticPath)));
      app.use(async (ctx, next) => {
        ctx.body = path.join(__dirname, staticPath, "index.html");
        await next();
      });
    }

    app.use(router.routes()).use(router.allowedMethods());
    // listening on port 9000
    app.listen(9000, () => {
      console.log(`working on ${process.env.NODE_ENV} env`);
      console.log("Server is running on http://127.0.0.1:9000");
    });
  })
  .catch(err => {
    console.log("Connect to db failed");
    console.error(err);
  });
