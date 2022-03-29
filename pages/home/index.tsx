/*
 * @Author: 谢树宏
 * @Date: 2022-03-09 14:13:13
 * @LastEditors: 谢树宏
 * @LastEditTime: 2022-03-24 17:22:33
 * @FilePath: /new-share/pages/index.tsx
 */
import type {
  NextPage,
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import Head from "next/head";
import { useEffect, useState } from "react";

import Tabbar from "@/components/modules/Tabbar";
import HomeHeader from "./modules/HomeHeader";
import { Swiper, Toast } from "antd-mobile";
import { getHomeDataNew, getRecommendTag } from "@/service/home";

import homeStyle from "./index.module.scss";
import { PlaceholderItem } from "@/entity/service/home.d";

const colors = ["#ace0ff", "#bcffbd", "#e4fabd", "#ffcfac"];

const items = colors.map((color, index) => (
  <Swiper.Item key={index}>
    <div
      className={homeStyle.content}
      style={{ background: color }}
      onClick={() => {
        Toast.show(`你点击了卡片 ${index + 1}`);
      }}
    >
      {index + 1}
    </div>
  </Swiper.Item>
));

const Home: NextPage = ({
  homeData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [placeholderList, setPlaceholderList] = useState<PlaceholderItem[]>([]);
  const [backgroundColorValue, setBackgroundColorValue] = useState("");
  console.log("------------重新渲染", placeholderList);
  useEffect(() => {
    // 获取搜索栏placeholder列表
    (async () => {
      const data = await getRecommendTag({
        moduleCode: 0,
        configType: 11,
      });
      setPlaceholderList(data);
      // 初始化背景颜色
      // setBackgroundColorValue(
      //   homeData.content[0].data.itemList
      //     ? homeData.content[0].data.itemList[0].bgColor
      //     : ""
      // );
    })();
  }, []);

  return (
    <div>
      <Head>
        <title>万表二手表</title>
      </Head>
      <div className={homeStyle.home}>
        <HomeHeader
          searchPlaceholder={placeholderList}
          backgroundColorValue={backgroundColorValue}
          bgImageUrl={homeData?.bgImageUrl}
        ></HomeHeader>
        <Tabbar active="首页" />
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const homeData = await getHomeDataNew(
    {
      platform: 2,
    },
    context
  );

  return { props: { homeData } };
};

export default Home;
