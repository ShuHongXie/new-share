// 查询页筛选原始数据段
export interface FilterData {
  [x: string]: any;
  [index?: number]: MenuItem;
}

export interface Screen {
  [x: string]: any;
  [index?: number]: ScreenItem;
}

export interface ScreenItem {
  label: string;
  active: boolean;
  value: {
    now: number;
    qpt: number;
    sort?: string;
    ap?: string;
  };
}

export interface FilterDataItem {
  label: string;
  labelName: string;
  value: any;
  arrow: boolean;
  screenShowNeed: boolean;
  isflag?: boolean;
  isPrice?: boolean;
  active: boolean;
  filter?: boolean;
  mark?: {
    up?: boolean;
    down?: boolean;
  };
  screenShowList?: Screen;
}

export interface Comprehensive {
  searchVal?: string | undefined;
  seriesCode?: number;
  brandCode?: string | number | undefined;
  priceMin?: number;
  priceMax?: number;
}

export interface FilterParams {
  active?: any;
  value: string;
  label?: string;
  children?: IncludesList[];
  link?: any;
  event?: any;
}
