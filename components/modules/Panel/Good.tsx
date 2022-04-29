import { FC, memo, useState } from "react";
import { toMoney } from "@/utils";
import WbTag from "@/components/common/Tag";
import { RecommendGood } from "@/entity/service/home";

import style from "./Good.module.scss";
import Link from "next/link";
import WbImage from "@/components/common/Image";
import NormalImage from "@/components/common/NormalImage";

type HomeAdvertProps = {
  path?: string; //
  type?: string; // warning  warning' | 'danger,
  scene?: string; // 'list'  'discount' | 'count-down'
  data: RecommendGood;
  isShowStatus?: boolean; // false  是否显示竞拍标签，默认不显示
  showDiscount?: boolean; // true  是否显示折扣标签，默认显示
  showPriceType?: number; // 0 目前是区分竞拍和正常的商品价格样式，默认是正常的
  showStatus?: boolean; //  false 控制是否显示遮罩层，例如已售出这些状态,默认不显示
  jumpPath?: string;
  goodType?: string | number; // 0 // 此是区分商品的样式，0代表表库，1代表竞拍的
  endTime?: number | string; // new Date().getTime()
  showAuctionStatus?: boolean; // false
  adInfo?: any; // Array 广告列表
  goodsIndex?: number; // 0  // 这个是商品列表数组的下标，是为了每六个商品，显示一张广告图
  handleJumpDynamic?: any;
  index?: number;
};

const SIZE: { [key: string]: number[] } = {
  list: [175, 215],
  discount: [134, 165],
  "count-down": [134, 165],
};

