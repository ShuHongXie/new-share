import {
  getSearhKeyInfo,
  getSearhConditionInfo,
  getListAllBrandsGroup,
} from "@/service/search";
import { obtainObject } from "@/utils";
import { useState } from "react";
import { Comprehensive, FilterParams } from "@/entity/business/search";
import { BrandList } from "@/entity/service/brand";
import {
  BrandSeriesList,
  DisList,
  HotBrandList,
  List,
  SearchCondition,
} from "@/entity/service/search";
import { useRouter } from "next/router";

type GoodFilterProps = {
  comprehensive: Comprehensive;
};

type IncludesList = {
  value?: string | number;
  label?: string;
};

type FilterData = {
  active?: string;
  value?: string;
  label?: string;
  children?: any;
};

export default function useGoodFilter({ comprehensive }: GoodFilterProps) {
  const [filterData, setFilterData] = useState<FilterData[]>([]);
  const [filterBrand, setFilterBrand] = useState<BrandList[]>();
  const router = useRouter();
  // 打开筛选
  const filter = async () => {
    console.log("点击了filter");
    if (filterData.length) return;
    let hotBrandList = [];
    const msgList: SearchCondition =
      (await getSearhConditionInfo(
        obtainObject({
          now: 0,
          size: 10,
          sort: "def",
          kw: comprehensive.searchVal,
          qpt: new Date().getTime(),
          b: comprehensive.brandCode,
          et: 3,
        })
      )) || [];
    // 前6个热门品牌
    hotBrandList = msgList.hotBrandList
      ? msgList.hotBrandList?.length > 6
        ? msgList.hotBrandList.slice(0, 6)
        : msgList.hotBrandList
      : [];
    // 机芯类型
    const watchModuleList = msgList.watchModuleList
      ? msgList.watchModuleList
      : [];
    // 适用人群
    const suitableCrowdList = msgList.suitableCrowdList
      ? msgList.suitableCrowdList
      : [];
    // 成色
    const qualityList = msgList.qualityList ? msgList.qualityList : [];
    // 标签
    const tagList = msgList.tagList ? msgList.tagList : [];

    // 获取机芯类型
    const watchModuleLists: IncludesList[] = watchModuleList.map((i: List) => {
      return {
        value: i.code,
        label: i.name,
      };
    });
    // 获取适用人群
    const suitableCrowdLists: IncludesList[] = suitableCrowdList.map(
      (i: List) => {
        return {
          value: i.code,
          label: i.name,
        };
      }
    );
    // 获取前六个成色
    const qualityLists: IncludesList[] = [];
    let qualityListChildren: IncludesList[] = [];
    qualityListChildren = qualityList.map((item: List, index: number) => {
      if (index < 6) {
        qualityLists.push({
          value: item.code,
          label: item.name,
        });
      }
      return {
        ...item,
        label: item.name,
        value: item.code,
      };
    });
    // 获取前六个标签类型
    const tagLists: IncludesList[] = [];
    let tagListChildren: List[] = [];
    tagListChildren = tagList.map((item: List, index: number) => {
      if (index < 6) {
        tagLists.push({
          value: item.code,
          label: item.name,
        });
      }
      return {
        ...item,
        label: item.name,
        value: item.code,
      };
    });
    // 所有的折扣区间数据
    const disList = msgList.disList ? msgList.disList : [];
    disList.forEach((item) => (item.label = item.name));

    // 渠道信息
    const zyypList: IncludesList[] =
      msgList.zyypList?.map((i: List) => {
        return {
          value: i.code,
          label: i.name,
        };
      }) || [];

    let brandCodeItem: any = "";
    let watchModuleItem: any = "";
    let suitableCrowdItem: any = "";
    let tagItem: any = "";
    let qualityItem: any = "";
    let disItem: any = "";
    const zyypListItem: any = "";
    // 链接带折扣区间
    if (router.query.dis) {
      msgList.disList?.map((item, index: number) => {
        if (item.value === Number(router.query.dis)) {
          disItem = item;
        }
      });
    }

    // 链接带品牌
    if (router.query.b) {
      msgList.hotBrandList?.map((item, index: number) => {
        if (item.brandCode === Number(router.query.b)) {
          brandCodeItem = item;
        }
      });
    }
    // 链接带机芯类型
    if (router.query.wm) {
      watchModuleLists?.map((item: IncludesList, index: number) => {
        if (item.value === Number(router.query.wm)) {
          watchModuleItem = item;
        }
      });
    }
    // 链接带适用人群
    if (router.query.suc) {
      suitableCrowdLists.map((item, index: number) => {
        if (item.value === Number(router.query.suc)) {
          suitableCrowdItem = item;
        }
      });
    }
    // 链接带成色
    if (router.query.qc) {
      qualityListChildren.map((item, index: number) => {
        if (item.value === Number(router.query.qc)) {
          qualityItem = item;
        }
      });
    }
    // 链接带标签
    if (router.query.tcs) {
      tagListChildren.map((item, index: number) => {
        if (item.value === Number(router.query.tcs)) {
          tagItem = item;
        }
      });
    }
    // 见臻优选渠道信息
    if (router.query.zyyp) {
      tagListChildren.map((item, index: number) => {
        if (item.value === Number(router.query.tcs)) {
          tagItem = item;
        }
      });
    }
    // 筛选条件
    let filter: FilterParams[] = [
      {
        active: zyypListItem,
        value: "zyypList",
        label: zyypList.length ? "渠道" : "",
        children: zyypList,
      },
      // 品牌
      {
        active: hotBrandList.length === 1 ? hotBrandList[0] : brandCodeItem,
        value: "brandCode",
        label: hotBrandList.length ? "品牌" : "",
        children: hotBrandList,
      },
      // 机芯类型
      {
        active: watchModuleItem,
        value: "watchModule",
        label: watchModuleLists.length ? "机芯类型" : "",
        children: watchModuleLists,
      },
      // 适用人群
      {
        active: suitableCrowdItem,
        value: "suitableCrowd",
        label: suitableCrowdLists.length ? "适用人群" : "",
        children: suitableCrowdLists,
      },
      // 最低价
      {
        active: "",
        value: "minPrice",
      },
      // 最高价
      {
        active: "",
        value: "maxPrice",
      },
      // 成色
      {
        active: qualityItem,
        value: "qualityCode",
        label: qualityList.length ? "成色" : "",
        link: qualityList.length > 6 ? "全部" : "",
        event: "",
        children: qualityLists,
      },
    ];
    if (msgList.hotBrandList!.length > 6) {
      const brandCodeFilter = filter.find((item) => item.value === "brandCode");
      brandCodeFilter!.link = "全部品牌";
      const brand =
        (await getListAllBrandsGroup({
          modelType: 3,
        })) || [];
      setFilterBrand(brand || []);
      brandCodeFilter!.event = () => {
        // this.$refs.filter.showType(1)
      };
    }
    if (tagList.length > 0) {
      filter.push(
        // 标签类型
        {
          active: tagItem,
          value: "tagCodeSp",
          label: tagList.length ? "标签类型" : "",
          link: tagList.length > 6 ? "全部" : "",
          event:
            tagList.length > 6
              ? () => {
                  // this.List.select = tagListChildren;
                  // this.$refs.filter.showType(2);
                }
              : "",
          children: tagLists,
        }
      );
    }
    // 折扣区间
    if (disList.length > 0) {
      filter.push({
        active: disItem,
        value: "disp",
        label: "折扣区间",
        link: disList.length > 6 ? "全部" : "",
        event: null,
        children: disList,
      });
    }
    // 在品牌详情页要直接加载系列出来
    // if (!showBrand || hotBrandList.length === 1) {
    //   const value = {
    //     brandCode: this.brandCode || hotBrandList[0]?.brandCode
    //   }
    //   this.chooseItem(value, false)
    // }
    if (comprehensive.priceMin || comprehensive.priceMax) {
      let MinIndex: number = -1;
      filter.map((item, index) => {
        if (item.value === "minPrice") {
          MinIndex = index;
        }
      });
      let MaxIndex: any = "";
      filter.map((item, index) => {
        if (item.value === "maxPrice") {
          MaxIndex = index;
        }
      });
      const tempFilter = filter.concat();
      tempFilter[MinIndex] = {
        active: comprehensive.priceMin,
        value: "minPrice",
      };
      tempFilter[MaxIndex] = {
        active: comprehensive.priceMax,
        value: "maxPrice",
      };
      filter = tempFilter;
    }
    const seriesIndex = filter.findIndex((item) => item.value === "seriesCode");
    if (!comprehensive.seriesCode && seriesIndex !== -1) {
      filter[1].active = "";
    }
    setFilterData(filter);
  };

  return { filterData, filter };
}
