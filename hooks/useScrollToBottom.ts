import { getScrollTop, getScrollHeight, getClientHeight } from "@/utils/rect";
import { useEffect } from "react";
import useThrottle from "./useThrottle";

const isBrowser = typeof window !== `undefined`;

export default function useScrollBottom(target: Document | Element = document) {
  const scrollExcuteFn = () => {
    console.log("滚动");

    const scrollTop = getScrollTop(target);
    const scrollHeight = getScrollHeight(target);
    const clientHeight = getClientHeight(target);
    if (clientHeight + scrollTop >= scrollHeight - 20) {
      console.log("触底了");
    }
  };
  useEffect(() => {
    target.addEventListener(
      "scroll",
      useThrottle({
        fn: scrollExcuteFn,
        time: 1000,
      })
    );
    return () =>
      target.removeEventListener(
        "scroll",
        useThrottle({
          fn: scrollExcuteFn,
          time: 1000,
        })
      );
  }, []);
  return {};
}