const Good: FC<HomeAdvertProps> = memo(
  ({
    scene = "list",
    goodsIndex = 0,
    path = "",
    data = {},
    adInfo,
    handleJumpDynamic,
    showStatus = false,
    goodType,
    showAuctionStatus,
    showPriceType = 0,
    isShowStatus,
    showDiscount = true,
    type = "warning",
  }) => {
    console.log("渲染了Good组件");

    const [goodClass, setGoodClass] = useState(`good__scene--${scene}`);
    const [goodSize, setGoodSize] = useState(() => {
      return `m_fill,w_${SIZE[scene][0] * 2},h_${
        SIZE[scene][1] * 2
      },g_center,limit=0`;
    });
    const filterToMoney = toMoney;
    return (
      <div className={[style["good"], style[goodClass]].join(" ")}>
        {goodsIndex % 6 === 0 && goodsIndex !== 0 && adInfo.length !== 0 && (
          <div
            onClick={(e) => handleJumpDynamic(adInfo[goodsIndex / 6 - 1])}
            className={style["good__adInfo"]}
          >
            <WbImage src={adInfo[goodsIndex / 6 - 1].imageUrl}></WbImage>
          </div>
        )}
        <Link href={path} passHref>
          <div className={style["good__wrapper"]}>
            <div className={style["good__cover"]}>
              {/* 图片  */}
              <div
                className={[
                  style["good__cover--img"],
                  style["is-${scene}"],
                ].join(" ")}
                style={{
                  opacity:
                    [2, 3].includes(data.status as number) &&
                    showStatus &&
                    goodType === 0
                      ? "0.46"
                      : "1",
                }}
              >
                <WbImage
                  width="100%"
                  height={215}
                  src={data.imageUrl}
                  parameter={goodSize}
                ></WbImage>
                {data.sealInfo && (
                  <div className={style["good__cover--sealInfo"]}>
                    <WbImage
                      src={data.sealInfo.sealIcon}
                      data-radius="4px"
                    ></WbImage>
                  </div>
                )}
                {data.goodsVideoInfo && !data.sealInfo && (
                  <div className={style["good__cover--video"]}>
                    <WbImage
                      origin-type="static"
                      src={"mobile/wbshare/goodList--video.png"}
                    ></WbImage>
                  </div>
                )}
              </div>
              {/* status 状态 1-展售中 2-已售出 3-已下架 */}
              {[2, 3].includes(data.status as number) &&
                showStatus &&
                goodType === 0 && (
                  <div className={style["good__cover--mask"]}>
                    <div className={style["good__cover--mask-center"]}>
                      <div>
                        <p>
                          {data.status === 2
                            ? "已售出"
                            : data.status === 3
                            ? "已下架"
                            : "已结束"}
                        </p>
                        <span v-if="data.status === 2">sold out</span>
                      </div>
                    </div>
                  </div>
                )}
              {/* status 状态 1.未开始，2.竞拍中，3.已截拍 (这是竞拍的)  */}
              {showAuctionStatus && (
                <div className={style["good__cover--mask"]}>
                  <div className={style["good__cover--mask-center"]}>
                    <div>
                      <p>已截拍</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div
              className={[
                style["good__content"],
                scene === "list" ? style["is-padding"] : "",
              ].join(" ")}
            >
              {/* 类型：列表 */}
              {scene === "list" && (
                <div className={style["good__content--mainly"]}>
                  {/* 价格 */}
                  <div
                    className={[
                      style["good__content--price"],
                      style[`is-${scene}`],
                      style[`is-${type}`],
                    ].join(" ")}
                  >
                    {showPriceType === 0 && (
                      <span className={style["good__content--price--tag"]}>
                        认证闲置
                      </span>
                    )}
                    {showPriceType === 0 && (
                      <strong
                        className={[
                          [2, 3].includes(data.status as number)
                            ? style["good__content--SaleOut"]
                            : "",
                        ].join(" ")}
                      >
                        {filterToMoney(data.price as number)}
                      </strong>
                    )}

                    {showPriceType === 0 && (
                      <span className={style["is-through"]}>
                        {filterToMoney(data.marketPrice as number)}
                      </span>
                    )}

                    {showPriceType === 1 && (
                      <p className={style["good__content--auctionPriceText"]}>
                        当前价
                      </p>
                    )}
                    {showPriceType === 1 && (
                      <p className={style["good__content--auctionPrice"]}>
                        {data.priceMax
                          ? filterToMoney(data.priceMax)
                          : filterToMoney(data.priceMin as number)}
                      </p>
                    )}
                  </div>
                  {/* 标题 */}
                  <div
                    className={[
                      style["good__content--title"],
                      [2, 3].includes(data.status as number) && goodType === 0
                        ? style["good__content--SaleOut"]
                        : "",
                    ].join(" ")}
                  >
                    {isShowStatus && (
                      <WbTag
                        data={
                          data.status === 1
                            ? "未开始"
                            : data.status === 2
                            ? "竞拍中"
                            : "竞拍中"
                        }
                        plain={true}
                        type="danger"
                        size="mini"
                      />
                    )}
                    {data.shareName || data.auctionName}
                  </div>
                  {/* 打折 倒计时  */}
                  <div className={style["good__tags"]}>
                    {data.zyypTagImg && (
                      <NormalImage
                        className={style["good__tags--zyyp"]}
                        src={data.zyypTagImg}
                      />
                    )}
                    {[2, 3].includes(data.status as number) &&
                    !showStatus &&
                    goodType === 0 ? (
                      <WbTag data="已售出" size="mini" bold type="info" />
                    ) : (
                      <>
                        {showDiscount && data.overFixPriceDesc && (
                          <WbTag
                            type={
                              [2, 3].includes(data.status as number)
                                ? "info"
                                : type
                            }
                            data={data.overFixPriceDesc}
                            size="mini"
                          />
                        )}
                        {data.watchMaterialTagName && (
                          <WbTag
                            data={data.watchMaterialTagName}
                            size="mini"
                            bold
                          />
                        )}
                        {/* {data.tags.map((item, index: number) => (
                          <WbTag
                            key={index}
                            data={item.tagName}
                            type={
                              [2, 3].includes(data.status as number) &&
                              goodType === 0
                                ? "info"
                                : "cancel"
                            }
                            size="mini"
                            bold
                          />
                        ))} */}
                      </>
                    )}
                  </div>
                </div>
              )}
              {/* 类型：大家都在看 & 我在看 */}
              {(scene === "discount" || scene === "count-down") && (
                <>
                  {/* <div className={style["good__content--tag"]}>
                    <WbTag
                      type={type}
                      data={
                        goodType === 0
                          ? `${data.discount}折`
                          : `${CountDown.hours}:${CountDown.minutes}:${CountDown.seconds}`
                      }
                      customStyle={
                        goodType === 0
                          ? {
                              padding: "1px 16px 2px 16px",
                              "border-radius": "50px",
                            }
                          : {
                              padding: "0px 7px 0px 19px",
                              "border-radius": "50px",
                            }
                      }
                      showAuctionIcon={goodType !== 0}
                      size="small"
                      radius
                      bold
                    />
                  </div> */}
                  {/* 价格 */}
                  <div
                    className={[
                      style["good__content--price"],
                      style[`is-${type}`],
                      style[`is-${scene}`],
                    ].join(" ")}
                  >
                    <strong>
                      {filterToMoney(
                        goodType === 0
                          ? data.price
                          : goodType === 1
                          ? data.priceMin
                          : ""
                      )}
                    </strong>
                    <span>{filterToMoney(data.marketPrice)}</span>
                  </div>
                  {/* 标题 */}
                  <div
                    className={[
                      style["good__content--title"],
                      style[`is-${scene}`],
                      style[`is-${type}`],
                    ].join()}
                  >
                    {data.brandName}·{data.suitableCrowdName}
                    {data.watchModuleName}
                  </div>
                </>
              )}
            </div>
          </div>
        </Link>
      </div>
    );
  }
);

export default Good;
