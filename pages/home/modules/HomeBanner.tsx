import { Swiper } from "antd-mobile";
import { FC } from "react";
import style from "./HomeBanner.module.scss";

import { ItemList } from "@/entity/service/home.d";
import WbImage from "@/components/common/Image";

type HomeBannerProps = {
  data?: ItemList[];
  code?: string;
  isBackground?: boolean;
  handleLink: any;
  swiperChange: any;
};

// 顶部下载App提示组件
const HomeBanner: FC<HomeBannerProps> = ({ data, code, handleLink }) => {
  const handleClickModular = (item: ItemList) => {
    const {
      pageType1,
      pageParameter1,
      scode = 0,
      targetUrl,
      targetType,
    } = item;
    handleLink({
      pageType1: pageType1 || targetType,
      pageParameter1: pageParameter1 || targetUrl,
      code: code,
      scode: scode,
    });
  };
  const items = data?.map((item, index) => (
    <Swiper.Item key={index}>
      <div
        onClick={(e) => handleClickModular(item)}
        className={style["swiper-item"]}
      >
        <WbImage src={item.imageUrl || item.imageURL} />
      </div>
    </Swiper.Item>
  ));

  return (
    <div className={style.swiper}>
      {data?.length && (
        <Swiper
          style={{
            "--border-radius": "8px",
          }}
          indicatorProps={{
            color: "white",
          }}
          defaultIndex={3}
        >
          {items}
        </Swiper>
      )}
    </div>
  );
};

export default HomeBanner;
