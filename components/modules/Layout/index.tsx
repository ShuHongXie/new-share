/*
 * @Author: 谢树宏
 * @Date: 2022-03-22 14:00:03
 * @LastEditors: 谢树宏
 * @LastEditTime: 2022-03-22 14:46:55
 * @FilePath: /new-share/components/modules/Layout/index.tsx
 */
import { ReactNode } from "react";
import HeadDownloadAppTip from "../Fixed/HeadDownloadAppTip";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <HeadDownloadAppTip />
      <main>{children}</main>
    </>
  );
}
