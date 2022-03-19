import { atom } from "recoil";
import { Menu } from "@/entity/service/common";

export const tabbarMenu = atom<Menu>({
  key: "tabbarMenu",
  default: [],
});
