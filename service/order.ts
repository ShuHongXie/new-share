import axios from "./config";
import { RequestConfig } from "@/entity/service/index.d";
import { Brand } from "@/entity/service/brand.d";
import { GetServerSidePropsContext } from "next";

// 解密cps
export const getCps = (
  params: any,
  ctx?: GetServerSidePropsContext
): Promise<Brand[]> =>
  axios.get("/cps/decrypt", {
    params,
    headers: { gateway: true },
    ctx,
  } as RequestConfig);

// 获取订单信息
export const gitOrderInfo = (
  params: any,
  ctx?: GetServerSidePropsContext
): Promise<Brand[]> =>
  axios.get("/rigPortal/wbshare/shareOrderFt/orderCommitPage", {
    params,
    headers: { gateway: true, needLogin: true },
    ctx,
  } as RequestConfig);

// 获取订单取消原因
export const getCancelReasonList = (
  params: any,
  ctx?: GetServerSidePropsContext
): Promise<Brand[]> =>
  axios.get("/rigPortal/wbshare/order/getCancelReasonList", {
    params,
    headers: { gateway: true },
    ctx,
  } as RequestConfig);

// 订单金额计算
export const orderCommitPageMoney = (
  data: any,
  ctx?: GetServerSidePropsContext
): Promise<Brand[]> =>
  axios.post("/rigPortal/wbshare/shareOrderFt/orderCommitPageMoney", data, {
    headers: { gateway: true },
    ctx,
  } as RequestConfig);

// 提交订单
export const confirmOrder = (
  params: any,
  ctx?: GetServerSidePropsContext
): Promise<Brand[]> =>
  axios.get("/recycleapi/reycle/shareOrderFt/addOrder", {
    params,
    headers: { gateway: true, needLogin: true },
    ctx,
  } as RequestConfig);
