import { useMemo, useState } from "react";
import PlusIcon from "../icons/plus-icon";
import { Column, Id } from "../types";
import ColumnContainer from "./ColumnContainer";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";

const KanbanBoard = () => {
  const [columns, setColumns] = useState<Column[]>([]);
  const columnIds = useMemo(
    () => columns.map((column) => column.id),
    [columns]
  );

  const [activeColumn, setActiveColumn] = useState<Column | null>(null);

  const generateId = () => {
    return Math.floor(Math.random() * 1000000);
  };

  const createColumn = () => {
    const newColumn: Column = {
      id: generateId(),
      title: `Column ${columns.length + 1}`,
    };
    setColumns([...columns, newColumn]);
  };

  const deleteColumn = (columnId: Id) => {
    console.log("delete column", columnId);

    const filteredColumns = columns.filter((column) => column.id !== columnId);
    setColumns(filteredColumns);
  };

  const onDragStart = (event: DragStartEvent) => {
    if (event.active?.data?.current?.type === "Column") {
      const column = event.active.data.current.column as Column;
      setActiveColumn(column);
      return;
    }
  };
  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    if (active.id !== over.id) {
      const overIndex = columns.findIndex((column) => column.id === over.id);
      const activeIndex = columns.findIndex(
        (column) => column.id === active.id
      );

      setColumns((columns) => {
        return arrayMove(columns, activeIndex, overIndex);
      });
    }
  };

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
      <DndContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
        <div className="m-auto flex gap-2">
          <div
            className="
            flex
            gap-4
            rounded-lg
          "
          >
            <SortableContext items={columnIds}>
              {columns.map((column) => (
                <ColumnContainer
                  key={column.id}
                  column={column}
                  deleteColumn={deleteColumn}
                />
              ))}
            </SortableContext>
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

        {createPortal(
          <DragOverlay>
            {activeColumn && (
              <ColumnContainer
                column={activeColumn}
                deleteColumn={deleteColumn}
              />
            )}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  );
};

export default KanbanBoard;
