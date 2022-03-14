/*
 * @Author: 谢树宏
 * @Date: 2022-03-11 14:52:02
 * @LastEditors: 谢树宏
 * @LastEditTime: 2022-03-11 16:50:44
 * @FilePath: /new-share/utils/index.ts
 */
import { sortObjectArg } from "./index.d";
/**
 * 获取当前ip地址的二级域名
 *
 * @param {{ host?: string }} [{ host }={}]
 * @return {*}
 */
export const getCookieDomain = ({ host }: { host?: string } = {}) => {
  const localHost = ["localhost", "127.0.0.1"];
  const parts = host?.split(".");
  let subdomain = `.${parts?.shift()}`;
  let upperleveldomain = `.${parts?.join(".")}`;
  let sndleveldomain = `.${parts?.slice(-2).join(".").split(":")[0]}`;
  localHost.forEach((item) => {
    if (host?.includes(item)) {
      subdomain = upperleveldomain = sndleveldomain = item;
    }
  });
  return {
    subdomain,
    upperleveldomain,
    sndleveldomain,
  };
};

/**
 * 获取不同环境下变量
 * @param {*} obj
 * @return {*}
 */
export const getConstByEnv = (obj: any) => {
  if (Object.prototype.toString.call(obj) !== "[object Object]") {
    return;
  }
  const isProduction = process.env.NODE_ENV === "production";
  return isProduction ? obj.production : obj.development;
};

/**
 * 生成随机uuid
 * @return {*}
 */
export const uuid = () => {
  let i;
  let random;
  let result = "";

  for (i = 0; i < 32; i++) {
    random = (Math.random() * 16) | 0;
    if (i === 8 || i === 12 || i === 16 || i === 20) {
      result += "-";
    }
    result += (i === 12 ? 4 : i === 16 ? (random & 3) | 8 : random).toString(
      16
    );
  }

  return result;
};

/**
 * key名称按顺序重排
 * @param {{ [name: string]: unknown }} obj
 */
export const sortObjectKey = (obj: sortObjectArg) => {
  const entryObject = Object.keys(obj);
  const returnObject: sortObjectArg = {};
  for (const key of entryObject) {
    returnObject[key] = obj[key];
  }
};
