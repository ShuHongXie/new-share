import NormalImage from "@/components/common/NormalImage";
import { FC, memo } from "react";
import { Data } from "@/entity/service/home";

import style from "./Filter.module.scss";
import WbIcon from "@/components/common/Icon";
import { Popup } from "antd-mobile";

type FilterProps = {
  visible: boolean;
};

const Filter: FC<FilterProps> = memo(({ visible = true }) => {
  return (
    <Popup
      visible={visible}
      onMaskClick={() => {
        // setVisible4(false);
      }}
      position="right"
      bodyStyle={{ width: "88vw" }}
    >
      <div className={style.filter}></div>
    </Popup>
  );
});

export default Filter;
