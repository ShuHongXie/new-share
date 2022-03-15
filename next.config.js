/*
 * @Author: 谢树宏
 * @Date: 2022-03-09 14:13:13
 * @LastEditors: 谢树宏
 * @LastEditTime: 2022-03-15 16:56:23
 * @FilePath: /new-share/next.config.js
 */
const withImages = require("next-images");
const config = require("./config");
console.log(config);

const withTM = require("next-transpile-modules")(["antd-mobile"]);

/** @type {import('next').NextConfig} */
const nextConfig = withTM(
  withImages({
    reactStrictMode: true,
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
