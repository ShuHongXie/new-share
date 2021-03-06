/*
 * @Author: 谢树宏
 * @Date: 2022-03-09 17:36:53
 * @LastEditors: 谢树宏
 * @LastEditTime: 2022-03-09 17:49:19
 * @FilePath: /new-share/pages/_document.tsx
 */
import Document, { Html, Head, Main, NextScript } from "next/document";

class WbDocument extends Document {
  // static async getInitialProps(ctx) {
  //   const initialProps = await Document.getInitialProps(ctx);
  //   return { ...initialProps };
  // }

  render() {
    return (
      <Html>
        <Head>
          <link
            rel="stylesheet"
            href="//at.alicdn.com/t/font_1183097_xn1aa1cws5.css"
          ></link>
          <script
            async
            type="text/javascript"
            src="//at.alicdn.com/t/font_1213223_s4om73sqwyh.js"
          ></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default WbDocument;
