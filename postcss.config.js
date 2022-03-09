/*
 * @Author: 谢树宏
 * @Date: 2022-03-09 17:10:09
 * @LastEditors: 谢树宏
 * @LastEditTime: 2022-03-09 17:11:32
 * @FilePath: /new-share/postcss.config.js
 */
module.exports = {
  plugins: {
    "postcss-px-to-viewport": {
      viewportWidth: 375,
    },
    "postcss-flexbugs-fixes": {},
    "postcss-preset-env": {
      autoprefixer: {
        flexbox: "no-2009",
      },
      stage: 3,
      features: {
        "custom-properties": false,
      },
    },
  },
};
