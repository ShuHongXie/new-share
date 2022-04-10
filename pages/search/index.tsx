import NormalImage from "@/components/common/NormalImage";
import { FC, memo, useEffect, useState } from "react";
import { Data } from "@/entity/service/home";

import style from "./index.module.scss";
import useDebounce from "@/hooks/useDebounce";

type SearchProps = {
  data?: Data;
};

const Search: FC<SearchProps> = memo(({ data }) => {
  console.log("重新渲染");
  const [counter1, setCounter1] = useState(0);
  const [counter2, setCounter2] = useState(0);

  const test = useDebounce({
    fn: () => {
      console.log("测试1");
      setCounter1((x) => (x += 1));
    },
    time: 1000,
  });

  const test1 = useDebounce({
    fn: () => {
      console.log("测试2");
    },
    time: 1000,
  });

  useEffect(function () {
    const t = setInterval(() => {
      setCounter2((x) => x + 1);
    }, 500);
    return clearInterval.bind(undefined, t);
  }, []);

  return (
    <div className={style["search"]}>
      <button onClick={test}>测试1 {counter1}</button>
      <button onClick={test1}>测试2 {counter2}</button>
    </div>
  );
});

export default Search;
