import {PropsWithChildren} from "react";
import {ColumnContainer, ColumnTitle} from "./styles";
import {AddNewItem} from "./Components/AddNewItem";

interface ColumnProps {
  text: string;
}
export const Column = ({text, children}: PropsWithChildren<ColumnProps>) => {
  return (
    <ColumnContainer>
      <ColumnTitle>{text}</ColumnTitle>
      {children}
      <AddNewItem
        toggleButtonText='+ Add another task'
        onAdd={console.log}
        dark
      />
    </ColumnContainer>
  );
};
