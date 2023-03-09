import { FormTypes } from "./Form.type";
import { BookCard } from "./Book.type";

export type ModalType = {
  title: string;
  openAction: (isOpen: boolean) => void;
  children?: JSX.Element;
};

export type ModalAction = {
  formType: FormTypes;
  modalTitle: string;
  submitBtnLabel: string;
  book: BookCard;
};
