/*
 * @Author: 谢树宏
 * @Date: 2022-03-11 16:44:07
 * @LastEditors: 谢树宏
 * @LastEditTime: 2022-03-15 16:20:10
 * @FilePath: /new-share/service/config/index.ts
 */
import Cookie from "js-cookie";
import { TOKENID, WBIAOID, MALL_SAAS_TOKEN } from "@/config/constant";
import config from "@/config";
import { uuid, getCookieDomain } from "@/utils";
import { Toast } from "antd-mobile";
import signUtils from "./sign";
import axios, { AxiosInstance } from "axios";
import omit from "lodash.omit";
import qs from "qs";

import {
  RequestConfig,
  Source,
  Msg,
  Response,
  ResponseConfigHeaders,
} from "./index.d";

export const instance: AxiosInstance = axios.create();

/**
 * axios 全局配置
 *
 * Request:
 * headers参数
 * needLogin 需要登录
 *
 * Response:
 * http200下，根据接口自定义状态码（error）定制：
 * 0   无错误
 * 400 illegal argument 输入参数错误
 * 401  nauthorized 没有权限
 * 403 Forbidden 未登录
 * 404 NotFound 无此接口
 * 405 MissingParams 缺少必要参数
 * 406 SignTimeExpired 签名时间过期
 * 407 SignatureIllegal 签名不合法
 * 500 InternalError 服务器错误
 */
let userTokenId: string = ""; // 用于记录登录用户的tokenId，发生变化则清除记录的请求
let list: string[] = []; // 用于储存不支持重复请求的接口
let sources: Source = {}; // 用于储存不支持重复请求的接口的取消函数

// 添加请求拦截器
instance.interceptors.request.use(
  (options: RequestConfig): RequestConfig => {
    const tokenId = Cookie.get(MALL_SAAS_TOKEN) || Cookie.get(TOKENID) || "";
    const wbiaoid = Cookie.get(WBIAOID) || "";
    if (!wbiaoid) {
      Cookie.set(WBIAOID, uuid(), {
        path: "/",
        secure: true,
        maxAge: 365 * 60 * 24 * 365,
        domain: getCookieDomain({
          host: options.req ? options.req.headers.host : location.host,
        }).sndleveldomain,
      });
    }
    // 用户发生改变，清除所有接口记录数据
    if (userTokenId !== tokenId) {
      userTokenId = tokenId;
      list = [];
      sources = {};
    }
    const request =
      options.url + JSON.stringify(options.params || options.data || {});
    // 接口是否可以重复请求，并清除headers中多余参数
    // 此处仅适用
    if (options.headers?.once) {
      // 如果接口未配置cancelToken，则主动配置一个，以页面的控制级别优先
      if (!options.cancelToken) {
        options.cancelToken = new axios.CancelToken((cancel) => {
          sources[request] = cancel;
        });
      }
      // 存在重复请求，则取消，否则添加记录
      // 此处之所以不用剔除掉请求成功后的记录，是因为用户不可能两次调用同一个接口
      if (list.includes(request)) {
        sources[request] &&
          sources[request]({
            data: { info: { error: 400, message: "正在处理中，请稍后～" } },
            config: Object.assign({}, options),
          } as any);
      } else {
        list.push(request);
      }
    }
    // gateway - 走网关的接口
    if (options.headers?.gateway) {
      if (tokenId) {
        options.headers["wb-token"] = tokenId;
      }
      options = signUtils(options);
    }

    // 在发送请求之前做些什么
    return options;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
instance.interceptors.response.use(
  (response: Response) => {
    // 对响应数据做点什么
    const { info } = response.data || {};
    const { headers, url, params, data, ctx } = response.config;
    if (info && info.error) {
      if (info.error === 1110) {
        // token过期，则清除所有
        userTokenId = "";
        list = [];
        sources = {};
      } else if (headers?.once) {
        const requestParams = params || data || {};
        // 请求失败，则清除已经记录的请求
        const request =
          url?.split("?")[0] +
          (typeof requestParams === "string"
            ? requestParams
            : JSON.stringify(
                omit(requestParams, [
                  "app",
                  "deviceId",
                  "os",
                  "rcode",
                  "sign",
                  "time",
                ]) || {}
              ));
        const index = list.findIndex((item) => item === request);
        index !== -1 && list.splice(index, 1);
      }
      let MSG: Msg = {};
      if (info.error > 400 && info.error <= 500) {
        MSG = {
          500: "服务器开小差～",
          405: "缺少参数",
          404: "没找到资源",
          407: "签名无效",
          401: "没有权限",
          406: "签名过期,请重新登录",
          408: "终端与认证方式不一致",
        };
      }
      const message = MSG[info.error.toString()]
        ? MSG[info.error.toString()]
        : info.message;
      /**
       * 客户端渲染 - toast
       * 服务端渲染 - 去到错误页面
       *  */
      // const { hideToast, selfHandleLogin } = response.config
      //   .headers as ResponseConfigHeaders;
      // process.client
      //   ? !(selfHandleLogin || hideToast) && Toast.show({ content: message })
      //   : error({
      //       statusCode: info.error,
      //       message: message,
      //     });
      // if (info.error !== 0 && selfHandleLogin && !isAPP) {
      //   // 非app环境中，selfHandleLogin=true 页面自行处理需要登录的业务逻辑
      //   return Promise.reject(info);
      // }
      // 回到登录页 - 401, 403, 406
      if (
        (!headers?.optionlLogin && [401, 403, 406].includes(info.error)) ||
        (headers?.needLogin &&
          info.error === 1110 &&
          info.message === "缺少token必要参数")
      ) {
        // const redirectUrl = process.server
        //   ? config.WECHAT_ORIGIN.mall['development'] + route.fullPath
        //   : location.href;
        // // const redirectUrl = location.href
        // const _params = qs.stringify({ redirectUrl });
        // ctx.redirect(`/login?${_params}`);
      } else {
        return Promise.reject((response.data || {}).data || info);
      }
    } else {
      return Promise.resolve((response.data || {}).data);
    }
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export default instance;
