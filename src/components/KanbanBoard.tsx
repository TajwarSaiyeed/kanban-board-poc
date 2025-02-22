import { useState } from "react";
import PlusIcon from "../icons/plus-icon";
import { Column, Id } from "../types";
import ColumnContainer from "./ColumnContainer";

const KanbanBoard = () => {
  const [columns, setColumns] = useState<Column[]>([]);

  const generateId = () => {
    return Math.floor(Math.random() * 1000000);
  };

  const createColumn = () => {
    const newColumn: Column = {
      id: generateId().toString(),
      title: `Column ${columns.length + 1}`,
    };
    setColumns([...columns, newColumn]);
  };

  const deleteColumn = (columnId: Id) => {
    const filteredColumns = columns.filter((column) => column.id !== columnId);
    setColumns(filteredColumns);
  };

  console.log(columns);

  return (
    <div
      className="
        m-auto
        flex
        min-h-screen
        overflow-x-auto
        overflow-y-hidden
        px-[40px]
      "
    >
      <div className="m-auto flex gap-2">
        <div
          className="
            flex
            gap-4
            rounded-lg
          "
        >
          {columns.map((column) => (
            <ColumnContainer
              key={column.id}
              column={column}
              deleteColumn={deleteColumn}
            />
          ))}
        </div>
        <button
          onClick={createColumn}
          className="
                h-[60px]
                w-[350px]
                min-w-[350px]
                cursor-pointer
                rounded-lg
                bg-mainBackgroundColor
                border-2
                border-columnBackgroundColor
                p-4
                ring-rose-500
                hover:ring-2
                flex gap-2
            "
        >
          <PlusIcon />
          Add column
        </button>
      </div>
    </div>
  );
};

export default KanbanBoard;
