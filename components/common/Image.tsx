/*
 * @Author: 谢树宏
 * @Date: 2022-03-10 16:22:40
 * @LastEditors: 谢树宏
 * @LastEditTime: 2022-03-22 17:11:09
 * @FilePath: /new-share/components/common/Image.tsx
 */

import Image from "next/image";
import { getConstByEnv } from "@/utils/index";
import config from "@/config/index";
const ORIGIN = getConstByEnv(config.OSS);

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
  watermark = "",
  quality = 90,
  parameter = "",
  className = "",
  originType = "aliyuncs",
  onClick,
}: ImageParam) => {
  // 文件属性
  originType = ORIGINS[originType as keyof Origin];
  // 文件类型
  type = type === "jpg" ? "/format,jpg" : "";
  // 文件源
  let origin = /http/i.test(src) ? "" : originType;
  // 后缀
  parameter = parameter ? "/resize," + parameter : "";
  parameter = parameter
    ? `?x-oss-process=image${parameter}/quality,q_${quality}${type}${
        watermark || ""
      }`
    : ``;

  const imgUrl = src ? origin + src + parameter : "";

  const imageClick = (e: React.MouseEvent<HTMLImageElement>) => {
    e.stopPropagation();
    onClick?.(e);
  };

  return (
    <Image
      className={`wb-image ${className}`}
      src={imgUrl}
      alt=""
      width={width}
      height={height}
      layout={!width || !height ? "fill" : "intrinsic"}
      objectFit="cover"
      onClick={imageClick}
    />
  );
};

export default WbImage;
