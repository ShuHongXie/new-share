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
import {
  HomeData,
  PlaceholderItem,
  RecommendData,
} from "@/entity/service/home.d";

// 首页数据
export const getHomeDataNew = (
  params: any,
  ctx?: GetServerSidePropsContext
): Promise<HomeData> =>
  axios.get("/rigPortal/mall/manage/homeTemplate/templateV3", {
    params,
    headers: { gateway: true },
    ctx,
  } as RequestConfig);

// 首页搜索滚动占位
export const getRecommendTag = (params: any): Promise<PlaceholderItem[]> =>
  axios.get("/recycleapi/home/front/getByType", {
    params,
    headers: { gateway: true },
  } as RequestConfig);

// 首页推荐商品数据（新的）
export const getHomeRecommendList = (
  params: any,
  ctx?: GetServerSidePropsContext
): Promise<RecommendData> =>
  axios.get("/rigPortal/wbshare/share/searchRecommend", {
    params,
    headers: { gateway: true },
    ctx,
  } as RequestConfig);
