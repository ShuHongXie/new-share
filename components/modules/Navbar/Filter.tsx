import { FC, memo } from "react";
import { Data } from "@/entity/service/home";

import style from "./Filter.module.scss";
import { Case, When } from "@/components/common/When";
import FilterNormal from "./FilterNormal";
import { FilterParams } from "@/entity/business/search";
import WbIcon from "@/components/common/Icon";

type FilterProps = {
  data: any;
  onClose: () => void;
};

const Filter: FC<FilterProps> = memo(({ data, onClose }) => {
  console.log(data);

  return (
    <div className={style.filter}>
      <div className={style["filter-header"]}>
        <WbIcon
          icon="icon-btn_close"
          size={42}
          onClick={() => onClose()}
        ></WbIcon>
      </div>
      <div className={style["filter-content"]}>
        {data.map((item: FilterParams) => (
          <When key={item.value}>
            <Case whenIf={!["minPrice", "maxPrice"].includes(item.value)}>
              <FilterNormal data={item}></FilterNormal>
            </Case>
          </When>
        ))}
      </div>
      <div className={style["filter-footer"]}></div>
    </div>
  );
});

export default Filter;
