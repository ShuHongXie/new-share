/*
 * @Author: 谢树宏
 * @Date: 2021-05-27 10:33:56
 * @LastEditors: 谢树宏
 * @LastEditTime: 2021-06-25 10:55:45
 * @FilePath: /nuxt_share_mobile/utils/tool/gatewaySign.js
 */
import qs from "qs";
import MD5 from "./md5";
import config from "@/config";
import Cookie from "js-cookie";
import { WBIAOID, TOKENID, MALL_SAAS_TOKEN } from "@/config/constant";
import { sortObjectKey, uuid } from "@/utils";
const secret =
  config.SECRET_KEY[process.env.NODE_ENV as "production" | "development"];

import { RequstConfig } from ".";

export default function sign(request: RequstConfig, {} = {}) {
  const unixDate = Math.floor(Date.now() / 1000);
  // 公共参数
  // eslint-disable-next-line no-prototype-builtins
  const appData = {
    app: 3, // 应用  3.万表二手表
    os: 4, // 系统平台 :m
  };
  const commonData: { [key: string]: unknown } = Object.assign(
    {
      deviceId: Cookie.get(WBIAOID) || uuid(),
      time: unixDate, // 时间戳
      rcode: Math.floor(Math.random() * 9999),
    },
    appData
  );

  const needToken =
    Cookie.get(TOKENID) || Cookie.get(MALL_SAAS_TOKEN)
      ? {
          "wb-token":
            Cookie.get(MALL_SAAS_TOKEN) ||
            Cookie.get(TOKENID) ||
            request.headers!["wb-token"],
        }
      : {};
  /**
   * [post - 验签]
   * 1. commonData 里加入json.parse后的body参数，并且qs.stringify(不encode)
   * 2. 对象升序排列，然后 MD5操作
   * 3. 在url上拼接 body,time,sign
   */
  if (request.method?.toUpperCase() === "POST") {
    const sortObject = Object.assign({}, commonData, needToken, {
      body: JSON.stringify(request.data),
    });
    const signObject = sortObjectKey(sortObject);
    console.log(signObject);
    const signParams = `${qs.stringify(signObject, {
      encode: false,
    })}${secret}`;
    commonData.sign = MD5(signParams);
    console.log(commonData);
    request.url = request.url + "?" + qs.stringify(commonData);
  }
  /**
   * [get - 验签]
   * 1. 对象升序排列，然后 MD5操作
   * 2. 在url上拼接 body,time,sign
   * 3. signHeader为真意味着header验签，header加入SignDate，Content-MD5，Version
   */
  if (request.method?.toUpperCase() === "GET") {
    const sortObject = Object.assign({}, commonData, needToken, request.params);
    const signObject = sortObjectKey(sortObject);
    const signParams = `${qs.stringify(signObject, { encode: true })}${secret}`;
    commonData.sign = MD5(signParams);
    request.params = sortObjectKey({
      ...commonData,
      ...request.params,
    });
  }
  return request;
}
