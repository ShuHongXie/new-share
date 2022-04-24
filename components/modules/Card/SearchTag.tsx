import NormalImage from "@/components/common/NormalImage";
import { FC, memo } from "react";
import { Data } from "@/entity/service/home";

import style from "./SearchTag.module.scss";
import WbIcon from "@/components/common/Icon";

type SearchTagProps = {
  tagList: string[];
  title?: string;
  showDelete?: boolean;
  showItemDelete?: boolean;
  delItem?: (tag: string) => void;
  selectTag?: any;
  deleteTag?: any;
};

const SearchTag: FC<SearchTagProps> = memo(
  ({
    showItemDelete,
    tagList,
    showDelete,
    delItem,
    deleteTag,
    title,
    selectTag,
    children,
  }) => {
    // 删除标签
    const handleDelItem = (
      event: React.MouseEvent<HTMLElement>,
      tag: string
    ) => {
      event.stopPropagation();
      delItem!(tag);
    };
    // 主区域内容
    const content = tagList.length ? (
      <div className={style["searchTag"]}>
        <p className={style["searchTag--title"]}>{title}</p>
        {tagList.map((item, index) => (
          <span
            key={index}
            onClick={() => selectTag(item)}
            className={style["searchTag--text"]}
          >
            {item}
            {showItemDelete && (
              <em onClick={(e) => handleDelItem(e, item)}>|x</em>
            )}
          </span>
        ))}
        {showDelete && (
          <WbIcon
            onClick={() => deleteTag()}
            icon="icon-icon_delete"
            customClass={style["searchTag--delete"]}
          ></WbIcon>
        )}
        {children}
      </div>
    ) : null;
    return content;
  }
);

export default SearchTag;
