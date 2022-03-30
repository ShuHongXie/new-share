import NormalImage from "@/components/common/NormalImage";
import { FC } from "react";
import { Data } from "@/entity/service/home";

import style from "./HomeKeyword.module.scss";
import WbIcon from "@/components/common/Icon";

type HomeKeywordProps = {
  data?: Data;
  handleStocks?: any;
  handleCrux?: any;
};

const HomeKeyword: FC<HomeKeywordProps> = ({
  data,
  handleStocks,
  handleCrux,
}) => {
  return (
    <div className={style["home-keyword"]}>
      <ul>
        {data?.itemList?.map(
          (item, index) =>
            index < 4 && (
              <li key={index} onClick={(e) => handleCrux(item)}>
                <span className={style["home-keyword__section"]}>
                  {item.title}
                </span>
              </li>
            )
        )}
      </ul>
      <WbIcon
        onClick={handleStocks}
        icon="icon-icon_more3"
        size="10"
        color="#FFF"
        customClass={style["right-icon"]}
      />
    </div>
  );
};

export default HomeKeyword;
