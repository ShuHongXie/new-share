import axios from "./config";
import { RequestConfig } from "@/entity/service/index.d";
// import { GetServerSidePropsContext } from "next";
import { Menu } from "@/entity/service/common.d";
// 获取公用底部栏
export const getSwitchTabbar = (params: any): Promise<Menu> =>
  axios.get("/rigPortal/wbshare/home/getBottomListByOs", {
    params,
    headers: { gateway: true },
  } as RequestConfig);
