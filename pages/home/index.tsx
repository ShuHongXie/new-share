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
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  getHomeDataNew,
  getRecommendTag,
  getHomeRecommendList,
} from "@/service/home";
import useScrollBottom from "@/hooks/useScrollToBottom";

import style from "./index.module.scss";
import {
  PlaceholderItem,
  Content,
  RecommendGood,
} from "@/entity/service/home.d";

import { PaginationProps } from "@/entity/config/props";

import Tabbar from "@/components/modules/Tabbar";
import HomeHeader from "./modules/HomeHeader";
import HomeBanner from "./modules/HomeBanner";
import HomeAdvert from "./modules/HomeAdvert";
import HomeNavigation from "./modules/HomeNavigation";
import HomeKeyword from "./modules/HomeKeyword";
import HomeToolbar from "./modules/HomeToolbar";
import ListTitle from "@/components/modules/Card/ListTitle";
import List from "@/components/common/List";
import Good from "@/components/modules/Panel/Good";

const Home: NextPage = ({
  homeData,
  recommendList,
  pager,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [placeholderList, setPlaceholderList] = useState<PlaceholderItem[]>([]);
  const [backgroundColorValue, setBackgroundColorValue] = useState("");
  const [count, setCount] = useState(0);
  const [list, setList] = useState(recommendList);
  // 请求逻辑聚合
  const [Pagination, setPagination] = useState<PaginationProps>();
  const [params, setParams] = useState<PaginationProps>({
    page: 1,
    size: 10,
    status: "LOAD",
    total: 10,
  });

  const getRecommendList = useCallback(async () => {
    console.log("获取-----------------------");
    setParams((params) => {
      return { ...params, status: "LOAD" };
    });
    try {
      const { page, size } = params;
      const { list: recommendList, pager } = await getHomeRecommendList({
        page,
        size,
      });
      setList((list: RecommendGood[]) => [...list, ...recommendList]);
      console.log(recommendList);
    } catch (e) {
      setParams((params) => {
        return { ...params, status: "ERROR" };
      });
    }
  }, []);

  useEffect(() => {
    console.log(recommendList);
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

  useEffect(() => {
    console.log("-----------依赖的key变化");
    if (params.page !== 1) {
      getRecommendList();
    }
  }, [params.page]);

  typeof window !== `undefined` &&
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useScrollBottom({
      scrollBottomDir: 30,
      executeArriveFn: () => {
        setParams((params) => {
          console.log("调用了", params.page);
          return {
            ...params,
            page: ++params.page,
          };
        });
      },
      loading: ["LOAD", "WAIT"].includes(params.status),
    });

  const handleLink = useCallback(() => {}, []);
  const swiperChange = useCallback(() => {}, []);

  const listChild = useMemo(
    () => (
      <>
        {list.map((item: RecommendGood) => (
          <Good
            key={item.shareCode}
            data={item}
            path={`/share/${item.shareCode}.html`}
            type="danger"
            scene="list"
          />
        ))}
      </>
    ),
    [list.length]
  );

  return (
    <div>
      <Head>
        <title>万表二手表</title>
      </Head>
      <div className={style["home"]}>
        <HomeHeader
          searchPlaceholder={placeholderList}
          backgroundColorValue={backgroundColorValue}
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
        <div onClick={() => setCount((x) => (x += 1))}>{count}</div>
        {/* 为你推荐 */}
        <ListTitle
          title="为您推荐"
          subTitle="RECOMMENDED FOR YOU"
          customClass={style["home-list-title"]}
        />
        {/* 底部商品列表 */}
        <List total={pager.total} status={params.status}>
          {listChild}
          {/* <>
            {list.map((item: RecommendGood) => (
              <Good
                key={item.shareCode}
                data={item}
                path={`/share/${item.shareCode}.html`}
                type="danger"
                scene="list"
              />
            ))}
          </> */}
        </List>
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
  // 分页列表
  const pagination = {
    page: 0,
    size: 10,
  };
  const { list: recommendList, pager } = await getHomeRecommendList(
    pagination,
    context
  );
  console.log(pager);
  /*
  pager
  total: 221,
  size: 10,
  now: 0,
  */
  return { props: { homeData, recommendList, pager } };
};

export default Home;
