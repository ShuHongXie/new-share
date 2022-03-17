/*
 * @Author: 谢树宏
 * @Date: 2022-03-09 14:13:13
 * @LastEditors: 谢树宏
 * @LastEditTime: 2022-03-17 18:05:39
 * @FilePath: /new-share/next.config.js
 */
const withImages = require("next-images");
const withTM = require("next-transpile-modules")(["antd-mobile"]);
const config = require("./config/test.js");

/** @type {import('next').NextConfig} */
const nextConfig = withTM(
  withImages({
    reactStrictMode: true,
    async rewrites() {
      return [
        {
          source: "/rigPortal/:path*",
          destination:
            config.RIG_API[process.env.NODE_ENV] + "/rigPortal/:path*",
        },
        {
          source: "/manageapi/:path*",
          destination: config.RIG_API[process.env.NODE_ENV] + "/:path*",
        },
        {
          source: "/paymentapi/:path*",
          destination: config.RIG_API[process.env.NODE_ENV] + "/:path*",
        },
        {
          source: "/memberapi/:path*",
          destination: config.RIG_API[process.env.NODE_ENV] + "/:path*",
        },
        {
          source: "/logisticsapi/:path*",
          destination: config.RIG_API[process.env.NODE_ENV] + "/:path*",
        },
        {
          source: "/artisanapi/:path*",
          destination: config.RIG_API[process.env.NODE_ENV] + "/:path*",
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
