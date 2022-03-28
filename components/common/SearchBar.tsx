import { Swiper } from "antd-mobile";
import React, { FC } from "react";
import WbIcon from "./Icon";
import style from "./SearchBar.module.scss";

export type SearchBarProps = {
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

const SearchBar: FC<SearchBarProps> = ({
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
  // 提示文本
  let tipText = "";
  if (searchNoVal) {
    tipText = !value ? placeholder : value;
  }

  const backIcon = () =>
    haveBack ? <WbIcon icon="xiangzuojiantou" size={18} /> : "";

  const tipTextBlock = () =>
    onlyClick && !isSwiper ? (
      <span className={style.searchbarTip}>{tipText}</span>
    ) : (
      ""
    );
  // <Swiper.Item
  const swiperBlock = () => (
    <Swiper
      style={{
        "--border-radius": "8px",
      }}
      defaultIndex={3}
    >
      {/* {items} */}
    </Swiper>
  );
  // : React.FormEvent<HTMLInputElement>
  const onInput = (e: React.FormEvent<HTMLInputElement>) => {
    console.log(e);
  };

  const onClick = (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLInputElement>
  ) => {
    console.log(e);
  };

  return (
    <div className={style.searchbar}>
      {backIcon()}
      <div className={[style.searchbarContainer].join(" ")}>
        {/* 搜索图标 */}
        <WbIcon icon="icon-icon_search2"></WbIcon>
        {/* 提示 & input输入框 */}
        {tipTextBlock()}
        {/* 输入框 */}
        {!onlyClick ? (
          <input
            value={value}
            autoFocus={focus}
            focus={focus}
            placeholder={tipText}
            disabled={onlyClick}
            keypress="handleKeyPress"
            onInput={onInput}
            onClick={onClick}
            type="search"
            autoComplete="off"
            className="searchbar__input"
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default SearchBar;
