import { useSortable } from "@dnd-kit/sortable";
import TrashIcon from "../icons/trash-icon";
import { Column, Id } from "../types";
import { CSS } from "@dnd-kit/utilities";

interface ColumnContainerProps {
  column: Column;
  deleteColumn: (id: Id) => void;
}

const ColumnContainer = ({ column, deleteColumn }: ColumnContainerProps) => {
  const {
    listeners,
    attributes,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="bg-columnBackgroundColor w-[350px] h-[500px] max-h-[500px]rounded-lg flex flex-col opacity-40 border-2 border-rose-500"
      ></div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-columnBackgroundColor w-[350px] h-[500px] max-h-[500px]rounded-lg flex flex-col"
    >
      {/* column title*/}
      <div
        className="
        bg-mainBackgroundColor
        text-md
        h-[60px]
        cursor-grab
        rounded-lg
        rounded-b-none
        p-3
        font-bold
        border-columnBackgroundColor
        border-4
        flex justify-between items-center
      "
        {...attributes}
        {...listeners}
      >
        <div className="flex items-center gap-2">
          <div
            className="
          flex justify-center items-center
          bg-columnBackgroundColor
          px-2 py-1 text-sm rounded-full
         "
          >
            0
          </div>
          {column.title}
        </div>
        <button
          onClick={() => deleteColumn(column.id)}
          className="
            stroke-gray-500
            hover:stroke-white
            hover:bg-columnBackgroundColor
            rounded
            px-1 py-2
            cursor-pointer
          "
        >
          <TrashIcon />
        </button>
      </div>

      {/* column tasks container */}

      <div className="flex flex-grow">Content</div>

      {/* column footer */}
      <div>footer</div>
    </div>
  );
};

export default ColumnContainer;
