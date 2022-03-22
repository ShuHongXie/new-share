/*
 * @Author: 谢树宏
 * @Date: 2022-03-22 09:10:35
 * @LastEditors: 谢树宏
 * @LastEditTime: 2022-03-22 11:35:12
 * @FilePath: /new-share/entity/service/common.d.ts
 */
export interface Menu {
  [x: string]: any;
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
