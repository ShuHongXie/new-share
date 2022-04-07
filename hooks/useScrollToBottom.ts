import { getScrollTop, getScrollHeight, getClientHeight } from "@/utils/rect";
import { useEffect } from "react";

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
    target.addEventListener("scroll", scrollExcuteFn);
    return () => target.removeEventListener("scroll", scrollExcuteFn);
  }, []);
  return {};
}
