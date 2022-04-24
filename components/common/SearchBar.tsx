import { Swiper } from "antd-mobile";
import { useRouter } from "next/router";
import React, { FC, useState, memo, useEffect, useCallback } from "react";
import WbIcon from "./Icon";
import style from "./SearchBar.module.scss";

export type SearchBarProps = {
  fixed?: boolean;
  haveBack?: boolean; // false
  placeholder?: string; // '搜索'
  focus?: boolean; // 聚焦
  onlyClick?: boolean; // 只提供点击功能？
  value?: string; // 值
  showClear?: boolean; // true 展示清除按钮
  radius?: boolean; // false
  size?: string; //"default"
  showSearch?: boolean; // false
  placeholderList?: any[]; // []
  isSwiper?: boolean; // false placeholder区域是否上下滚动
  searchNoVal?: boolean; // true
  backEvent?: boolean; // false
  input?: (value: string) => void;
  backEventMethod?: () => void;
  search?: (value: string) => void;
  click?: (value?: string) => void;
  clear?: () => void;
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
    backEventMethod,
    search,
    clear,
    input,
    click,
  }) => {
    console.log("searchbar组件渲染");
    const [inputValue, setInputValue] = useState(value);
    const [tipText, setTipText] = useState("");
    const router = useRouter();

    useEffect(() => {
      // 提示文本
      if (searchNoVal) {
        setTipText(!value ? placeholder : value);
      }
    }, []);

    const backIcon = () =>
      haveBack ? (
        <WbIcon
          icon="icon-xiangzuojiantou"
          customClass={style["searchbar__back"]}
          size={18}
          onClick={handleBack}
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
    const swiperBlock = () => {
      console.log("滚动栏目");

      return (
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
        )
      );
    };
    // : React.FormEvent<HTMLInputElement>
    const onInput = (e: React.FormEvent<HTMLInputElement>) => {
      console.log(e);
    };

    // 按下键盘
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.keyCode === 13) {
        e.preventDefault();
        search!(inputValue);
        // this.$emit('search', this.value)
      }
    };
    // 清空输入框
    const clearInput = () => {
      // 清空输入框
      input!("");
      clear!();
    };
    // 点击返回
    const handleBack = () => {
      if (backEvent) {
        backEventMethod!();
        return;
      }
      router.back();
    };
    // 点击整体
    const handleClick = () => {
      click!();
    };

    return (
      <div
        className={[style["searchbar"], fixed ? style["sticky"] : ""].join(" ")}
      >
        {/* 返回按钮 */}
        {backIcon()}
        <div
          className={[style["searchbar__container"]].join(" ")}
          onClick={handleClick}
        >
          {/* 搜索图标 */}
          <WbIcon icon="icon-icon_search2"></WbIcon>
          {/* 提示 & input输入框 */}
          {tipTextBlock()}
          {/* 滚动框 */}
          {swiperBlock()}
          {/* 输入框 */}
          {!onlyClick && (
            <div className={style["searchbar__form"]}>
              <input
                value={inputValue}
                autoFocus={focus}
                placeholder={tipText}
                disabled={onlyClick}
                onKeyPress={handleKeyPress}
                onInput={onInput}
                type="search"
                autoComplete="off"
                className={style["searchbar__input"]}
                onChange={(e) => {
                  setInputValue(e.target.value);
                }}
              />
            </div>
          )}
          {/* 清除图标 */}
          {inputValue && showClear && (
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
            onClick={() => search!(inputValue)}
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
