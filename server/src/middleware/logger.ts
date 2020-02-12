import { Context, Next } from "koa";

async function logger(ctx: Context, next: Next) {
  const url = ctx.url;
  const method = ctx.method;
  let now = new Date();
  console.log(`-> ${now.toLocaleString()} - ${url} - ${method}`);
  // console.log(ctx.request);
  await next();
}

export default logger;
