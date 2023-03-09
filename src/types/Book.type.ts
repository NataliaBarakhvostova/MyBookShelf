import { StageTypes } from "./Stage.type";

export type BookGenre = {
  name: string;
  color: string;
};

export type BookCard = {
  id: number;
  title: string;
  author: string;
  genre: BookGenre[];
  size: string;
  rating: number;
  review?: string;
  status?: StageTypes;
  children?: JSX.Element;
};

export type BookCoverType = {
  backgroundColor: string;
  fontName: string;
  title: string;
};

export type EmptyBookCard = {
  text: string;
};
