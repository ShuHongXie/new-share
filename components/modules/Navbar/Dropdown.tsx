import { FC, memo, useState } from "react";
import dynamic from "next/dynamic";
import style from "./DropDown.module.scss";
import DropDownMenu from "./DropDownMenu";
import {
  FilterData,
  FilterDataItem,
  ScreenItem,
} from "@/entity/business/search";
const DropDownPopup = dynamic(() => import("./DropDownPopup"));
import { When, Case } from "@/components/common/When";

type DropDownProps = {
  // tagList: string[];
  // title?: string;
  // showDelete?: boolean;
  // showItemDelete?: boolean;
  // delItem?: (tag: string) => void;
  // selectTag?: any;
  // deleteTag?: any;
};

const DropDown: FC<DropDownProps> = memo(({ children }) => {
  const [selectIndex, setSelectIndex] = useState(-1);
  const [screenShow, setScreenShow] = useState(false);
  const [params, setParams] = useState<FilterDataItem[]>([
    {
      label: "综合",
      labelName: "comprehensive",
      value: {
        sort: "def",
      },
      arrow: true,
      screenShowNeed: true,
      isflag: false,
      active: false,
      mark: {
        up: false,
        down: false,
      },
      screenShowList: [
        {
          label: "综合",
          active: true,
          value: {
            now: 0,
            qpt: new Date().getTime(),
            sort: "def",
          },
        },
        {
          label: "价格高",
          active: false,
          value: {
            now: 0,
            qpt: new Date().getTime(),
            sort: "price:desc",
          },
        },
        {
          label: "价格低",
          active: false,
          value: {
            now: 0,
            qpt: new Date().getTime(),
            sort: "price:asc",
          },
        },
      ],
    },
    {
      label: "最热",
      labelName: "hot",
      active: false,
      value: {
        now: 0,
        qpt: new Date().getTime(),
        sort: "top",
      },
      arrow: false,
      screenShowNeed: false,
    },
    {
      label: "价格",
      labelName: "price",
      filter: false,
      arrow: true,
      screenShowNeed: true,
      isflag: false,
      active: false,
      isPrice: true,
      mark: {
        up: false,
        down: false,
      },
      value: {
        now: 0,
        qpt: new Date().getTime(),
        sort: "def",
      },
      screenShowList: [
        {
          label: "默认",
          active: true,
          value: {
            now: 0,
            qpt: new Date().getTime(),
            sort: "def",
            ap: "",
          },
        },
        {
          label: "1万以下",
          active: false,
          value: {
            now: 0,
            qpt: new Date().getTime(),
            ap: "0-10000",
          },
        },
        {
          label: "1-3万",
          active: false,
          value: {
            now: 0,
            qpt: new Date().getTime(),
            ap: "10000-30000",
          },
        },
        {
          label: "3-5万",
          active: false,
          value: {
            now: 0,
            qpt: new Date().getTime(),
            ap: "30000-50000",
          },
        },
        {
          label: "5-10万",
          active: false,
          value: {
            now: 0,
            qpt: new Date().getTime(),
            ap: "50000-100000",
          },
        },
        {
          label: "10万以上",
          active: false,
          value: {
            now: 0,
            qpt: new Date().getTime(),
            ap: "100000-0",
          },
        },
      ],
    },
    {
      label: "筛选",
      labelName: "filter",
      active: false,
      value: {},
      arrow: false,
      screenShowNeed: false,
    },
  ]);
  console.log(params);

  // tab点击
  const clickMenu = (index: number) => {
    const menuData = params.map((item, idx) =>
      idx === index
        ? {
            ...item,
            active: true,
            mark: { ...item?.mark, down: true },
          }
        : { ...item, mark: { ...item?.mark, down: false } }
    );
    setScreenShow(
      index === selectIndex
        ? !screenShow
        : params[index].screenShowNeed
        ? true
        : false
    );
    setParams(menuData);
    setSelectIndex(index);
  };

  // tab子列表点击
  const screenClick = (item?: ScreenItem, index?: number) => {
    if (!item) {
      setScreenShow(false);
      return;
    }
    // const menuData = params?[selectIndex].screenShowList.map((item, idx) =>
    //   idx === index ? { ...item, active: true } : item
    // );
    console.log(item, index);
  };

  return (
    <div className={style["dropdown"]}>
      {params.map((data: FilterDataItem, index: number) => (
        <DropDownMenu
          clickMenu={() => clickMenu(index)}
          screenShow={screenShow}
          key={data.labelName}
          data={data}
        ></DropDownMenu>
      ))}
      <DropDownPopup
        screenClick={(screenItem) => screenClick(screenItem, selectIndex)}
        data={
          selectIndex === -1 ? [] : params[selectIndex]?.screenShowList || []
        }
        value={screenShow}
      />
    </div>
  );
});

export default DropDown;
