/*
 * @Author: 谢树宏
 * @Date: 2022-03-22 14:10:18
 * @LastEditors: 谢树宏
 * @LastEditTime: 2022-03-24 17:31:34
 * @FilePath: /new-share/components/modules/Fixed/HeadDownloadAppTip.tsx
 */

import { useState, FC } from "react";
import style from "./HeadDownloadAppTip.module.scss";
import WbImage from "@/components/common/Image";
import WbIcon from "@/components/common/Icon";

type HeadDownloadAppTipProp = {
  topImageUrl: string;
  isFixedTopImage: boolean;
  handleEvokeApp: (direction: string) => void;
  handleCloseEvokeTop: () => void;
};

// 顶部下载App提示组件
const HeadDownloadAppTip: FC<HeadDownloadAppTipProp> = ({
  isFixedTopImage,
  topImageUrl,
  handleEvokeApp,
  handleCloseEvokeTop,
}) => {
  return (
    <div className={isFixedTopImage ? style.tipFixedTop : style.tipTop}>
      <WbImage
        src={topImageUrl}
        onClick={() => handleEvokeApp("top")}
      ></WbImage>
      {/* <WbIcon
        onClick={handleCloseEvokeTop}
        icon="icon-btn_close"
        customClass={[style.closeIcon].join(" ")}
      ></WbIcon> */}
    </div>
  );
};

export default HeadDownloadAppTip;
