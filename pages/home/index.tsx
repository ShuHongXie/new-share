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
import {
  getHomeDataNew,
  getRecommendTag,
  getHomeRecommendList,
} from "@/service/home";

import style from "./index.module.scss";

import { PaginationProps } from "@/entity/config/props";

import List from "@/components/common/List";
import Good from "@/components/modules/Panel/Good";
import SearchBar from "@/components/common/SearchBar";

type Params = PaginationProps<{
  page: number;
  size: number;
}>;

const Search: NextPage = ({
  homeData,
  recommendList,
  pager,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  // const [placeholderList, setPlaceholderList] = useState<PlaceholderItem[]>([]);
  // const [backgroundColorValue, setBackgroundColorValue] = useState("");
  // const [params, setParams] = useState<Params>({
  //   pagination: {
  //     page: 1,
  //     size: 10,
  //   },
  //   status: "LOAD",
  //   total: 10,
  // });

  console.log("------------重新渲染");

  useEffect(() => {
    console.log(recommendList);

    // useEffect(() => {}, []);
  }, []);

  return (
    <div>
      <Head>
        <title>搜索商品</title>
      </Head>
      <div className={style["search"]}></div>
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

export default Search;
