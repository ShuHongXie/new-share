/*
 * @Author: 谢树宏
 * @Date: 2022-03-09 14:13:13
 * @LastEditors: 谢树宏
 * @LastEditTime: 2022-03-10 16:04:46
 * @FilePath: /new-share/pages/index.tsx
 */
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import homeStyle from "../styles/home.module.scss";
import { Swiper, Toast } from "antd-mobile";
import Tabbar from "@/components/modules/Tabbar/homeFooter";

const colors = ["#ace0ff", "#bcffbd", "#e4fabd", "#ffcfac"];

const items = colors.map((color, index) => (
  <Swiper.Item key={index}>
    <div
      className={homeStyle.content}
      style={{ background: color }}
      onClick={() => {
        Toast.show(`你点击了卡片 ${index + 1}`);
      }}
    >
      {index + 1}
    </div>
  </Swiper.Item>
));

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>万表二手表</title>
      </Head>
      <div className={homeStyle.home}>
        <Swiper>{items}</Swiper>
        <Tabbar />
      </div>
    </div>
  );
};

export default Home;
