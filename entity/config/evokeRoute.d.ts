export interface evokeParam {
  path?: string;
  evoke?: Evoke;
}

export interface Evoke {
  path?: string;
  useYyb?: boolean;
  params?: Params;
  eventPage?: string;
}

export interface Params {
  [key: string]: any;
}
