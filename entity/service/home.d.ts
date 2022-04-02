export interface PlaceholderItem {
  homeCode?: number;
  detail?: string;
  targetType?: number;
  targetUrl?: string;
  imageUrl?: unknown;
  imageWidth?: number;
  imageHeight?: number;
  ordinalNum?: number;
  status?: number;
  configType?: number;
  moduleCode?: number;
  moduleName?: string;
  simpleDetail?: string;
  listBrands?: unknown;
  platform?: number;
  platformName?: unknown;
  icoUrl?: unknown;
  colorUrl?: string;
  times?: number;
  listPlatform?: unknown;
  listRefId?: unknown;
  title?: string;
  extend?: unknown;
  codeBgcolor?: unknown;
  titleColor?: unknown;
  smdtColor?: unknown;
}

export interface RecommendData {
  list?: RecommendGood[];
  pager?: Pager;
}

export interface Pager {
  total?: number;
  size?: number;
  now?: number;
  class?: string;
}
export interface RecommendGood {
  uniqueNo?: null;
  seriesCode?: number;
  discount?: number;
  wbiaoPrice?: number;
  fxPrice?: null;
  videoId?: number;
  readCount?: number;
  canLease?: number;
  shareCodeStr?: string;
  belonging?: number;
  watchMaterialName?: string;
  price?: number;
  shareFav?: number;
  careCardDesc?: string;
  qualityCode?: number;
  activityForgift?: number;
  goodsName?: string;
  selected?: number;
  brandCode?: number;
  zyypTagImg?: string;
  models?: string;
  toAuction?: number;
  brandName?: string;
  suitableCrowd?: number;
  seriesName?: string;
  goodsClass?: number;
  pawnDate?: number;
  watchMaterial?: number;
  subStatus?: number;
  tags?: any;
  inCase?: number;
  qualityName?: string;
  watchModuleName?: string;
  shopImageUrl?: null;
  rentAmtPerDay?: number;
  leaseCode?: number;
  shareName?: string;
  showPlace?: number;
  status?: number;
  recommendShareName?: string;
  shareCode?: number;
  shopArea?: null;
  marketPrice?: number;
  shelfStatus?: number;
  forgiftDiscount?: string;
  shopName?: string;
  careCard?: number;
  subStatusName?: null;
  goodsSource?: null;
  brandLogoImageUrl?: string;
  goodsVideoInfo?: null;
  watchMaterialTagName?: string;
  imageUrl?: string;
  statusName?: string;
  sealInfo?: null;
  class?: string;
  goodsNo?: null;
  shopCode?: number;
  os?: number;
  salePrice?: number;
  overFixPriceDesc?: string;
  belongingName?: string;
  costPrice?: number;
  inZdb?: number;
  refresh?: number;
  watchModule?: number;
  modelAlias?: string;
  careCardDate?: number;
  agentPrice?: number;
  toRecycle?: number;
  newModel?: number;
  pawnBackDate?: number;
  shareTitle?: null;
  goodsNameLine?: string;
  createTime?: number;
  orderCode?: number;
  goodsTitle?: string;
  suitableCrowdName?: string;
  priceMin?: number;
}

export interface HomeData {
  templateStrategyId?: number;
  topBgImageUrl?: string;
  bgImageUrl?: string;
  topIconColor?: string;
  templateCode?: number;
  title?: string;
  class?: string;
  templateGroupId?: number;
  hashValue?: string;
  content?: Content[];
}

export interface Content {
  data?: Data;
  type?: number;
  hash?: string;
  updateTime?: number;
  updateTimeFormat?: Date;
  terminal?: number[];
  ordinalNum?: number;
  code?: string;
}

