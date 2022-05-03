export interface Brand {
  seriesCode?: number;
  seriesName?: string;
  imageUrl?: string;
  class?: string;
}

export interface BrandList {
  firstWord?: string;
  list?: List[];
}

export interface List {
  pinyinName?: string;
  cnName?: string;
  brandUrl?: string;
  enName?: string;
  mainId?: number;
  class?: string;
  cnFirstWord?: null;
  logoImageUrl?: string;
  brandCode?: number;
}
