/*
 * @Author: 谢树宏
 * @Date: 2022-03-10 15:49:29
 * @LastEditors: 谢树宏
 * @LastEditTime: 2022-03-22 14:17:05
 * @FilePath: /new-share/components/modules/Tabbar/index.tsx
 */
import { useEffect, useState } from "react";
import WbImage from "@/components/common/Image";
import style from "./index.module.scss";
import { getSwitchTabbar } from "@/service/common";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { tabbarMenu } from "@/store/atom/common";

import { MenuItem } from "@/entity/service/common";

const Tabbar = () => {
  console.log("开始渲染");
  const setTabbarMenu = useSetRecoilState(tabbarMenu);
  const menu = useRecoilValue(tabbarMenu);
  useEffect(() => {
    (async () => {
      const data = await getSwitchTabbar({
        configType: 12,
      });
      setTabbarMenu(() => data);
      console.log(data);
    })();
  }, [setTabbarMenu]);
  console.log(menu);

  return (
    <div className={style.tabbar}>
      {menu.map((item: MenuItem, index: number) => (
        <div className={style.tabbarItem} key={index}>
          <div
            className={index === 2 ? style.tabbarItemWrap : ""}
            style={{
              width: `${(item.imageWidth as number) / 2}px`,
              height: `${(item.imageHeight as number) / 2}px`,
            }}
          >
            <WbImage
              src={item.imageUrl}
              width={(item.imageWidth as number) / 2}
              height={(item.imageHeight as number) / 2}
            />
          </div>
          <p className={style.tabbarItemName}>{item.detail}</p>
          {item.simpleDetail ? (
            <i className={style.tabbarItemTag}>{item.simpleDetail}</i>
          ) : (
            ""
          )}
        </div>
      ))}
    </div>
  );
};

export default Tabbar;
