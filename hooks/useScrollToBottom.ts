import { getScrollTop, getScrollHeight, getClientHeight } from "@/utils/rect";
import { useEffect } from "react";
import useThrottle from "./useThrottle";

const isBrowser = typeof window !== `undefined`;

type ScrollBottomProps = {
  target?: Document | Element; // 目标dom
  scrollBottomDir?: number; // 距离底部多少px
  executeArriveFn: Function;
};

export default function useScrollBottom(options: ScrollBottomProps) {
  console.log("执行useScrollBottom");

  const { target = document, scrollBottomDir = 20, executeArriveFn } = options;
  const scrollExcuteFn = () => {
    const scrollTop = getScrollTop(target);
    const scrollHeight = getScrollHeight(target);
    const clientHeight = getClientHeight(target);
    if (clientHeight + scrollTop >= scrollHeight - scrollBottomDir) {
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
