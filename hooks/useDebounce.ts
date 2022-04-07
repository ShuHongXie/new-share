type DebounceProps = {
  fn: any;
  time?: number;
};

export default function useDebounce({ fn, time = 1000 }: DebounceProps) {
  let timer: any;
  return function () {
    // @ts-ignore
    const context = this;
    const args = arguments;
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, time);
  };
}
