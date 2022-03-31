import NormalImage from "@/components/common/NormalImage";
import { FC, memo } from "react";
import { Data } from "@/entity/service/home";

import style from "./HomeAdvert.module.scss";

type HomeAdvertProps = {
  data?: Data;
};

const HomeAdvert: FC<HomeAdvertProps> = memo(({ data }) => {
  return (
    <NormalImage
      className={style["home-advert"]}
      src={data?.itemList![0].imageURL}
    />
  );
});

export default HomeAdvert;
