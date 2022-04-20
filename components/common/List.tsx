import { FC, ReactNode, memo } from "react";

import style from "./List.module.scss";

import Empty from "./Empty";
import LoadMore from "./LoadMore";

type ListProps = {
  status: "NO_MORE" | "WAIT" | "LOAD" | "END" | "ERROR";
  total: number;
  customEmpty?: boolean;
  emptyText?: string;
  emptyChild?: () => ReactNode;
  errorChild?: () => ReactNode;
  retry?: () => void;
};

const List: FC<ListProps> = memo(
  ({
    status,
    total,
    emptyText = "",
    customEmpty = false,
    emptyChild,
    errorChild,
    retry,
    children,
  }) => {
    console.log(status, total, children);

    const emptyArea = () =>
      status === "END" &&
      !total && (
        <div className={style["list-empty"]}>
          {!customEmpty ? <Empty emptyText={emptyText} /> : emptyChild?.()}
        </div>
      );

    const errorArea = () =>
      status === "ERROR" && (
        <div className={style["list-error"]}>
          {!errorChild ? (
            <text className={style["list-error__retry"]} onClick={retry}>
              重新加载
            </text>
          ) : (
            errorChild()
          )}
        </div>
      );

    const contentArea = () => total && children;

    const loadArea = () =>
      (status === "LOAD" || status === "NO_MORE") && (
        <div className={style["list-loading"]}>
          <LoadMore
            loaded={status === "NO_MORE"}
            loadedText={status === "NO_MORE" ? "" : "没有更多了哦~ "}
          />
        </div>
      );

    return (
      <div className={style["list"]}>
        {/* 空列表区域 */}
        {emptyArea()}
        {/* 错误区域 */}
        {errorArea()}
        {/* 内容显示区域 */}
        {contentArea()}
        {/* 加载/底部加载更多区域  */}
        {loadArea()}
      </div>
    );
  }
);

export default List;
