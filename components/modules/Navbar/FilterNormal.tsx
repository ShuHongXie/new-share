import NormalImage from "@/components/common/NormalImage";
import { FC, memo } from "react";
import { Data } from "@/entity/service/home";

import style from "./FilterNormal.module.scss";
import WbIcon from "@/components/common/Icon";
import { Case, When } from "@/components/common/When";
import Selector from "@/components/common/Selector";

type FilterNormalProps = {
  data: any;
};

const FilterNormal: FC<FilterNormalProps> = memo(({ data }) => {
  const filterActive = (val: { label: string; cnName: string }) => {
    if (!val) {
      return "";
    }
    const { label, cnName } = val;
    return label || cnName;
  };

  return (
    <div className={style["dropdown__menu--inner"]}>
      <div className={style["dropdown__menu--title"]}>
        <h6>{data.label || data.cnName}</h6>
        <p>{filterActive(data.active)}</p>
        <When>
          <Case whenIf={data.event}>
            <div className={style["dropdown__menu--link"]}>
              {data.link} <WbIcon icon="icon-gengduo"></WbIcon>
            </div>
          </Case>
        </When>
      </div>
      <div className={style['dropdown__menu--radio"']}>
        {/* <Selector data={data.children}></Selector> */}
      </div>
    </div>
  );
});

export default FilterNormal;
