/*
 * @Author: 谢树宏
 * @Date: 2022-03-22 14:59:19
 * @LastEditors: 谢树宏
 * @LastEditTime: 2022-03-22 16:19:16
 * @FilePath: /new-share/components/common/Icon.tsx
 */
import { FC, ReactNode } from "react";

export type WbIconProp = {
  icon?: string;
  customClass?: string;
  styles?: {
    [styleName: string]: string;
  };
  color?: string;
  size?: number | string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
};

// 通用icon组件
const WbIcon: FC<WbIconProp> = ({
  icon,
  customClass,
  styles,
  size = 12,
  color = "#000",
  onClick,
}) => {
  size = size + "px";
  styles = {
    color,
    fontSize: /[a-z]+/.test(size) ? size : `${size}px`,
    ...styles,
  };
  // icon点击
  const iconClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    onClick && onClick(e);
  };

  return (
    <i
      className={`iconfont ${icon} ${customClass}`}
      style={styles}
      onClick={iconClick}
    ></i>
  );
};

export default WbIcon;
