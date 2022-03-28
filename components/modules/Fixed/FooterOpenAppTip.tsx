import { useState, FC } from "react";
import NormalImage from "@/components/common/NormalImage";
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
      <NormalImage src={fixedImageUrl}></NormalImage>
    </div>
  );
};

export default FooterOpenAppTip;
