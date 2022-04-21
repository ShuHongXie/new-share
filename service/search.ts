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
