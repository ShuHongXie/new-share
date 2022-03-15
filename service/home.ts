/*
 * @Author: 谢树宏
 * @Date: 2022-03-15 17:15:25
 * @LastEditors: 谢树宏
 * @LastEditTime: 2022-03-15 17:33:54
 * @FilePath: /new-share/service/home.ts
 */
import axios from "./config";
import { RequestConfig } from "./config/index.d";
import { GetServerSidePropsContext } from "next";

// 首页数据
export const getHomeDataNew = (params: any, ctx?: GetServerSidePropsContext) =>
  axios.get(
    "http://localhost:3000/rigPortal/mall/manage/homeTemplate/templateV3",
    {
      params,
      headers: { gateway: true },
      ctx,
    } as RequestConfig
  );
