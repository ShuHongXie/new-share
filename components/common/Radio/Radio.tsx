import NormalImage from "@/components/common/NormalImage";
import { FC, memo } from "react";
import { Data } from "@/entity/service/home";

// import style from "./Radio.module.scss";

type RadioProps = {
  tagList: string[];
  title?: string;
  showDelete?: boolean;
  showItemDelete?: boolean;
  delItem?: (tag: string) => void;
  selectTag?: any;
  deleteTag?: any;
};

const Radio: FC<RadioProps> = memo(({ children }) => {
  return <div></div>;
});

export default Radio;
