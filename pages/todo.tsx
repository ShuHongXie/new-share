import type {
  NextPage,
  GetServerSideProps,
  GetServerSidePropsContext,
} from "next";
import React, { useState } from "react";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";

interface TodoItem {
  text: string;
  id: number;
  isComplete: boolean;
}

interface TodoItemProps {
  item: TodoItem;
}

const todoListState = atom({
  key: "todoListState",
  default: [] as TodoItem[],
});

const todoListFilterState = atom({
  key: "todoListFilterState",
  default: "Show All",
});

const Todo: NextPage = (props) => {
  const todoList = useRecoilValue(todoListState);

  return (
    <>
      {/* <TodoListStats />
      <TodoListFilters /> */}
      <TodoItemCreator />

      {todoList.map((todoItem: TodoItem) => (
        <TodoItem key={todoItem.id} item={todoItem} />
      ))}
    </>
  );
};

const TodoItem: React.FC<TodoItemProps> = ({ item }) => {
  const [todoList, setTodoList] = useRecoilState(todoListState);
  const index = todoList.findIndex((listItem) => listItem === item);

  const editItemText = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newList = replaceItemAtIndex(todoList, index, {
      ...item,
      text: e.target.value,
    });

    setTodoList(newList);
  };

  const toggleItemCompletion = () => {
    const newList = replaceItemAtIndex(todoList, index, {
      ...item,
      isComplete: !item.isComplete,
    });

    setTodoList(newList);
  };

  const deleteItem = () => {
    const newList = removeItemAtIndex(todoList, index);

    setTodoList(newList);
  };

  return (
    <div>
      <input type="text" value={item.text} onChange={editItemText} />
      <input
        type="checkbox"
        checked={item.isComplete}
        onChange={toggleItemCompletion}
      />
      <button onClick={deleteItem}>X</button>
    </div>
  );
};

function replaceItemAtIndex(
  arr: TodoItem[],
  index: number,
  newValue: TodoItem
) {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
}

function removeItemAtIndex(arr: TodoItem[], index: number) {
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
}

// function TodoListFilters() {
//   const [filter, setFilter] = useRecoilState(todoListFilterState);

//   const updateFilter = ({ target: { value } }) => {
//     setFilter(value);
//   };

//   return (
//     <>
//       Filter:
//       <select value={filter} onChange={updateFilter}>
//         <option value="Show All">All</option>
//         <option value="Show Completed">Completed</option>
//         <option value="Show Uncompleted">Uncompleted</option>
//       </select>
//     </>
//   );
// }

// Item====================================================

function TodoItemCreator() {
  const [inputValue, setInputValue] = useState("");
  const setTodoList = useSetRecoilState(todoListState);

  const addItem = () => {
    setTodoList((oldTodoList) => [
      ...oldTodoList,
      {
        id: getId(),
        text: inputValue,
        isComplete: false,
      },
    ]);
    setInputValue("");
  };

  const onChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(value);
  };

  const onkeydown = (
    e: React.KeyboardEvent<HTMLInputElement> &
      React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.keyCode == 13) {
      setInputValue(e.target.value);
      addItem();
    }
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={onChange}
        onKeyDown={onkeydown}
      />
      <button onClick={addItem}>Add</button>
    </div>
  );
}

// 用于创建唯一 id 的工具函数
let id = 0;
function getId() {
  return id++;
}

// ====================================================

// const todoListStatsState = selector({
//   key: "todoListStatsState",
//   get: ({ get }) => {
//     const todoList = get(todoListState);
//     const totalNum = todoList.length;
//     const totalCompletedNum = todoList.filter((item) => item.isComplete).length;
//     const totalUncompletedNum = totalNum - totalCompletedNum;
//     const percentCompleted =
//       totalNum === 0 ? 0 : (totalCompletedNum / totalNum) * 100;

//     return {
//       totalNum,
//       totalCompletedNum,
//       totalUncompletedNum,
//       percentCompleted,
//     };
//   },
// });

// function TodoListStats() {
//   const { totalNum, totalCompletedNum, totalUncompletedNum, percentCompleted } =
//     useRecoilValue(todoListStatsState);

//   const formattedPercentCompleted = Math.round(percentCompleted);

//   return (
//     <ul>
//       <li>Total items: {totalNum}</li>
//       <li>Items completed: {totalCompletedNum}</li>
//       <li>Items not completed: {totalUncompletedNum}</li>
//       <li>Percent completed: {formattedPercentCompleted}</li>
//     </ul>
//   );
// }

export default Todo;
