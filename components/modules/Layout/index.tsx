/*
 * @Author: 谢树宏
 * @Date: 2022-03-22 14:00:03
 * @LastEditors: 谢树宏
 * @LastEditTime: 2022-03-22 14:46:55
 * @FilePath: /new-share/components/modules/Layout/index.tsx
 */
import { ReactNode, useEffect, useMemo, useState } from "react";
import HeadDownloadAppTip from "../Fixed/HeadDownloadAppTip";
import { getCanEvoke } from "@/service/common";
import generateEvokeData from "@/config/evokeRoute";

import { evokeParam } from "@/entity/config/evokeRoute";

export default function Layout({ children }: { children: ReactNode }) {
  const [canEvoke, setCanEvoke] = useState(false);
  const [evokeData, setEvokeData] = useState<evokeParam | null>({});
  useEffect(() => {
    init();
  }, []);
  // 初始化
  const init = async () => {
    if (!generateEvokeData()) {
      setCanEvoke(false);
      return;
    }
    setEvokeData(generateEvokeData());
    console.log("==", evokeData);
    const res = await getCanEvoke({
      domain: evokeData?.path,
    });
    console.log(res);
  };
  return (
    <>
      {/* <HeadDownloadAppTip /> */}
      <main>{children}</main>
    </>
  );
}
