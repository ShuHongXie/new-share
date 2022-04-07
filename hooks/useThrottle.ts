type ThrottleProps = {
  fn: any;
  time?: number;
};

export default function useThrottle({ fn, time = 3000 }: ThrottleProps) {
  const prevTime = new Date().getTime();
  let timer: any;
  return function () {
    let currentTime = new Date().getTime();
    if (prevTime + time >= currentTime) {
      fn();
      // timer = setTimeout(() => {
      //   fn;
      // }, time);
    } else {
      currentTime = prevTime + time;
    }
  };
}
