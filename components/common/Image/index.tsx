/*
 * @Author: 谢树宏
 * @Date: 2022-03-10 16:22:40
 * @LastEditors: 谢树宏
 * @LastEditTime: 2022-03-10 16:35:00
 * @FilePath: /new-share/components/common/Image/index.tsx
 */

import Image from "next/image";

const ImageLoader = ({ src, width, quality }) => {
  return `https://example.com/${src}?w=${width}&q=${quality || 75}`;
};

const MyImage = (props) => {
  return (
    <Image
      loader={ImageLoader}
      src="me.png"
      alt="Picture of the author"
      width={500}
      height={500}
    />
  );
};

export default MyImage;
