/*
 * @Author: 谢树宏
 * @Date: 2022-03-11 16:44:07
 * @LastEditors: 谢树宏
 * @LastEditTime: 2022-03-11 16:53:51
 * @FilePath: /new-share/service/config/index.ts
 */

import axios from "axios";
import Cookie from "js-cookie";
import { TOKENID, WBIAOID, MALL_SAAS_TOKEN } from "@/config/constant";
import { uuid } from "@/utils";
const instance = axios.create();

/**
 * axios 全局拦截器配置
 * https://axios.nuxtjs.org/helpers
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
let sources = {}; // 用于储存不支持重复请求的接口的取消函数

// 添加请求拦截器
instance.interceptors.request.use(
  function (options) {
    const tokenId = Cookie.get(MALL_SAAS_TOKEN) || Cookie.get(TOKENID);
    const wbiaoid = Cookie.get(WBIAOID) || "";
    if (!wbiaoid) {
      Cookie.set(WBIAOID, uuid(), {
        path: "/",
        secure: true,
        maxAge: 365 * 60 * 24 * 365,
        domain: getCookieDomain({
          host: process.server ? req.headers.host : location.host,
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
    if (options.headers.once) {
      // 如果接口未配置cancelToken，则主动配置一个，以页面的控制级别优先
      if (!options.cancelToken) {
        options.cancelToken = new $axios.CancelToken((cancel) => {
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
          });
      } else {
        list.push(request);
      }
    }
    // gateway - 走网关的接口
    if (options.headers.gateway) {
      if (tokenId) {
        options.headers["wb-token"] = tokenId;
      }
      options = signUtils(options, { app });
    }

    // 在发送请求之前做些什么
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    return response;
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);
