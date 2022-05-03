import NormalImage from "@/components/common/NormalImage";
import { FC, memo } from "react";
import { Data } from "@/entity/service/home";

import style from "./Filter.module.scss";
import WbIcon from "@/components/common/Icon";
import { Popup } from "antd-mobile";

type FilterProps = {
  data: any;
};

const Filter: FC<FilterProps> = memo(({ data }) => {
  console.log(data);

  return <div className={style.filter}></div>;
});

export default Filter;
