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

const Home: NextPage = (props) => {
  const [placeholderList, setPlaceholderList] = useState<PlaceholderItem[]>([]);
  useEffect(() => {
    (async () => {
      const data = await getRecommendTag({
        moduleCode: 0,
        configType: 11,
      });
      console.log(data);
      setPlaceholderList(data);
    })();
  }, [props]);

  return (
    <div>
      <Head>
        <title>万表二手表</title>
      </Head>
      <div className={homeStyle.home}>
        <HomeHeader></HomeHeader>
        <Tabbar active="首页" />
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const data = await getHomeDataNew(
    {
      platform: 2,
    },
    context
  );

  return { props: { data } };
};

export default Home;
