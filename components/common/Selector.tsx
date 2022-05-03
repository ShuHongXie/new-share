import { FC, memo, useRef, useState } from "react";

import style from "./Selector.module.scss";

type SelectorValue = string | number;
type SelectorOption = {
  [key: string]: SelectorValue;
};

type SelectorProps = {
  value?: SelectorValue[]; // 选中项
  columns?: number; // 行展示数
  options: SelectorOption[];
  optionsKeyConfig: string[]; // options参数配置 [keyName, uniqueKeyName, valueName]
  multiple?: boolean; // 是否允许多选
  disabled?: boolean; // 	是否全局禁止选中	false
  onChange?: (
    value: SelectorValue[]
    // extend: { items: SelectorOption[] }
  ) => void; // 	选项改变时触发
};

const Selector: FC<SelectorProps> = memo(
  ({
    options,
    optionsKeyConfig = ["label", "index", "value"],
    value,
    multiple = false,
    onChange,
  }) => {
    const selectorValue = useRef<SelectorValue[]>(value || []);
    const changeValue = (index: number) => {
      const selectData = options[index][optionsKeyConfig[2]];
      const value = selectorValue.current.includes(selectData)
        ? selectorValue.current.filter((v) => v !== selectData)
        : [selectData, ...selectorValue.current];
      selectorValue.current = value;
      onChange?.(selectorValue.current);
    };

    return (
      <div className={style["selector"]}>
        {options.map((item, index) => (
          <div
            className={[
              style["selector"],
              selectorValue.current?.includes(item[optionsKeyConfig[2]])
                ? style["is-checked"]
                : "",
            ].join(" ")}
            key={item[optionsKeyConfig[1]]}
            onClick={() => changeValue(index)}
          >
            {item[optionsKeyConfig[0]]}
          </div>
        ))}
      </div>
    );
  }
);

export default Selector;
