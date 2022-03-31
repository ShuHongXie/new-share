import { FC } from "react";

import style from "./LoadMore.module.scss";
import { DotLoading } from "antd-mobile";

type LoadMoreProps = {
  loading?: boolean;
  loadingText?: string;
  loaded?: boolean;
  loadedText?: string;
};

const LoadMore: FC<LoadMoreProps> = ({
  loadingText = "加载中...",
  loaded,
  loadedText,
}) => {
  return (
    <div className={style["load-more"]}>
      {loaded ? (
        <div className={style["load-more__loading"]}>
          <span>{loadingText}</span>
          <DotLoading color="currentColor" />
        </div>
      ) : (
        <span className={style["load-more__loaded"]}>{loadedText}</span>
      )}
    </div>
  );
};

export default LoadMore;
