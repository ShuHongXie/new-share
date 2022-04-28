/*
 * @Author: 谢树宏
 * @Date: 2022-03-22 14:59:19
 * @LastEditors: 谢树宏
 * @LastEditTime: 2022-03-22 16:19:16
 * @FilePath: /new-share/components/common/Icon.tsx
 */
import { FC, memo, ReactNode } from "react";
import style from "./SvgIcon.module.scss";

export type WbSvgIconProp = {
  icon?: string;
  customClass?: string;
  styles?: {
    [styleName: string]: string;
  };
  color?: string;
  size?: number | string;
  bubbling?: boolean; // 是否阻止冒泡
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
};

// 通用icon组件
const WbSvgIcon: FC<WbSvgIconProp> = memo(
  ({
    icon = "",
    customClass = "",
    size = 24,
    color = "#000",
    onClick,
    bubbling,
  }) => {
    // icon点击
    const iconClick = (e: React.MouseEvent<HTMLElement>) => {
      bubbling && e.stopPropagation();
      onClick && onClick(e);
    };

    return (
      <span onClick={iconClick}>
        <svg
          className={[style["svg-icon"], customClass].join(" ")}
          aria-hidden="true"
        >
          <use xlinkHref={`#${icon}`}></use>
        </svg>
      </span>
    );
  }
);

export default WbSvgIcon;
