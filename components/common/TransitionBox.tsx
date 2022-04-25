import NormalImage from "@/components/common/NormalImage";
import { FC, memo, ReactNode, useEffect, useRef, useState } from "react";

import style from "./TransitionBox.module.scss";

type TransitionBoxProps = {
  data: Array<any>;
  title?: string;
  showDelete?: boolean;
  showItemDelete?: boolean;
  delItem?: (tag: string) => void;
  selectTag?: any;
  deleteTag?: any;
  children: ReactNode[] | ReactNode;
};

const TransitionBox: FC<TransitionBoxProps> = memo(({ data, children }) => {
  const [child, setChild] = useState(
    Array.isArray(children) ? children : [children]
  );
  useEffect(() => {
    setChild(Array.isArray(children) ? children : [children]);
  }, [children]);

  return (
    <div className={style["transition-box"]}>
      {data.map((item, index) => (
        <div key={index}>{child[index]}</div>
      ))}
    </div>
  );
});

export default TransitionBox;
