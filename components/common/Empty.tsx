import NormalImage from "@/components/common/NormalImage";
import { FC } from "react";

import style from "./Empty.module.scss";
import WbImage from "./Image";

type EmptyProps = {
  emptyImageWidth?: number;
  emptyImageHeight?: number;
  isStatic?: boolean;
  emptyImage?: string;
  emptyText?: string;
};

const Empty: FC<EmptyProps> = ({
  emptyImageWidth = 0,
  emptyImageHeight,
  isStatic = true,
  emptyImage = "/p/share/mp/images/result__empty.png",
  emptyText = "没有找到相关内容~",
}) => {
  return (
    <div className={style["empty"]}>
      <WbImage
        width={emptyImageWidth}
        height={emptyImageHeight}
        originType={isStatic ? "static" : "aliyuncs"}
        src={emptyImage}
      />
      <text className={style["empty-text"]}>{emptyText}</text>
    </div>
  );
};

export default Empty;
