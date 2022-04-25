import { Swiper } from "antd-mobile";
import { useRouter } from "next/router";
import React, { FC, useState, memo, useEffect, useRef } from "react";
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
  change?: (value?: string) => void;
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
    showClear = true,
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
    change,
  }) => {
    console.log("searchbar组件渲染");
    const inputValue = useRef(value);
    const [tipText, setTipText] = useState("");
    const router = useRouter();

    useEffect(() => {
      // 提示文本
      if (searchNoVal) {
        inputValue.current = value;
        setTipText(!inputValue.current ? placeholder : inputValue.current);
      }
    }, [value]);

    // 按下键盘
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.keyCode === 13) {
        e.preventDefault();
        search!(inputValue.current);
        // this.$emit('search', this.value)
      }
    };
    // 清空输入框
    const clearInput = () => {
      // 清空输入框
      input?.("");
      clear?.();
    };

    // 点击返回
    const handleBack = () => {
      if (backEvent) {
        backEventMethod!();
        return;
      }
      router.back();
    };

    // swiper滑动子项
    const verticalItems = placeholderList.map((item, index) => (
      <Swiper.Item key={index}>
        <div>{item.simpleDetail}</div>
      </Swiper.Item>
    ));

    return (
      <div
        className={[style["searchbar"], fixed ? style["sticky"] : ""].join(" ")}
      >
        {/* 返回按钮 */}
        {haveBack && (
          <WbIcon
            icon="icon-xiangzuojiantou"
            customClass={style["searchbar__back"]}
            size={18}
            onClick={handleBack}
          />
        )}
        <div
          className={[style["searchbar__container"]].join(" ")}
          onClick={() => click!()}
        >
          {/* 搜索图标 */}
          <WbIcon icon="icon-icon_search2"></WbIcon>
          {/* 提示 & input输入框 */}
          {onlyClick && !isSwiper && (
            <span className={style["searchbar__tip"]}>{tipText}</span>
          )}
          {/* 滚动框 */}
          {onlyClick && isSwiper && placeholderList.length && (
            <Swiper
              style={{ "--height": "32px" }}
              direction="vertical"
              autoplay
              loop
            >
              {verticalItems}
            </Swiper>
          )}
          {/* 输入框 */}
          {!onlyClick && (
            <div className={style["searchbar__form"]}>
              <input
                value={inputValue.current}
                autoFocus={focus}
                placeholder={tipText}
                disabled={onlyClick}
                onKeyPress={handleKeyPress}
                type="search"
                autoComplete="off"
                className={style["searchbar__input"]}
                onChange={(e) => {
                  change?.(e.target.value);
                }}
              />
            </div>
          )}
          {/* 清除图标 */}
          {inputValue.current && showClear && (
            <div
              onClick={() => clearInput()}
              className={style["searchbar__clear--icon"]}
            >
              <WbIcon icon="icon-guanbi" color="#999" />
            </div>
          )}
        </div>
        {/* 搜索 */}
        {showSearch && (
          <div
            onClick={() => search?.(inputValue.current)}
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
