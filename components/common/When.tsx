import { FC, memo, ReactElement, ReactNode } from "react";

type CaseProps = {
  whenIf?: boolean;
  whenElseIf?: boolean;
  whenElse?: boolean;
};

const Case: FC<CaseProps> = memo(({ children }) => {
  return <>{children}</>;
});

// React下的逻辑判断组件if else-if else
const When: FC = memo(({ children }) => {
  const filterChild = (node: ReactNode | ReactNode[]) => {
    // 收集所有子项, 如果是单个也要进行数组化
    let childList: ReactNode[] = !Array.isArray(node) ? [node] : node;
    // 遍历所有子项
    for (let node of childList) {
      if (
        (node as ReactElement).props.whenIf ||
        (node as ReactElement).props.whenElseIf ||
        "whenElse" in (node as ReactElement).props
      ) {
        return node;
      }
    }
  };

  return <>{filterChild(children)}</>;
});

export { When, Case };
