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
import { useCallback, useEffect, useState } from "react";
import { getHomeDataNew, getRecommendTag } from "@/service/home";

import style from "./index.module.scss";
import { PlaceholderItem, Content, Data } from "@/entity/service/home.d";

import Tabbar from "@/components/modules/Tabbar";
import HomeHeader from "./modules/HomeHeader";
import HomeBanner from "./modules/HomeBanner";
import HomeAdvert from "./modules/HomeAdvert";
import HomeNavigation from "./modules/HomeNavigation";
import HomeKeyword from "./modules/HomeKeyword";
import HomeToolbar from "./modules/HomeToolbar";
import ListTitle from "@/components/modules/Card/ListTitle";

const Home: NextPage = ({
  homeData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [placeholderList, setPlaceholderList] = useState<PlaceholderItem[]>([]);
  const [backgroundColorValue, setBackgroundColorValue] = useState("");
  console.log("------------重新渲染", placeholderList, homeData);
  useEffect(() => {
    // 获取搜索栏placeholder列表
    (async () => {
      const data = await getRecommendTag({
        moduleCode: 0,
        configType: 11,
      });
      setPlaceholderList(data);
      // 初始化背景颜色
      setBackgroundColorValue(
        homeData.content[0].data.itemList
          ? homeData.content[0].data.itemList[0].bgColor
          : ""
      );
    })();
  }, []);

  const handleLink = useCallback(() => {}, []);
  const swiperChange = useCallback(() => {}, []);

  return (
    <div>
      <Head>
        <title>万表二手表</title>
      </Head>
      <div className={style["home"]}>
        <HomeHeader
          searchPlaceholder={placeholderList}
          bgImageUrl={homeData?.bgImageUrl}
        ></HomeHeader>
        {homeData.content.map((item: Content, index: number) => (
          <section
            key={index}
            className={[
              style["home-section"],
              [1].includes(item.type as number) ? style["bg"] : "",
            ].join(" ")}
          >
            {/* 轮播区域 */}
            {item.type === 1 && (
              <HomeBanner
                data={item.data!.itemList}
                code={item.code}
                isBackground={index < 3 && !homeData.bgImageUrl}
                handleLink={handleLink}
                swiperChange={swiperChange}
              />
            )}
            {/* 广告区域 */}
            {item.type === 2 && <HomeAdvert data={item.data} />}
            {/* 导航栏入口区域 */}
            {item.type === 11 && <HomeNavigation data={item.data} />}
            {/* 快速查表区域 */}
            {item.type === 17 && <HomeKeyword data={item.data} />}
            {/* 图标标识区域 */}
            {item.type === 12 && <HomeToolbar data={item.data} />}
          </section>
        ))}
        {/* 为你推荐 */}
        <ListTitle
          title="为您推荐"
          subTitle="RECOMMENDED FOR YOU"
          customClass={style["home-list-title"]}
        />
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
