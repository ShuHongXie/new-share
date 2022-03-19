export type Origin = {
  aliyuncs: string;
  static: string;
  hide: string;
};

export interface ImageParam {
  src: string;
  width: number;
  className?: string;
  watermark?: string;
  type?: string;
  parameter?: string;
  originType?: string;
  quality?: number;
  height?: number;
}
