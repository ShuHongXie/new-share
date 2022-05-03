export interface SearchCondition {
  tagList?: List[];
  qualityList?: List[];
  brandSeriesList?: BrandSeriesList[];
  hotBrandList?: HotBrandList[];
  disList?: DisList[];
  watchModuleList?: List[];
  class?: string;
  zyypList?: List[];
  suitableCrowdList?: List[];
}

export interface BrandSeriesList {
  seriesCode?: number;
  seriesName?: string;
  imageUrl?: string;
  class?: string;
}

export interface DisList {
  name?: string;
  class?: string;
  value?: string | number;
  label?: string;
}

export interface HotBrandList {
  pinyinName?: null;
  cnName?: string;
  brandUrl?: null;
  enName?: string;
  mainId?: null;
  class?: string;
  cnFirstWord?: string;
  logoImageUrl?: string;
  brandCode?: number;
}

export interface List {
  code?: string;
  name?: string;
  class?: any;
  desc?: string;
}
