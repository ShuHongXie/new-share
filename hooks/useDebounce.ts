import { useRef } from "react";

type DebounceProps = {
  fn: any;
  time?: number;
};

export default function useDebounce({ fn, time = 1000 }: DebounceProps) {
  let timer: any = useRef(null);
  return function () {
    // @ts-ignore
    const context = this;
    const args = arguments;
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      fn.apply(context, args);
    }, time);
    console.log(timer);
  };
}
