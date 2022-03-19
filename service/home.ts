/*
 * @Author: 谢树宏
 * @Date: 2022-03-15 17:15:25
 * @LastEditors: 谢树宏
 * @LastEditTime: 2022-03-17 17:51:44
 * @FilePath: /new-share/service/home.ts
 */
import axios from "./config";
import { RequestConfig } from "@/entity/service/index.d";
import { GetServerSidePropsContext } from "next";

// 首页数据
export const getHomeDataNew = (params: any, ctx?: GetServerSidePropsContext) =>
  axios.get("/rigPortal/mall/manage/homeTemplate/templateV3", {
    params,
    headers: { gateway: true },
    ctx,
  } as RequestConfig);
