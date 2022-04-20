import NormalImage from "@/components/common/NormalImage";
import { FC, memo } from "react";
import { Data } from "@/entity/service/home";

import style from "./ListTitle.module.scss";

type ListTitleProps = {
  title?: string;
  subTitle?: string;
  customClass?: string;
};

const ListTitle: FC<ListTitleProps> = memo(
  ({ title, subTitle, customClass }) => {
    return (
      <div className={[style["list-title"], customClass].join(" ")}>
        <div className={style["list-title__top"]}>
          {title}
          <span
            className={[
              style["list-title__deco"],
              style["list-title__deco--left"],
            ].join(" ")}
          ></span>
          <span
            className={[
              style["list-title__deco"],
              style["list-title__deco--right"],
            ].join(" ")}
          ></span>
        </div>
        <div className={style["list-title__sub"]}>{subTitle}</div>
      </div>
    );
  }
);

export default ListTitle;
