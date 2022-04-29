import NormalImage from "@/components/common/NormalImage";
import { FC, memo } from "react";
import { Data } from "@/entity/service/home";

import style from "./DropDownMenu.module.scss";
import WbIcon from "@/components/common/Icon";
import { When, Case } from "@/components/common/When";

type DropDownMenuProps = {
  data: any;
  screenShow?: boolean; // 下拉栏目是否已经打开
  clickMenu: () => void;
};

const DropDownMenu: FC<DropDownMenuProps> = memo(
  ({ data, clickMenu, screenShow }) => {
    return (
      <div
        className={[
          style["dropdown-menu"],
          data.active ? style["dropdown-menu--active"] : "",
        ].join(" ")}
        onClick={clickMenu}
      >
        <span className={style["dropdown-menu__name"]}>{data.label}</span>
        <div className={style["dropdown-menu__tip"]}>
          <When>
            <Case whenIf={["comprehensive", "price"].includes(data.labelName)}>
              <WbIcon
                icon="icon-list_icon_sort_top"
                size="14"
                customClass={[
                  data.active ? style["menu-tip--active"] : "",
                  data?.mark?.down && screenShow
                    ? style["menu-tip--rotate"]
                    : "",
                ]}
              />
            </Case>
            <Case whenElseIf={["hot"].includes(data.labelName)}></Case>
            <Case whenElse>
              <WbIcon
                icon="icon-filter"
                size="18"
                customClass={[data.active ? style["menu-tip--active"] : ""]}
              />
            </Case>
          </When>
        </div>
      </div>
    );
  }
);

export default DropDownMenu;
