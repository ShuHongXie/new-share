import axios from "./config";
import { RequestConfig } from "@/entity/service/index.d";
import { Brand } from "@/entity/service/brand.d";
import { GetServerSidePropsContext } from "next";

// 商品详情中，同款不同价推荐(为您推荐)
export const listRecommend = (
  params: any,
  ctx?: GetServerSidePropsContext
): Promise<Brand[]> =>
  axios.get("/rigPortal/wbshare/luxurySearch/listRecommendV2", {
    params,
    headers: { gateway: true },
    ctx,
  } as RequestConfig);

// 商品详情中，同款不同价推荐(相关新表)
export const listRecommendNewGoods = (
  params: any,
  ctx?: GetServerSidePropsContext
): Promise<Brand[]> =>
  axios.get("/rigPortal/wbshare/luxurySearch/listRecommendNewGoods", {
    params,
    headers: { gateway: true },
    ctx,
  } as RequestConfig);

// 商品详情数据
export const getGoodDetail = (
  params: any,
  ctx?: GetServerSidePropsContext
): Promise<Brand[]> =>
  axios.get("/recycleapi/recycle/shareForFront/get", {
    params,
    headers: { gateway: true },
    ctx,
  } as RequestConfig);
