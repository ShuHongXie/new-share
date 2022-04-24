/*
 * @Author: 谢树宏
 * @Date: 2022-03-11 14:52:02
 * @LastEditors: 谢树宏
 * @LastEditTime: 2022-03-15 13:51:44
 * @FilePath: /new-share/utils/index.ts
 */
import { sortObjectArg } from "./index.d";
/**
 * 判断是否是对象
 *
 * @param {*} object
 */
export const isObject = (object: any) => typeof object === "object";

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
 * @param {*} object
 * @return {*}
 */
export const getConstByEnv = (object: any) => {
  if (Object.prototype.toString.call(object) !== "[object Object]") {
    return;
  }
  const isProduction = process.env.NODE_ENV === "production";
  return isProduction ? object.development : object.development;
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
 * @param {{ [name: string]: unknown }} object
 */
export const sortObjectKey = (object: sortObjectArg) => {
  const entryObject = Object.keys(object);
  const returnObject: sortObjectArg = {};
  for (const key of entryObject) {
    returnObject[key] = object[key];
  }
  return returnObject;
};

/**
 * 将数字转换成金额
 * @param  {[string/number]} num [数字]
 * @return {[string]}     [金额（字符串）]
 */
export const toMoney = (num: number | string) => {
  if (!num) {
    return `¥0`;
  }
  if (typeof num === "string") {
    num = num.slice(1).split(",").join("");
  }
  num = (num as number).toFixed(2);
  num = parseFloat(num);
  const regForm = /(\d{1,3})(?=(\d{3})+(?:$|\.))/g;
  num = num.toString().replace(regForm, "$1,");
  // num = num.toLocaleString()

  return `¥${num}`;
};

/**
 * 对象深拷贝
 *
 * @param {*} object
 * @return {*}
 */
const deep = (object: any) => {
  if (!isObject(object) && !Array.isArray(object)) return object;
  let data: { [key: string | number]: any } = isObject(object) ? {} : [];
  for (const key in object) {
    data[key] = isObject(object) ? deep(object[key]) : object[key];
  }
  return data;
};
