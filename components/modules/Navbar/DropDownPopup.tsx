import NormalImage from "@/components/common/NormalImage";
import { FC, Key, memo } from "react";

import style from "./DropDownPopup.module.scss";
import WbIcon from "@/components/common/Icon";
import { Case, When } from "@/components/common/When";
import WbSvgIcon from "@/components/common/SvgIcon";

import { Screen, ScreenItem } from "@/entity/business/search";

type DropDownPropsProps = {
  // tagList: string[];
  // title?: string;
  // showDelete?: boolean;
  // showItemDelete?: boolean;
  // delItem?: (tag: string) => void;
  // selectTag?: any;
  // deleteTag?: any;
  // styleBg: any;
  data: Screen;
  value: boolean;
  screenClick: (item?: ScreenItem, index?: number) => void;
};

const DropDownPopup: FC<DropDownPropsProps> = memo(
  ({ children, data, value, screenClick }) => {
    return (
      <When>
        <Case whenIf={value}>
          <section className={style["dropdown-popup"]}>
            <div
              onClick={() => screenClick()}
              className={style["dropdown-popup__background"]}
            ></div>
            <div className={style["dropdown-popup__content"]}>
              {data.map((item: ScreenItem, index: number) => (
                <div
                  key={index}
                  className={[
                    style["dropdown-popup__item"],
                    item.active ? style["dropdown-popup__item--active"] : "",
                  ].join(" ")}
                  onClick={() => screenClick(item)}
                >
                  <When>
                    <Case whenIf={item.active}>
                      <WbSvgIcon
                        icon="icon-icon-publish-nav"
                        customClass={style["icon-publish-nav"]}
                      ></WbSvgIcon>
                    </Case>
                  </When>
                  <p>{item.label}</p>
                </div>
              ))}
            </div>
          </section>
        </Case>
      </When>
    );
  }
);

export default DropDownPopup;
