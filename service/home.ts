/*
 * @Author: 谢树宏
 * @Date: 2022-03-15 17:15:25
 * @LastEditors: 谢树宏
 * @LastEditTime: 2022-03-15 17:33:54
 * @FilePath: /new-share/service/home.ts
 */
import axios from "./config";


// 首页数据
export const getHomeDataNew = ({ params, ctx: }) =>
  axios.get("/rigPortal/mall/manage/homeTemplate/templateV3", {
    params,
    headers: { gateway: true },
    ctx,
  });
