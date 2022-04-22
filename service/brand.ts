import axios from "./config";
import { RequestConfig } from "@/entity/service/index.d";
import { Brand } from "@/entity/service/brand.d";
import { GetServerSidePropsContext } from "next";

// 首页推荐商品数据（新的）
export const listBrandSeriesByBrand = (
  data: any,
  ctx?: GetServerSidePropsContext
): Promise<Brand[]> =>
  axios.post("/rigPortal/common/search/listBrandSeriesByBrand", data, {
    headers: { gateway: true },
    ctx,
  } as RequestConfig);
