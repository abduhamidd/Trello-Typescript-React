import {PropsWithChildren, useRef} from "react";
import {ColumnContainer, ColumnTitle} from "./styles";
import {AddNewItem} from "./components/AddNewItem";
import {useAppState} from "./state/AppStateContext";
import {Card} from "./Card";
import {addTask, moveList} from "./state/actions";
import {useItemDrag} from "./hooks/useItemDrag";
import {useDrop} from "react-dnd";
import {isHidden} from "./utils/isHiddent";

interface ColumnProps {
  text: string;
  id: string;
}
export const Column = ({text, id}: ColumnProps) => {
  const {getTasksByListId, dispatch} = useAppState();
  const tasks = getTasksByListId(id);
  const {draggedItem} = useAppState();
  const ref = useRef<HTMLDivElement>(null);
  const [, drop] = useDrop({
    accept: "COLUMN",
    hover() {
      if (!draggedItem) {
        return;
      }
      if (draggedItem.type === "COLUMN") {
        if (draggedItem.id === id) {
          return;
        }
        dispatch(moveList(draggedItem.id, id));
      }
    },
  });

  const {drag} = useItemDrag({type: "COLUMN", id, text});
  drag(ref);
  return (
    <ColumnContainer ref={ref} isHidden={isHidden(draggedItem, "COLUMN", id)}>
      <ColumnTitle>{text}</ColumnTitle>
      {tasks.map((task) => (
        <Card text={task.text} key={task.id} id={id} />
      ))}
      <AddNewItem
        toggleButtonText='+ Add another task'
        onAdd={(text) => dispatch(addTask(text, id))}
        dark
      />
    </ColumnContainer>
  );
};
