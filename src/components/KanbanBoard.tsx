import { useState } from "react";
import PlusIcon from "../icons/plus-icon";
import { Column } from "../types";

const KanbanBoard = () => {
  const [columns, setColumns] = useState<Column[]>([]);

  const generateId = () => {
    return Math.floor(Math.random() * 1000000);
  };

  const createColumn = () => {
    setColumns([
      ...columns,
      {
        id: generateId(),
        title: `Column ${columns.length + 1}`,
      },
    ]);
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
          "
        >
          {columns.map((column) => (
            <div
              key={column.id}
              className="bg-columnBackgroundColor p-4 rounded-lg"
            >
              {column.title}
            </div>
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
