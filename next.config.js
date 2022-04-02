/*
 * @Author: 谢树宏
 * @Date: 2022-03-09 14:13:13
 * @LastEditors: 谢树宏
 * @LastEditTime: 2022-03-17 18:05:39
 * @FilePath: /new-share/next.config.js
 */
const withImages = require("next-images");
const withTM = require("next-transpile-modules")(["antd-mobile"]);
const path = require("path");
const config = require("./config/test.js");

/** @type {import('next').NextConfig} */
const nextConfig = withTM(
  withImages({
    reactStrictMode: true,
    sassOptions: {
      includePaths: [path.join(__dirname, "styles")],
      prependData: `@import "common.scss";`,
    },
    async rewrites() {
      return [
        {
          source: "/rigPortal/:path*",
          destination:
            config.RIG_API[process.env.NODE_ENV] + "/rigPortal/:path*",
        },
        {
          source: "/manageapi/:path*",
          destination: config.API.manage[process.env.NODE_ENV] + "/:path*",
        },
        {
          source: "/recycleapi/:path*",
          destination: config.API.recycle[process.env.NODE_ENV] + "/:path*",
        },
        {
          source: "/paymentapi/:path*",
          destination: config.API.payment[process.env.NODE_ENV] + "/:path*",
        },
        {
          source: "/memberapi/:path*",
          destination: config.API.member[process.env.NODE_ENV] + "/:path*",
        },
        {
          source: "/logisticsapi/:path*",
          destination: config.API.logistics[process.env.NODE_ENV] + "/:path*",
        },
        {
          source: "/artisanapi/:path*",
          destination: config.API.artisan[process.env.NODE_ENV] + "/:path*",
        },
      ];
    },
    plugins: [],
    images: {
      domains: [
        "static.wbiao.co",
        "wbiao-test.oss-cn-hangzhou.aliyuncs.com",
        "image7.wbiao.co",
      ],
    },
  })
);

module.exports = nextConfig;
