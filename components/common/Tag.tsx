import NormalImage from "@/components/common/NormalImage";
import { FC, memo } from "react";
import { Data } from "@/entity/service/home";

import style from "./Tag.module.scss";
import WbIcon from "./Icon";

type TagProps = {
  data?: string; // ''
  radius?: boolean; // false
  plain?: boolean; // false
  bold?: boolean; // false
  customStyle?: any; // {}
  size?: string; // primary  primary' | 'mini' | 'small' | 'middle',
  type?: string; // 'primary', 'info', 'danger', 'warning', 'cancel'
  showAuctionIcon?: boolean; // false
};

const Tag: FC<TagProps> = memo(
  ({ data, showAuctionIcon, customStyle, type, size, bold, plain, radius }) => {
    const tagClass = () => {
      return [
        style[`tag__type--${type}`],
        style[`tag__type--${size}`],
        bold ? style["bold"] : "",
        plain ? style["is-plain"] : "",
        radius ? style['"is-radius'] : "",
      ];
    };
    const tagStyle = () => {
      return Object.assign({}, customStyle);
    };
    return (
      // 通用
      <div
        className={[style["tag"], ...tagClass()].join(" ")}
        style={tagStyle()}
      >
        {showAuctionIcon && (
          <WbIcon icon="icon-chuizi" customClass={style["tag-icon"]} />
        )}

        <span>{data}</span>
      </div>
    );
  }
);

export default Tag;
