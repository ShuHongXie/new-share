import NormalImage from "@/components/common/NormalImage";
import { FC, memo, useState } from "react";
import { Data } from "@/entity/service/home";

import style from "./HomeToolbar.module.scss";

type HomeToolbarProps = {
  data?: Data;
  handleClick?: () => void;
};

const HomeToolbar: FC<HomeToolbarProps> = memo(({ data, handleClick }) => {
  return (
    <div className={style["home-toolbar"]}>
      {data?.itemList?.map((item, index) => (
        <div
          className={style["home-toolbar__item"]}
          key={index}
          onClick={(e) => handleClick(item)}
        >
          <NormalImage
            src={item.imageURL}
            className={style["home-toolbar__icon"]}
          />
          <span
            style={{ color: data.textColor }}
            className={style["home-toolbar__name"]}
          >
            {item.title}
          </span>
        </div>
      ))}
    </div>
  );
});

export default HomeToolbar;
