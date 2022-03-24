import { useState, FC } from "react";
import WbImage from "@/components/common/Image";
import style from "./FooterOpenAppTip.module.scss";

type FooterOpenAppTipProp = {
  fixedImageUrl: string;
  handleEvokeApp: (direction: string) => void;
};
const FooterOpenAppTip: FC<FooterOpenAppTipProp> = ({
  handleEvokeApp,
  fixedImageUrl,
}) => {
  return (
    <div onClick={() => handleEvokeApp("fixed")} className={style.fixed}>
      <WbImage src={fixedImageUrl}></WbImage>
    </div>
  );
};

export default FooterOpenAppTip;
