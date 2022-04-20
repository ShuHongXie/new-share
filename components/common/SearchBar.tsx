import { Swiper } from "antd-mobile";
import React, { FC, useState, memo } from "react";
import WbIcon from "./Icon";
import style from "./SearchBar.module.scss";

export type SearchBarProps = {
  fixed?: boolean;
  haveBack?: boolean; // false
  placeholder?: string; // '搜索'
  focus?: boolean; // false
  onlyClick?: boolean; // false
  value?: string; // ''
  showClear?: boolean; // true
  radius?: boolean; // false
  size?: string; //"default"
  showSearch?: boolean; // false
  placeholderList?: any[]; // []
  isSwiper?: boolean; // false
  searchNoVal?: boolean; // true
  backEvent?: boolean; // false
  input?: (e) => void;
};

const SearchBar: FC<SearchBarProps> = memo(
  ({
    fixed = false,
    haveBack = false,
    placeholder = "搜索",
    focus = false,
    onlyClick = false,
    value = "",
    showClear = "",
    radius = false,
    size = "default",
    showSearch = false,
    placeholderList = [],
    isSwiper = false,
    searchNoVal = true,
    backEvent = false,
  }) => {
    console.log("searchbar组件渲染");

    // const [value, setValue] = useState('')
    // 提示文本
    let tipText = "";
    if (searchNoVal) {
      tipText = !value ? placeholder : value;
    }

    const backIcon = () =>
      haveBack ? (
        <WbIcon
          icon="icon-xiangzuojiantou"
          customClass={style["searchbar__back"]}
          size={18}
        />
      ) : (
        ""
      );

    const tipTextBlock = () =>
      onlyClick && !isSwiper ? (
        <span className={style.searchbarTip}>{tipText}</span>
      ) : (
        ""
      );

    const verticalItems = placeholderList.map((item, index) => (
      <Swiper.Item key={index}>
        <div>{item.simpleDetail}</div>
      </Swiper.Item>
    ));
    // 滚动栏目
    const swiperBlock = () =>
      onlyClick &&
      isSwiper &&
      placeholderList.length && (
        <Swiper
          style={{ "--height": "32px" }}
          direction="vertical"
          autoplay
          loop
        >
          {verticalItems}
        </Swiper>
      );
    // : React.FormEvent<HTMLInputElement>
    const onInput = (e: React.FormEvent<HTMLInputElement>) => {
      console.log(e);
    };

    const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
      console.log(e);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
      console.log(e);
    };

    const clearInput = () => {};

    const search = () => {};

    return (
      <div
        className={[style["searchbar"], fixed ? style["sticky"] : ""].join(" ")}
      >
        {/* 返回按钮 */}
        {backIcon()}
        <div className={[style["searchbar__container"]].join(" ")}>
          {/* 搜索图标 */}
          <WbIcon icon="icon-icon_search2"></WbIcon>
          {/* 提示 & input输入框 */}
          {tipTextBlock()}
          {/* 滚动框 */}
          {swiperBlock()}
          {/* 输入框 */}
          {!onlyClick && (
            <div className={style["searchbar__form"]} onClick={onClick}>
              <input
                value={value}
                autoFocus={focus}
                placeholder={tipText}
                disabled={onlyClick}
                onKeyPress={handleKeyPress}
                onInput={onInput}
                type="search"
                autoComplete="off"
                className={style["searchbar__input"]}
              />
            </div>
          )}
          {/* 清除图标 */}
          {value && showClear && (
            <div
              onClick={clearInput}
              className={style["searchbar__clear--icon"]}
            >
              <WbIcon icon="icon-guanbi" />
            </div>
          )}
        </div>
        {showSearch && (
          <div
            onClick={search}
            className={style["searchbar__container--search"]}
          >
            搜索
          </div>
        )}
      </div>
    );
  }
);

export default SearchBar;
