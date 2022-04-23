import { FC, memo, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Data } from "@/entity/service/home";

import style from "./index.module.scss";
import useDebounce from "@/hooks/useDebounce";
import SearchBar from "@/components/common/SearchBar";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getSearhKeyInfo } from "@/service/search";
import SearchTag from "@/components/modules/Card/SearchTag";
import { listBrandSeriesByBrand } from "@/service/brand";
import { Brand } from "@/entity/service/brand.d";

type SearchProps = {
  data?: Data;
  showResult: boolean;
  hotSearchList: string[];
};

type Comprehensive = {
  searchVal?: string | undefined;
  seriesCode?: number;
  brandCode?: string | number | undefined;
  priceMin?: number;
  priceMax?: number;
};

const matchingQueryForShowResult = (query: { [key: string]: any }) =>
  !!(Object.keys(query).length && query.w);

const Search: FC<SearchProps> = memo(({ showResult, hotSearchList }) => {
  const [showList, setShowList] = useState(showResult); // 是否展示结果
  const [seriesList, setSeriesList] = useState<Brand[]>([]); // 型号列表
  const [goodList, setGoodList] = useState([]); // 商品列表
  const [comprehensive, setComprehensive] = useState<Comprehensive>({});
  const [searchNoVal, setSearchNoVal] = useState(false);
  const [dropdownFilterActive, setDropdownFilterActive] = useState(false);
  const [shopCode, setShopCode] = useState("");
  const router = useRouter();
  console.log(router);

  useEffect(() => {
    console.log("加载", showList);

    if (showList) {
      setSeriesList([]);
      setGoodList([]);
      // 从url上获取参数
      const {
        w,
        brandName,
        b = "",
        ev,
        seriesCode,
        tagName,
        ap,
      } = router.query;
      // 加载系列
      const getBrand = async () => {
        const list = await listBrandSeriesByBrand({
          brandCode: b,
          keyword: w,
          seriesCode,
        });
        console.log(list);

        setSeriesList(list);
      };
      getBrand();
      console.log("------------------");

      if (seriesCode) {
        setComprehensive((prev) => ({
          ...prev,
          seriesCode: Number(seriesCode),
        }));
      }
      // setSeriesList(() => list);
      // 设置关键字
      setComprehensive((prev) => ({
        ...prev,
        searchVal: (w || tagName || brandName) as string,
        brandCode: b as string,
      }));
      // 带着价格区间过来
      if (router.query.ap) {
        const price = (router.query.ap as string).split("-");
        setComprehensive((prev) => ({
          ...prev,
          priceMin: Number(price[0]),
          priceMax: Number(price[1]),
        }));
        // dropdownFilterActive = true;
        setDropdownFilterActive(false);
        // priceSortShow();
      }
      if (w === "") {
        setSearchNoVal(false);
        // searchNoVal = false;
      }
      // 获取分页结果
      // this.dropPagination = mergeDeep({}, this.dropPagination, {
      //   now: 0,
      //   kw: tagName || w || "",
      //   //  时间戳
      //   qpt: new Date().getTime(),
      //   bs: this.$route.query.seriesCode || "",
      //   et: this.moduleCodeType,
      //   b: b,
      //   ap: this.$route.query.ap ? this.$route.query.ap : "",
      //   sc: this.$route.query.shopCode ? this.$route.query.shopCode : "",
      // });
    }
  }, [router.query]);

  // 设置历史记录
  const setHistory = () => {
    const _cache = localStorage.getItem("searchList"); // 历史记录
    const { searchVal } = comprehensive;
    // 放进历史记录
    const searchList = _cache ? JSON.parse(_cache) : [];
    searchList.unshift(searchVal);
    localStorage.setItem(
      "searchList",
      JSON.stringify([...new Set(searchList)])
    );
  };

  // 点击历史或者热门标签搜索
  const selectTag = (item) => {
    setComprehensive((prev) => ({
      ...prev,
      searchVal: item,
    }));
    setShowList(true);
    setHistory();
    const queryTemp = {
      w: comprehensive.searchVal,
    };
    if (shopCode) {
      queryTemp.shopCode = this.shopCode;
    }
    router.push({
      path: "/views/search",
      query: queryTemp,
    });
    this.shopCode = "";
  };

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
          <SearchTag
            tagList={shopSearchList}
            selectTag={selectTag}
            title="店内热搜"
          ></SearchTag>
          <SearchTag
            tagList={hotSearchList}
            selectTag={selectTag}
            title="热门搜索"
          ></SearchTag>
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

  const showResult = matchingQueryForShowResult(context.query);
  console.log(hotSearchList, showResult);
  return { props: { hotSearchList, showResult } };
};

export default Search;
