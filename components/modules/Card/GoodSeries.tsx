import WbImage from "@/components/common/Image";
import NormalImage from "@/components/common/NormalImage";
import type {
  NextPage,
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { FC, useCallback, useEffect, useMemo, useState } from "react";

import style from "./GoodSeries.module.scss";

type GoodSeriesProps = {
  data?: any;
  value?: number;
  activeKey?: string;
};

const GoodSeries: FC<GoodSeriesProps> = ({ data, value, activeKey }) => {
  return (
    <div
      className={[
        style["series"],
        value === data[activeKey as string] ? style["is-active"] : "",
      ].join(" ")}
    >
      <NormalImage
        originType={
          data.seriesCode === -1 || !data.imageUrl ? "static" : "aliyuncs"
        }
        src={
          data.seriesCode === -1
            ? "/mobile/wbshare/otherImgs.png"
            : data.imageUrl
            ? data.imageUrl
            : "/mobile/wbshare/otherImgs2.png"
        }
        parameter="m_fill,w_50,h_50"
        width={24}
        height={24}
      ></NormalImage>
      <p className={style["series__text"]}>{data.seriesName}</p>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  return { props: {} };
};

export default GoodSeries;
