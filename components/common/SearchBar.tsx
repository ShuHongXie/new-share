import { FC } from "react";
import WbIcon from "./Icon";
import style from "./SearchBar.module.scss";

export type SearchBarProps = {
  haveBack?: boolean;
};

const SearchBar: FC<SearchBarProps> = ({ haveBack }) => {
  const backIcon = () =>
    haveBack ? <WbIcon icon="xiangzuojiantou" size={18} /> : "";
  return (
    <div className={style.searchBar}>
      {backIcon()}
      <div className={style.searchBarContent}></div>
    </div>
  );
};

export default SearchBar;
