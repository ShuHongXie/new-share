type ThrottleProps = {
  fn: any;
  time?: number;
};

export default function useThrottle({ fn, time = 3000 }: ThrottleProps) {
  let prevTime: number = new Date().getTime();
  let timer: any;
  return function () {
    // @ts-ignore
    const context = this;
    const args = arguments;
    let currentTime: number = new Date().getTime();
    if (prevTime + time >= currentTime) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        prevTime = currentTime;
        fn.apply(context, args);
      }, time);
    } else {
      prevTime = currentTime;
      fn.apply(context, args);
    }
  };
}
