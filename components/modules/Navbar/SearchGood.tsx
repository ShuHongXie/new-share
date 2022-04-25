import NormalImage from "@/components/common/NormalImage";
import { FC, memo } from "react";
import { Data } from "@/entity/service/home";

import style from "./Category.module.scss";
import WbIcon from "@/components/common/Icon";

type CategoryProps = {
  tagList: string[];
  title?: string;
  showDelete?: boolean;
  showItemDelete?: boolean;
  delItem?: (tag: string) => void;
  selectTag?: any;
  deleteTag?: any;
};

const Category: FC<CategoryProps> = memo(({ children }) => {
  return <div></div>;
});

export default Category;
