/*
 * @Author: 谢树宏
 * @Date: 2022-03-22 14:10:18
 * @LastEditors: 谢树宏
 * @LastEditTime: 2022-03-22 17:06:37
 * @FilePath: /new-share/components/modules/Fixed/HeadDownloadAppTip.tsx
 */

import { useState } from "react";
import style from "./HeadDownloadAppTip.module.scss";
import WbImage from "@/components/common/Image";
import WbIcon from "@/components/common/Icon";

// 顶部下载App提示
const HeadDownloadAppTip = ({ topImageUrl, handleEvokeApp }) => {
  const [isFixedTopImage, setIsFixedTopImage] = useState();

  const handleCloseEvokeTop = () => {};

  return (
    <div className={isFixedTopImage ? style.tipFixedTop : style.tipTop}>
      <WbImage src={topImageUrl} onClick={handleEvokeApp("top")}></WbImage>
      <WbIcon
        onClick={handleCloseEvokeTop}
        icon="icon-btn_close"
        customClass={[style.closeIcon].join(" ")}
      ></WbIcon>
    </div>
  );
};

export default HeadDownloadAppTip;
