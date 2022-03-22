import axios from "./config";
import { RequestConfig } from "@/entity/service/index.d";
// import { GetServerSidePropsContext } from "next";
import { Menu, EvokeData } from "@/entity/service/common.d";
// 获取公用底部栏
export const getSwitchTabbar = (params: any): Promise<Menu> =>
  axios.get("/rigPortal/wbshare/home/getBottomListByOs", {
    params,
    headers: { gateway: true },
  });

// 获取能否唤起app功能
export const getCanEvoke = (params: any): Promise<EvokeData> =>
  axios.get("/rigPortal/mall/manage/domain/getByDomainToRecycle", {
    params,
    headers: { gateway: true },
  });
