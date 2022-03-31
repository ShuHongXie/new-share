import NormalImage from "@/components/common/NormalImage";
import { FC, useEffect, useState } from "react";
import { Content, ItemList, Data } from "@/entity/service/home";

import style from "./HomeNavigation.module.scss";
import { Swiper } from "antd-mobile";
import WbImage from "@/components/common/Image";

type HomeNavigationProps = {
  data?: Data;
  handleClickTag?: any;
};

const HomeNavigation: FC<HomeNavigationProps> = ({ data }) => {
  const [swiperList, setSwiperList] = useState<Array<Array<ItemList>>>([]);
  useEffect(() => {
    if (data?.itemList?.length) {
      // 数组切分，每屏10个
      const list = [];
      for (let i = 0; i < data.itemList!.length; ) {
        // 注意：这里与for循环不太一样的是，没有i++
        list.push(data.itemList.slice(i, (i += 10)));
      }
      setSwiperList(list);
    }
  }, [data]);
  const handleClickTag = (item: ItemList) => {};
  const items = swiperList?.map((item, index) => (
    <Swiper.Item key={index}>
      {item?.map((child, index) => (
        <div
          key={index}
          onClick={(e) => handleClickTag(child)}
          className={style["home-navigation__item"]}
        >
          <WbImage
            src={child.imageURL}
            width={72}
            height={50}
            objectFit="contain"
          />
          <p
            style={{ color: data?.textColor }}
            className={style["home-navigation__title"]}
          >
            {child.title}
          </p>
        </div>
      ))}
    </Swiper.Item>
  ));

  return (
    <div className={style["home-navigation"]}>
      {swiperList.length && (
        <Swiper
          style={{
            "--border-radius": "8px",
            "--track-padding": " 0 0 24px",
          }}
          indicatorProps={{
            // @ts-ignore
            color: "#999",
            "--active-dot-color": "#333",
          }}
          defaultIndex={3}
        >
          {items}
        </Swiper>
      )}
    </div>
  );
};

export default HomeNavigation;
