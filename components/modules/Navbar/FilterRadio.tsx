import NormalImage from "@/components/common/NormalImage";
import { FC, memo } from "react";
import { Data } from "@/entity/service/home";

import style from "./FilterRadio.module.scss";
import WbIcon from "@/components/common/Icon";

type FilterRadioProps = {
  tagList: string[];
  title?: string;
  showDelete?: boolean;
  showItemDelete?: boolean;
  delItem?: (tag: string) => void;
  selectTag?: any;
  deleteTag?: any;
};

const FilterRadio: FC<FilterRadioProps> = memo(({ children }) => {
  return <div></div>;
});

export default FilterRadio;
