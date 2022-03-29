/*
 * @Author: 谢树宏
 * @Date: 2022-03-22 14:10:18
 * @LastEditors: 谢树宏
 * @LastEditTime: 2022-03-24 17:31:34
 * @FilePath: /new-share/components/modules/Fixed/HeadDownloadAppTip.tsx
 */

import { useState, FC } from "react";
import style from "./HomeHeader.module.scss";
import NormalImage from "@/components/common/NormalImage";
import WbIcon from "@/components/common/Icon";
import SearchBar from "@/components/common/SearchBar";

type HeadDownloadAppTipProp = {
  topImageUrl: string;
  isFixedTopImage: boolean;
  handleEvokeApp: (direction: string) => void;
  handleCloseEvokeTop: () => void;
};

// 顶部下载App提示组件
const HeadDownloadAppTip: FC<any> = ({
  searchPlaceholder,
  handleSearch,
  backgroundColorValue,
  homeData,
}) => {
  return (
    <div className={style["home-header"]}>
      {/* {!homeData.bgImageUrl && (
        <div
          className={[style["home-header__bg"]].join(" ")}
          style={{ backgroundColor: backgroundColorValue }}
        ></div>
      )} */}
      <div className={style["home-header__content"]}>
        <SearchBar
          placeholderList={searchPlaceholder}
          onlyClick
          isSwiper
        ></SearchBar>
        <WbIcon
          icon="icon-icon_iOS_msg"
          customClass={style["home-header__content__msg"]}
          size={36}
        />
      </div>
    </div>
  );
};

export default HeadDownloadAppTip;
