/*
 * @Author: 谢树宏
 * @Date: 2022-03-09 14:13:13
 * @LastEditors: 谢树宏
 * @LastEditTime: 2022-03-09 17:11:44
 * @FilePath: /new-share/next.config.js
 */
const withImages = require("next-images");

const withTM = require("next-transpile-modules")(["antd-mobile"]);

/** @type {import('next').NextConfig} */
const nextConfig = withTM(
  withImages({
    reactStrictMode: true,
    plugins: [],
  })
);

module.exports = nextConfig;
