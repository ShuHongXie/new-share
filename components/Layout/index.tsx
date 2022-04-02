/*
 * @Author: 谢树宏
 * @Date: 2022-03-22 14:00:03
 * @LastEditors: 谢树宏
 * @LastEditTime: 2022-03-25 10:26:34
 * @FilePath: /new-share/components/Layout/index.tsx
 */
import { ReactNode, useEffect, useMemo, useState } from "react";
import HeadDownloadAppTip from "../modules/Fixed/HeadDownloadAppTip";
import FooterOpenAppTip from "../modules/Fixed/FooterOpenAppTip";
import { getCanEvoke } from "@/service/common";
import generateEvokeData from "@/config/evokeRoute";
import { evokeParam } from "@/entity/config/evokeRoute";
import { EvokeData } from "@/entity/service/common.d";

export default function Layout({ children }: { children: ReactNode }) {
  const [canEvoke, setCanEvoke] = useState(false);
  const [evokeData, setEvokeData] = useState<evokeParam | null>({});
  const [topImageUrl, setTopImageUrl] = useState(""); // 顶部唤起图片
  const [fixedImageUrl, setFixedImageUrl] = useState(""); // 固定唤起图片
  const [isFixedTopImage, setiIsFixedTopImage] = useState(false);
  const [showTop, setShowTop] = useState(true);

  useEffect(() => {
    (async () => {
      const initEvokeData = generateEvokeData();
      if (!initEvokeData) {
        setCanEvoke(false);
        return;
      }
      const res = await getCanEvoke({
        domain: initEvokeData?.path,
      });
      const { topImageUrl, fixedImageUrl, status } = res;
      setTopImageUrl(topImageUrl);
      setFixedImageUrl(fixedImageUrl);
      setiIsFixedTopImage(!!initEvokeData?.isFixedTopImage);
      setCanEvoke(status === 1);
    })();
  }, []);
  // 初始化
  // const init = async () => {
  //   const initEvokeData = generateEvokeData();
  //   console.log("??", initEvokeData, !initEvokeData);

  //   if (!initEvokeData) {
  //     setCanEvoke(false);
  //     return;
  //   }
  //   console.log("--准备更新");

  //   setEvokeData({
  //     ...evokeData,
  //     ...initEvokeData,
  //   });
  //   console.log("--", evokeData);
  //   const res = await getCanEvoke({
  //     domain: evokeData?.path,
  //   });
  //   const { topImageUrl, fixedImageUrl, status } = res;
  //   setTopImageUrl(topImageUrl);
  //   setFixedImageUrl(fixedImageUrl);
  //   setiIsFixedTopImage(!!evokeData?.isFixedTopImage);
  //   setCanEvoke(status === 1);
  // };
  // 关闭顶部栏目
  const handleCloseEvokeTop = () => {
    setShowTop(false);
  };
  // 唤醒App
  const handleEvokeApp = () => {};
  return (
    <>
      {canEvoke && topImageUrl && showTop ? (
        <HeadDownloadAppTip
          isFixedTopImage={isFixedTopImage}
          topImageUrl={topImageUrl}
          handleEvokeApp={handleEvokeApp}
          handleCloseEvokeTop={handleCloseEvokeTop}
        />
      ) : (
        ""
      )}
      <main>{children}</main>
      {/* {canEvoke && fixedImageUrl ? (
        <FooterOpenAppTip
          fixedImageUrl={fixedImageUrl}
          handleEvokeApp={handleEvokeApp}
        />
      ) : (
        ""
      )} */}
    </>
  );
}
