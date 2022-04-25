import {
  FC,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/router";
import { Data } from "@/entity/service/home";

import style from "./index.module.scss";
import SearchBar from "@/components/common/SearchBar";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getSearhKeyInfo } from "@/service/search";
import SearchTag from "@/components/modules/Card/SearchTag";
import { listBrandSeriesByBrand } from "@/service/brand";
import { Brand } from "@/entity/service/brand.d";
import { NoticeBar, Toast } from "antd-mobile";
import TransitionBox from "@/components/common/TransitionBox";
import GoodSeries from "@/components/modules/Card/GoodSeries";

type SearchProps = {
  data?: Data;
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

const Search: FC<SearchProps> = memo(({ hotSearchList }) => {
  const router = useRouter();
  const showList = useRef(matchingQueryForShowResult(router.query)); // 是否展示结果

  const [seriesList, setSeriesList] = useState<Brand[]>([]); // 型号列表
  const [goodList, setGoodList] = useState([]); // 商品列表
  const [comprehensive, setComprehensive] = useState<Comprehensive>({});
  const [searchNoVal, setSearchNoVal] = useState(true);
  const [dropdownFilterActive, setDropdownFilterActive] = useState(false);
  const [recommendText, setRecommendText] = useState("");
  const [isShowDesc, setIsShowDesc] = useState(true);
  const [shopCode, setShopCode] = useState(""); // 店铺号
  const [historySearchList, setHistorySearchList] = useState<string[]>([]);
  const [placeholder, setPlaceholder] = useState("");

  useEffect(() => {
    showList.current = matchingQueryForShowResult(router.query);
    console.log("加载", showList, comprehensive);

    if (showList.current) {
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
        setDropdownFilterActive(false);
        // priceSortShow();
      }
      if (w === "") {
        setSearchNoVal(false);
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
      getHistory();
      // 店铺搜索逻辑，暂时不写
      setComprehensive({});
    }
  }, [router.query]);

  useEffect(() => {
    const searchVal = comprehensive.searchVal || "";
    setRecommendText(
      searchVal.length > 4 ? searchVal.substring(0, 4) + "..." : searchVal
    );
  }, [comprehensive.searchVal]);

  // 搜索
  const handleSearch = (searchValue: string) => {
    setSearchNoVal(true);
    // 如果没有关键字的情况
    if (!searchValue) {
      if (!placeholder) {
        // 1. 如果没有placeholder提示
        Toast.show("请输入品牌/型号/编号");
        return;
      } else {
        // 2. 如果有placeholder
        setComprehensive((prev) => ({ ...prev, searchVal: placeholder }));
      }
    } else {
      setHistory(searchValue);
    }
    const pathTemp: any = {
      path: "/search",
      query: { w: searchValue },
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
    showList.current = true;
  };

  // 获取搜索历史列表
  const getHistory = () => {
    const historySearchList = localStorage.getItem("searchList")
      ? JSON.parse(localStorage.getItem("searchList") || "")
      : [];
    setHistorySearchList((prev) => [...historySearchList]);
  };

  // 点击搜索框
  const handleClickSearch = () => {
    // this.List.filter = [];
    showList.current = false;
    setShopCode((router.query.shopCode as string) || "");
  };

  // 清空输入框
  const handleClearSearch = useCallback(() => {
    setComprehensive({});
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
  }, []);

  // 删除历史搜索
  const deleteTag = useCallback(() => {
    localStorage.removeItem("searchList");
    setHistorySearchList([]);
  }, []);

  // 设置历史记录
  const setHistory = (searchValue: string) => {
    if (!searchValue) return;
    const _cache = localStorage.getItem("searchList"); // 历史记录
    // 放进历史记录
    const searchList = _cache ? JSON.parse(_cache) : [];
    searchList.unshift(searchValue);
    localStorage.setItem(
      "searchList",
      JSON.stringify([...new Set(searchList)])
    );
  };

  // 点击历史或者热门标签搜索
  const selectTag = useCallback((tag: string) => {
    setComprehensive((prev) => ({
      ...prev,
      searchVal: tag,
    }));
    showList.current = true;
    setHistory(tag);
    const queryTemp = {
      w: tag,
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
  }, []);

  // 搜索框修改
  const changeValue = (value?: string) => {
    setComprehensive((prev) => ({ ...prev, searchVal: value }));
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
        onlyClick={!!showList.current}
        focus={!showList.current}
        showSearch={!showList.current}
        searchNoVal={searchNoVal}
        back-event={showList.current && shopCode}
        change={changeValue}
        haveBack
      ></SearchBar>
      {/* 历史搜索和热门搜索 */}
      {!showList.current ? (
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
              showDelete
            ></SearchTag>
          )}
        </>
      ) : (
        <>
          {/* 推荐提示 */}
          {isShowDesc && (
            <NoticeBar
              content={`为您推荐"闲置${recommendText}"表款,万表检测出证，假一赔三。`}
              color="alert"
              closeable
              onClose={() => setIsShowDesc(false)}
              style={{ "--font-size": "12px" }}
            />
          )}
          {/* 品牌选择 */}
          <TransitionBox data={seriesList}>
            {seriesList.map((item, index) => (
              <GoodSeries
                key={index}
                data={item}
                value={comprehensive.seriesCode}
                activeKey={"seriesCode"}
              />
            ))}
          </TransitionBox>
        </>
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
  return { props: { hotSearchList } };
};

export default Search;
