export interface Menu extends Array {
  [index?: number]: MenuItem;
}
export interface MenuItem {
  imageWidth?: number;
  moduleCode?: number;
  ordinalNum?: number;
  listPlatform?: null;
  moduleName?: string;
  icoUrl?: string;
  targetType?: number;
  title?: string;
  configType?: number;
  noImageUrl?: string;
  platform?: number;
  imageHeight?: number;
  simpleDetail?: string;
  homeCode?: number;
  codeBgcolor?: null;
  listBrands?: null;
  titleColor?: null;
  imageUrl?: string;
  smdtColor?: null;
  detail?: string;
  platformName?: null;
  class?: string;
  targetUrl?: string;
  status?: number;
}
