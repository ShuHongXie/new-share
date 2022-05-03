import NormalImage from "@/components/common/NormalImage";
import { FC, memo } from "react";
import { Data } from "@/entity/service/home";

import style from "./Selector.module.scss";

type SelectorValue = string | number;
type SelectorOption = {
  [key: string]: SelectorValue;
}[];

type SelectorProps = {
  value?: SelectorValue[]; // 选中项
  defaultValue: SelectorValue[]; // 默认项
  columns?: number; // 行展示数
  options: SelectorOption[];
  optionsKeyConfig: ["label", "index", "value"]; // options参数配置 [keyName, uniqueKeyName, valueName]
  multiple?: boolean; // 是否允许多选
  disabled?: boolean; // 	是否全局禁止选中	false
  onChange?: (
    value: SelectorValue[],
    extend: { items: SelectorOption[] }
  ) => void; // 	选项改变时触发
};

const Selector: FC<SelectorProps> = memo(
  ({ children, options, optionsKeyConfig = ["label", "index", "value"] }) => {
    return (
      <div className={style["selector"]}>
        {options.map((item) => (
          <div
            className={[
              style["selector"],
              value.includes() ? style["is-checked"] : "",
            ].join(" ")}
            key={item[optionsKeyConfig[1]]}
          >
            {item[optionsKeyConfig[0]]}
          </div>
        ))}
      </div>
    );
  }
);

export default Selector;
