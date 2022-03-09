import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import "../styles/home.scss";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="home">home</div>
    </div>
  );
};

export default Home;
