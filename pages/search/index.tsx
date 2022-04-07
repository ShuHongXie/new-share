import NormalImage from "@/components/common/NormalImage";
import { FC, memo } from "react";
import { Data } from "@/entity/service/home";

import style from "./index.module.scss";

type SearchProps = {
  data?: Data;
};

const Search: FC<SearchProps> = memo(({ data }) => {
  return (
    <NormalImage
      className={style["home-advert"]}
      src={data?.itemList![0].imageURL}
    />
  );
});

export default Search;