export interface Data {
  componentTitle?: string;
  hideTitle?: number | string;
  bgImageCode?: string;
  bgImageUrl?: string;
  carouselTime?: number;
  itemList?: ItemList[];
  styleType?: number;
  styleCategory?: number;
  imgWidth?: number;
  imgHeight?: number;
  goodsCodeList?: null;
  backgroundImageCode?: number | string;
  backgroundImageUrl?: string;
  textColor?: string;
  pagination?: Pagination;
  componentTitleColor?: string;
  subTitle?: string;
  subTitleColor?: string;
  hideSubTitle?: string;
  more?: DataMore;
  collectBgImage?: CollectBgImage;
  apiUrl?: string;
  imageList?: ImageList[];
  collectionType?: number;
  badge?: string;
  articleIdList?: number[];
  templateStrategyId?: number;
  topBgImageUrl?: string;
  templateCode?: number;
  topIconColor?: string;
  templateGroupId?: number;
}

export interface CollectBgImage {
  image?: number;
  imageUrl?: string;
  pageType?: number;
  pageParameter?: string;
  pageType1?: number;
  pageParameter1?: string;
  spPageType?: number;
  spParameter?: string;
  scode?: string;
}

export interface ImageList {
  bgImage?: number;
  bgImageUrl?: string;
  title?: string;
  titleColor?: string;
  subTitle?: string;
  subTitleColor?: string;
  img1?: Img1;
  more?: Img1Class;
  scode?: string;
}

export interface Img1 {
  image?: string;
  imageUrl?: string;
}

export interface Img1Class {
  pageType?: string;
  pageParameter?: string;
  pageType1?: string;
  pageParameter1?: string;
  spPageType?: string;
  spParameter?: string;
  image?: string;
  imageUrl?: string;
  title?: string;
  titleColor?: string;
}

export interface ItemList {
  ordinalNum?: number;
  image?: number;
  imageURL?: string;
  title?: string;
  bgColor?: string;
  pageType?: number;
  pageParameter?: string;
  pageType1?: number;
  pageParameter1?: string;
  targetUrl?: string;
  targetType?: number;
  spPageType?: number;
  spParameter?: string;
  scode?: string;
  visibility?: number;
  title1?: string;
  title2?: string;
  title3?: string;
  shareCode?: number;
  models?: string;
  brandName?: null | string;
  marketPrice?: number;
  salePrice?: number;
  seriesName?: string;
  overFixPriceDesc?: string;
  discount?: number;
  wbiaoPrice?: number;
  allTotal?: number;
  imageUrl?: string;
  class?: Class;
  brandCode?: number;
  nickName?: string;
  price?: number | null;
  type?: number;
  bgImage?: number;
  bgImageUrl?: string;
  title1Color?: string;
  subTitle1?: string;
  subTitle1Color?: string;
  title2Color?: string;
  subTitle2?: string;
  subTitle2Color?: string;
  more?: Img1Class;
  img1?: Img1Class;
  img2?: Img1Class;
  memberCode?: number;
  likeCount?: number;
  articleGoods?: null;
  avatar?: string;
  categoryName?: string;
  content?: string;
  commentCount?: number;
  likeYet?: number;
  masterUrl?: string;
  createTime?: number;
  viewCount?: number;
  id?: number;
  categoryId?: number;
}

export enum Class {
  CNWbiaoRecycleAPIInfoHomeHomeMainHeadlineInfo = "cn.wbiao.recycle.api.info.home.HomeMainHeadlineInfo",
  CNWbiaoSellerAPIInfoCollectV2CollectSummaryFtIndexInfo = "cn.wbiao.seller.api.info.collect.v2.CollectSummaryFtIndexInfo",
  WbiaoContentAPIUgcInfoArticleListFtInfo = "wbiao.content.api.ugc.info.ArticleListFtInfo",
}

export interface DataMore {
  title?: string;
  titleColor?: string;
  bgColor?: string;
  pageType?: number;
  pageParameter?: string;
  pageType1?: number;
  pageParameter1?: string;
  spPageType?: number;
  spParameter?: string;
  scode?: string;
}

export interface Pagination {
  activate?: string;
  color?: string;
}
