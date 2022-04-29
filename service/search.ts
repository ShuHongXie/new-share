import axios from "./config";
import { RequestConfig } from "@/entity/service/index.d";
import { GetServerSidePropsContext } from "next";

// 首页推荐商品数据（新的）
export const getSearhKeyInfo = (
  data: any,
  ctx?: GetServerSidePropsContext
): Promise<any> =>
  axios.post("/rigPortal/wbshare/homeMainFt/getSearhKeyInfo", data, {
    headers: { gateway: true },
    ctx,
  } as RequestConfig);

// 商品搜索
export const getSearchList = (
  params: any,
  ctx?: GetServerSidePropsContext
): Promise<any> =>
  axios.get("/rigPortal/wbshare/share/v3/search", {
    params,
    headers: { gateway: true },
    ctx,
  } as RequestConfig);

// 高级筛选框的数据
export const getSearhConditionInfo = (
  params: any,
  ctx?: GetServerSidePropsContext
): Promise<any> =>
  axios.get("/rigPortal/wbshare/search/v4/getSearchAdvancedFilter", {
    params,
    headers: { gateway: true },
  } as RequestConfig);
