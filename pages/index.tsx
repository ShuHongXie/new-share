/*
 * @Author: 谢树宏
 * @Date: 2022-03-09 14:13:13
 * @LastEditors: 谢树宏
 * @LastEditTime: 2022-03-15 17:42:16
 * @FilePath: /new-share/pages/index.tsx
 */
import type {
  NextPage,
  GetServerSideProps,
  GetServerSidePropsContext,
} from "next";
import Head from "next/head";
import WbImage from "@/components/common/Image";

import Tabbar from "@/components/modules/Tabbar/homeFooter";
import { Swiper, Toast } from "antd-mobile";
import { getHomeDataNew } from "@/service/home";

import homeStyle from "../styles/home.module.scss";

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
        <WbImage src="21321321" width={200} height={200} />
        <Tabbar />
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const data = await getHomeDataNew(
    {
      platform: 2,
    },
    context
  );
  console.log(data);

  return { props: {} };
};

export default Home;
