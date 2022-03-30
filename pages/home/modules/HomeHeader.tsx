/*
 * @Author: 谢树宏
 * @Date: 2022-03-22 14:10:18
 * @LastEditors: 谢树宏
 * @LastEditTime: 2022-03-24 17:31:34
 * @FilePath: /new-share/components/modules/Fixed/HomeHeader.tsx
 */

import { useState, FC, memo } from "react";
import style from "./HomeHeader.module.scss";
import NormalImage from "@/components/common/NormalImage";
import WbIcon from "@/components/common/Icon";
import SearchBar from "@/components/common/SearchBar";

import { PlaceholderItem } from "@/entity/service/home.d";

type HomeHeaderProps = {
  searchPlaceholder: PlaceholderItem[];
  bgImageUrl?: string;
  backgroundColorValue?: string;
};

// 顶部下载App提示组件
const HomeHeader: FC<HomeHeaderProps> = memo(
  ({ searchPlaceholder, bgImageUrl, backgroundColorValue }) => {
    console.log("homeheader渲染");

    return (
      <div className={style["home-header"]}>
        {!bgImageUrl && (
          <div
            className={[style["home-header__bg"]].join(" ")}
            style={{ backgroundColor: backgroundColorValue }}
          ></div>
        )}
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
            color="#FFF"
          />
        </div>
      </div>
    );
  }
);

export default HomeHeader;
