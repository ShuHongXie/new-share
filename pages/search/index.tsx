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
import { Toast } from "antd-mobile";

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
  const [shopCode, setShopCode] = useState(""); // 店铺号
  const [historySearchList, setHistorySearchList] = useState<string[]>([]);
  const [placeholder, setPlaceholder] = useState("");
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
      // dropPagination = mergeDeep({}, dropPagination, {
      //   now: 0,
      //   kw: tagName || w || "",
      //   //  时间戳
      //   qpt: new Date().getTime(),
      //   bs: router.query.seriesCode || "",
      //   et: moduleCodeType,
      //   b: b,
      //   ap: router.query.ap ? router.query.ap : "",
      //   sc: router.query.shopCode ? router.query.shopCode : "",
      // });
    } else {
      // 店铺搜索逻辑，暂时不写
    }
  }, [router.query]);

  // 搜索
  const handleSearch = () => {
    setSearchNoVal(true);
    setHistory();
    // 如果没有关键字的情况
    if (!comprehensive.searchVal) {
      if (!setPlaceholder) {
        // 1. 如果没有placeholder提示
        Toast.show("请输入品牌/型号/编号");
        return;
      } else {
        // 2. 如果有placeholder
        setComprehensive((prev) => ({ ...prev, searchVal: placeholder }));
        //comprehensive.searchVal = Search.placeholder;
      }
    }
    const pathTemp: any = {
      path: "/search",
      query: { w: comprehensive.searchVal },
    };
    // 当有店铺号的时候表示在店铺里面搜索的
    if (
      router.query.shopCode ||
      parseInt(router.query.shopCode as string) === 0
    ) {
      pathTemp.query.shopCode = router.query.shopCode;
      setShopCode(router.query.shopCode as string);
    }
    // 跳去搜索
    router.push(pathTemp);
    setShowList(true);
  };

  // 获取搜索历史列表
  const getHistory = () => {
    const historySearchList = localStorage.getItem("searchList")
      ? JSON.parse(localStorage.getItem("searchList") || "")
      : [];
    setHistorySearchList(historySearchList);
  };

  const handleClickSearch = () => {
    // this.List.filter = [];
    setShowList(false);
    getHistory();
    setShopCode((router.query.shopCode as string) || "");
  };

  // 清空输入框
  const handleClearSearch = () => {
    // this.List.filter = []
    let pathTemp: any = {
      pathname: "/search",
      query: {},
    };
    if (
      router.query.shopCode ||
      parseInt(router.query.shopCode as string) === 0
    ) {
      pathTemp.query.shopCode = router.query.shopCode;
      setShopCode((router.query.shopCode as string) || "");
    }
    router.push(pathTemp);
  };

  // 删除历史搜索
  const deleteTag = () => {
    localStorage.removeItem("searchList");
    setHistorySearchList([]);
  };

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
  const selectTag = (tag: string) => {
    setComprehensive((prev) => ({
      ...prev,
      searchVal: tag,
    }));
    setShowList(true);
    setHistory();
    const queryTemp = {
      w: comprehensive.searchVal,
      shopCode: "",
    };
    if (shopCode) {
      queryTemp.shopCode = shopCode;
    }
    router.push({
      pathname: "/search",
      query: queryTemp,
    });
    setShopCode("");
  };

  return (
    <div className={style["search"]}>
      {/* 搜索框 */}
      <SearchBar
        search={handleSearch}
        clear={handleClearSearch}
        click={handleClickSearch}
        backEventMethod={handleClickSearch}
        placeholder={placeholder}
        value={comprehensive.searchVal}
        onlyClick={!!showResult}
        focus={!showResult}
        showSearch={!showResult}
        searchNoVal={searchNoVal}
        back-event={showResult && shopCode}
        haveBack
      ></SearchBar>
      {!showResult ? (
        <>
          <SearchTag
            tagList={hotSearchList}
            selectTag={selectTag}
            title="热门搜索"
          ></SearchTag>
          {!shopCode && (
            <SearchTag
              tagList={historySearchList}
              deleteTag={deleteTag}
              selectTag={selectTag}
              title="历史搜索"
              show-delete
            ></SearchTag>
          )}
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
