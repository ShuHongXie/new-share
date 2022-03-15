/*
 * @Author: 谢树宏
 * @Date: 2022-03-10 14:21:32
 * @LastEditors: 谢树宏
 * @LastEditTime: 2022-03-15 16:54:20
 * @FilePath: /new-share/server/index.js
 */
const Koa = require("koa");
const next = require("next");
const Router = require("@koa/router");
const config = require("../config");
// 接口反向代理
const { createProxyMiddleware } = require("http-proxy-middleware");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const cache = require("./middleware/cache");

console.log(app, "---");

app.prepare().then(() => {
  const server = new Koa();
  const router = new Router();

  if (process.env.NODE_ENV === "production") {
    server.use(
      "/sharemapi/recycleapi/",
      createProxyMiddleware({
        target: config.API.recycle[process.env.NODE_ENV],
        changeOrigin: true,
      })
    );
  }

  router.all("(.*)", async (ctx) => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
  });

  server.use(cache);

  server.use(async (ctx, next) => {
    ctx.res.statusCode = 200;
    await next();
  });

  server.use(router.routes());
  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
