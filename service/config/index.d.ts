/*
 * @Author: 谢树宏
 * @Date: 2022-03-15 14:51:34
 * @LastEditors: 谢树宏
 * @LastEditTime: 2022-03-15 16:27:05
 * @FilePath: /new-share/service/config/index.d.ts
 */
import {
  AxiosRequestConfig,
  Canceler,
  AxiosResponse,
  AxiosRequestHeaders,
  AxiosResponseHeaders,
} from "axios";
import { IncomingHttpHeaders } from "http";
import { GetServerSidePropsContext } from "next";

export interface RequestConfig extends AxiosRequestConfig {
  req?: {
    headers: IncomingHttpHeaders;
  };
  ctx?: GetServerSidePropsContext;
}

export interface Source {
  [key: string]: Canceler;
}

type HeadersAddProperty = {
  hideToast?: boolean;
  selfHandleLogin?: boolean;
  once?: boolean;
  needLogin?: boolean;
};

export type ResponseConfigHeaders = AxiosRequestHeaders & HeadersAddProperty;

export interface ResponseConfig extends RequestConfig {
  headers?: ResponseConfigHeaders;
}

export interface Response extends AxiosResponse {
  config: ResponseConfig;
}

export interface Msg {
  [key: number]: string;
}
