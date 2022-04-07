/**
 * 获取滚动距离
 *
 * @param {(Document | Element)} el
 * @return {*}
 */
export const getScrollTop = (el: Document | Element) => {
  if (el === document || el === document.body) {
    return Math.max(
      window.pageYOffset,
      document.documentElement.scrollTop,
      document.body.scrollTop
    );
  }
  return (el as Element).scrollTop;
};
/**
 * 获取滚动高度
 *
 * @param {(Document | Element)} el
 * @return {*}
 */
export const getScrollHeight = (el: Document | Element) => {
  return (
    (el as Element).scrollHeight ||
    Math.max(document.documentElement.scrollHeight, document.body.scrollHeight)
  );
};
/**
 * 获取屏幕高度
 *
 * @param {(Document | Element)} el
 * @return {*}
 */
export const getClientHeight = (el: Document | Element) => {
  return (
    (el as Element).clientHeight ||
    Math.max(document.documentElement.clientHeight, document.body.clientHeight)
  );
};
