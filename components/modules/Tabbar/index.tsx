/*
 * @Author: 谢树宏
 * @Date: 2022-03-10 15:49:29
 * @LastEditors: 谢树宏
 * @LastEditTime: 2022-03-11 14:24:51
 * @FilePath: /new-share/components/modules/Tabbar/homeFooter.tsx
 */
import { useEffect, useState } from "react";
import { Badge, TabBar } from "antd-mobile";
import {
  AppOutline,
  MessageOutline,
  MessageFill,
  UnorderedListOutline,
  UserOutline,
} from "antd-mobile-icons";
import style from "./homeFooter.module.scss";
import { getSwitchTabbar } from "@/service/common";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { tabbarMenu } from "@/store/atom/common";

const TabbarItem = () => {};

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
  const tabs = [
    {
      key: "home",
      title: "首页",
      icon: <AppOutline />,
      badge: Badge.dot,
    },
    {
      key: "todo",
      title: "我的待办",
      icon: <UnorderedListOutline />,
      badge: "5",
    },
    {
      key: "message",
      title: "我的消息",
      icon: (active: boolean) =>
        active ? <MessageFill /> : <MessageOutline />,
      badge: "99+",
    },
    {
      key: "personalCenter",
      title: "个人中心",
      icon: <UserOutline />,
    },
  ];

  // const [activeKey, setActiveKey] = useState("todo");
  return (
    <TabBar className={style.tabbar}>
      {tabs.map((item) => (
        <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
      ))}
    </TabBar>
  );
};

export default Tabbar;
