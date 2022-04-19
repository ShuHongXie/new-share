import { useRef } from "react";

type ThrottleProps = {
  fn: any;
  time?: number;
};

export default function useThrottle({ fn, time = 3000 }: ThrottleProps) {
  let prevTime = useRef(new Date().getTime());
  let timer: any = useRef(null);
  return function () {
    // @ts-ignore
    const context = this;
    const args = arguments;
    let currentTime: number = new Date().getTime();
    if (prevTime.current + time >= currentTime) {
      clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        prevTime.current = currentTime;
        fn.apply(context, args);
      }, time);
    } else {
      prevTime.current = currentTime;
      fn.apply(context, args);
    }
  };
}
