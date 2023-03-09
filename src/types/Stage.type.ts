import { BookCard } from "./Book.type";

export enum StageTypes {
  Ready,
  InProgress,
  Done,
}

export type LibraryStage = {
  id: number;
  title: string;
  status: StageTypes;
  items: BookCard[];
};
