/*
 * @Author: 谢树宏
 * @Date: 2022-03-10 14:27:42
 * @LastEditors: 谢树宏
 * @LastEditTime: 2022-03-10 14:45:48
 * @FilePath: /new-share/server/middleware/cache.js
 */
async function cache(ctx, next) {
  ctx.set("cache-control", "no-store,max-age=0");
  await next();
}

module.exports = cache;
