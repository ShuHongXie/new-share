import { getScrollTop, getScrollHeight, getClientHeight } from "@/utils/rect";
import { useEffect } from "react";
import useThrottle from "./useThrottle";

const isBrowser = typeof window !== `undefined`;

type ScrollBottomProps = {
  target?: Document | Element; // 目标dom
  scrollBottomDir?: number; // 距离底部多少px
  executeArriveFn: Function; // 触底执行函数
  loading: boolean; // 是否在加载中
};

export default function useScrollBottom(options: ScrollBottomProps) {
  const {
    target = document,
    scrollBottomDir = 20,
    executeArriveFn,
    loading,
  } = options;
  const scrollExcuteFn = () => {
    const scrollTop = getScrollTop(target);
    const scrollHeight = getScrollHeight(target);
    const clientHeight = getClientHeight(target);
    console.log(loading);

    if (clientHeight + scrollTop >= scrollHeight - scrollBottomDir && loading) {
      console.log("触底了");
      executeArriveFn();
    }
  };

  const scrollWatchMethd = useThrottle({
    fn: scrollExcuteFn,
    time: 1000,
  });

  useEffect(() => {
    target.addEventListener("scroll", scrollWatchMethd);
    return () => target.removeEventListener("scroll", scrollWatchMethd);
  }, []);
  return {};
}
