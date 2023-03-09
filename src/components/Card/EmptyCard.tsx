import React from "react";
import theme from "./Card.module.scss";
import { EmptyBookCard } from "../../types/Book.type";

const EmptyCard: React.FC<EmptyBookCard> = ({ text }) => {
  return <h3 className={theme.bookCardEmpty}>{text}</h3>;
};

export default EmptyCard;
