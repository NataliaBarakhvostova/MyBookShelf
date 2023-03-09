import React from "react";
import theme from "./Card.module.scss";
import BookCover from "./BookCover";
import { StageTypes } from "../../types/Stage.type";
import { BookCard } from "../../types/Book.type";

const Card: React.FC<BookCard> = ({
  title,
  author,
  genre,
  rating,
  size,
  status,
  children,
}) => {
  const defaultGenre = {
    color: "#626262",
    name: "No genre",
  }
  const bookIsRead = status === StageTypes.Done;
  const ratingAvailable = rating > 0;

  return (
    <div className={theme.bookCard}>
      <BookCover
        backgroundColor={genre[0]?.color ? genre[0].color : defaultGenre.color}
        title={title}
        fontName={genre[0]?.name ? genre[0]?.name : defaultGenre.name}
      />
      <div className={theme.bookCardContent}>
        <h3>{title}</h3>
        <p>by {author}</p>
        <p>Words: {size}</p>
        <div className={theme.bookCardFooter}>
          <div className={theme.genresList}>
            {genre.map((genreItem) => (
              <div
                key={genreItem.name}
                style={{ backgroundColor: genreItem.color || "#e8e8e8" }}
                className={theme.genresListItem}
              >
                {genreItem.name}
              </div>
            ))}
          </div>
          {children}
        </div>
        {bookIsRead && ratingAvailable && (
          <div className={theme.bookCardRating}>
            <span>
              {rating}/<span>10</span>
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
