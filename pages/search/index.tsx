import { FC, memo, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Data } from "@/entity/service/home";

import style from "./index.module.scss";
import useDebounce from "@/hooks/useDebounce";
import SearchBar from "@/components/common/SearchBar";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getSearhKeyInfo } from "@/service/search";
import SearchTag from "@/components/modules/Card/SearchTag";

type SearchProps = {
  data?: Data;
  showResult: boolean;
};

const matchingQueryForShowResult = (query: { [key: string]: any }) =>
  Object.keys(query).length && query.w;

const Search: FC<SearchProps> = memo(({ showResult }) => {
  return (
    <div className={style["search"]}>
      {/* 搜索框 */}
      {/* <SearchBar
        search={handleSearch}
        clear={handleClearSearch}
        click={handleClickSearch}
        backEvent={handleClickSearch}
        placeholder={Search.placeholder}
        v-model="comprehensive.searchVal"
        showCancel={false}
        onlyClick={!!showResult}
        focus={!showResult}
        showSearch={!showResult}
        searchNoVal={searchNoVal}
        back-event={showResult && shopCode}
        class="search__inner"
        haveBack
      ></SearchBar> */}
      {showResult ? (
        <>
          <SearchTag></SearchTag>
        </>
      ) : (
        <></>
      )}
    </div>
  );
});

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  // 热门搜索的词
  const { hotList: hotSearchList } = await getSearhKeyInfo(
    {
      pager: {
        now: 0,
        size: 0,
        total: 0,
      },
    },
    context
  );
  console.log(hotSearchList);

  const showResult = matchingQueryForShowResult(context);
  // 分页列表
  // const pagination = {
  //   page: 0,
  //   size: 10,
  // };
  // const { list: recommendList, pager } = await getHomeRecommendList(
  //   pagination,
  //   context
  // );
  // console.log(pager);
  return { props: { hotSearchList, showResult } };
};

export default Search;
