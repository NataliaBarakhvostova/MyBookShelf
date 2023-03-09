import { BookCard, BookGenre } from "./Book.type";

export enum FormTypes {
  Add,
  Edit,
  AddReview,
  EditReview,
  Delete,
}

export type BookForm = {
  formType: FormTypes;
  submitLabel: string;
  cancelAction: (isOpen: boolean) => void;
  book: BookCard;
};

export type BookFormEvent = {
  name: string;
  value: BookGenre[] | string | number;
};
