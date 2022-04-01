import NormalImage from "@/components/common/NormalImage";
import { FC, memo, useState } from "react";
import { Data } from "@/entity/service/home";

import style from "./Good.module.scss";
import { NavBarProps } from "antd-mobile/es/components/nav-bar";

type HomeAdvertProps = {
  path: string // warning  warning' | 'danger,
  scene: string // 'list'  'discount' | 'count-down'
  data: any,
  isShowStatus: boolean // false  是否显示竞拍标签，默认不显示
  showDiscount: boolean // true  是否显示折扣标签，默认显示
  showPriceType: number // 0 目前是区分竞拍和正常的商品价格样式，默认是正常的
  showStatus: boolean //  false 控制是否显示遮罩层，例如已售出这些状态,默认不显示
  jumpPath: string
  goodType: string | number // 0 // 此是区分商品的样式，0代表表库，1代表竞拍的
  endTime: number | string // new Date().getTime() 
  showAuctionStatus: boolean // false
  adInfo: any // Array 广告列表
  goodsIndex: number // 0  // 这个是商品列表数组的下标，是为了每六个商品，显示一张广告图
  handleJumpDynamic: any
};

const Good: FC<HomeAdvertProps> = memo(({scene, goodsIndex, path, data, adInfo, handleJumpDynamic, showStatus, goodType, showAuctionStatus, showPriceType }) => {
  const [goodClass, setGoodClass] = useState(`good__scene--${scene}`);
  const [goodSize, setGoodSize] = useState('');
  cosnt filterToMoney = () => return 213
  return (
    <div className={[style['goods'], goodClass].join(' ')}>
     {
       goodsIndex % 6 === 0 && goodsIndex !== 0 && adInfo.length !== 0 && (<div
      
        onClick={ e => handleJumpDynamic(adInfo[goodsIndex / 6 - 1])}
        className={style["good__adInfo"]}
      >
        <WbImage src={adInfo[goodsIndex / 6 - 1].imageUrl}></WbImage>
      </div>)
     }
    <Link to={path} target="_self">
      <div className="good__wrapper">
        <div className="good__cover">
          {/* 图片  */}
          <div
            className={[style["good__cover--img"], style["is-${scene}"]].join(' ')}
            style={{
              opacity:
                [2, 3].includes(data.status) && showStatus && goodType === 0
                  ? '0.46'
                  : '1'
            }}
          >
            <WbImage
              src={data.imageUrl}
              parameter={goodSize}
              lazy-load
            ></WbImage>
            {
              data.sealInfo && (
                <div  className={style["good__cover--sealInfo"]}>
              <WbImage src={data.sealInfo.sealIcon} radius="4px"></WbImage>
            </div>
              )
            }
            {
              data.goodsVideoInfo && !data.sealInfo && (
                <div
              className={style["good__cover--video"]}
            >
              <WbImage
                origin-type="static"
                src={'mobile/wbshare/goodList--video.png'}
              ></WbImage>
            </div>
              )
            }
            
          </div>
          {/* status 状态 1-展售中 2-已售出 3-已下架 */}
          {
            [2, 3].includes(data.status) && showStatus && goodType === 0 && (
            <div
            className={style["good__cover--mask"]}
          >
            <div className={style["good__cover--mask-center"]}>
              <div>
                <p>
                  {{
                    data.status === 2
                      ? '已售出'
                      : data.status === 3
                      ? '已下架'
                      : '已结束'
                  }}
                </p>
                <span v-if="data.status === 2">sold out</span>
              </div>
            </div>
          </div>
            )
          }
          {/* status 状态 1.未开始，2.竞拍中，3.已截拍 (这是竞拍的)  */}
          {
            showAuctionStatus &&(<div
            
            className={style["good__cover--mask"]}
          >
            <div className={style["good__cover--mask-center"]}>
              <div>
                <p>
                  已截拍
                </p>
              </div>
            </div>
          </div>)
          }
        </div>
        <div className={[style["good__content"], scene === 'list' ? style['is-padding'] : ''].join(' ')}>
        {/* 类型：列表 */}
          <template v-if="scene === 'list'">
            <div className="good__content--mainly">
              {/* 价格 */}
              <div
                className={[style['good__content--price'], style[`is-${scene}`], style[`is-${type}`]].join(' ')}
              >
                {
                  showPriceType === 0 && (
                    <span
                  className={style['good__content--price--tag']}
                  >认证闲置</span
                >
                  )
                }
                
                <strong
                  v-if="showPriceType === 0"
                  className={
                    [[2, 3].includes(data.status) ? style['good__content--SaleOut'] : ''].join(' ')
                  }
                  >{ filterToMoney(data.price }</strong
                >
                {
                  showPriceType === 0 && (
                    <span className={style["is-through"]}>{
                      filterToMoney( data.marketPrice)
                    }</span>
                  )
                }

                {
                  showPriceType === 1 && (<p
                    className={style['good__content--auctionPriceText']}
                  >
                    当前价
                  </p>)
                  
                }
                {
                  showPriceType === 1 && (
                    <p
                  className={style['good__content--auctionPrice']}
                >{
                  data.priceMax
                    ? filterToMoney(data.priceMax)
                    : filterToMoney(data.priceMin)
                }</p>
                  )
                }
              </div>
              {/* 标题 */}
              <div
                :className="{
                  'good__content--SaleOut':
                    [2, 3].includes(data.status) && goodType === 0
                }"
                className="good__content--title"
              >
                <wb-tag
                  v-if="isShowStatus"
                  :data="
                    data.status === 1
                      ? '未开始'
                      : data.status === 2
                      ? '竞拍中'
                      : '竞拍中'
                  "
                  :plain="true"
                  type="danger"
                  size="mini"
                />
                {{ data.shareName || data.auctionName }}
              </div>
            </div>
             打折 / 倒计时 
            <div className="good__tags">
              <template
                v-if="
                  [2, 3].includes(data.status) && !showStatus && goodType === 0
                "
              >
                <wb-tag data="已售出" size="mini" bold type="info" />
              </template>
              <template v-else>
                <wb-tag
                  v-if="showDiscount && data.overFixPriceDesc"
                  :type="[2, 3].includes(data.status) ? 'info' : type"
                  :data="`${data.overFixPriceDesc}`"
                  size="mini"
                  bold
                />
                <wb-tag
                  v-if="data.watchMaterialTagName"
                  :data="data.watchMaterialTagName"
                  type="primary"
                  size="mini"
                  bold
                />
                <wb-tag
                  v-for="(item, index) in data.tags"
                  :key="index"
                  :data="item.tagName"
                  :type="
                    [2, 3].includes(data.status) && goodType === 0
                      ? 'info'
                      : 'cancel'
                  "
                  size="mini"
                  bold
                />
              </template>
            </div>
            <!-- 信息 -->
          </template>
          <!--
          类型：
          大家都在看 & 我在看
         -->
          <template v-if="scene === 'discount' || scene === 'count-down'">
            <div className="good__content--tag">
              <wb-tag
                :type="type"
                :data="
                  goodType === 0
                    ? `${data.discount}折`
                    : `${CountDown.hours}:${CountDown.minutes}:${CountDown.seconds}`
                "
                :custom-style="
                  goodType === 0
                    ? { padding: '1px 16px 2px 16px', 'border-radius': '50px' }
                    : { padding: '0px 7px 0px 19px', 'border-radius': '50px' }
                "
                :show-auction-icon="goodType !== 0"
                size="small"
                radius
                bold
              />
            </div>
            <!-- 价格 -->
            <div
              :className="[`is-${type}`, `is-${scene}`]"
              className="good__content--price"
            >
              <strong>{{
                goodType === 0
                  ? data.price
                  : goodType === 1
                  ? data.priceMin
                  : '' | filterToMoney
              }}</strong>
              <span>{{ data.marketPrice | filterToMoney }}</span>
            </div>
            <!-- 标题 -->
            <div
              :className="[`is-${scene}`, `is-${type}`]"
              className="good__content--title"
            >
              {{ data.brandName }}·{{ data.suitableCrowdName
              }}{{ data.watchModuleName }}
            </div>
          </template>
        </div>
      </div>
    </Link>
  </div>
  );
});

export default Good;
