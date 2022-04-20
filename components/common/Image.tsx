/*
 * @Author: 谢树宏
 * @Date: 2022-03-10 16:22:40
 * @LastEditors: 谢树宏
 * @LastEditTime: 2022-03-25 10:29:35
 * @FilePath: /new-share/components/common/Image.tsx
 */

import Image from "next/image";
import { getConstByEnv } from "@/utils/index";
import config from "@/config/index";
const ORIGIN = getConstByEnv(config.OSS);

import style from "./Image.module.scss";
import { useState } from "react";

export type Origin = {
  aliyuncs: string;
  static: string;
  hide: string;
};

export type ImageParam = {
  src?: string;
  width?: number;
  className?: string;
  watermark?: string;
  type?: string;
  parameter?: string;
  originType?: string;
  quality?: number;
  height?: number;
  objectFit?: "fill" | "contain" | "cover" | "none" | "scale-down";
  onClick?: (e: React.MouseEvent<HTMLImageElement>) => void;
};

// 使用的源
const ORIGINS: Origin = {
  aliyuncs: ORIGIN,
  static: config.OSS.static,
  hide: "",
};

const WbImage = ({
  src = "",
  width,
  height,
  type,
  objectFit = "fill",
  watermark = "",
  quality = 90,
  parameter = "",
  className = "",
  originType = "aliyuncs",
  onClick,
}: ImageParam) => {
  console.log("image变化----------------------------------");

  // 文件属性
  originType = ORIGINS[originType as keyof Origin];
  // 文件类型
  type = type === "jpg" ? "/format,jpg" : "";
  // 文件源
  let origin = src.startsWith("http") ? "" : originType;
  // 防止url无法解析出错
  src = !src.startsWith("http") && !/http/i.test(src) ? src : "";
  // 后缀
  parameter = parameter ? "/resize," + parameter : "";
  parameter = parameter
    ? `?x-oss-process=image${parameter}/quality,q_${quality}${type}${
        watermark || ""
      }`
    : ``;

  const [imgUrl, setImgUrl] = useState(
    src ? origin + src + parameter : config.PIC.errorPage
  );

  const imageClick = (e: React.MouseEvent<HTMLImageElement>) => {
    e.stopPropagation();
    onClick?.(e);
  };

  return (
    <Image
      className={[style.wbImage, className].join(" ")}
      src={imgUrl}
      width={width}
      height={height}
      objectFit={objectFit}
      layout={!width && !width ? "fill" : "responsive"}
      alt=""
      onError={() => setImgUrl(config.PIC.errorPage)}
      onClick={imageClick}
    />
  );
};

export default WbImage;
