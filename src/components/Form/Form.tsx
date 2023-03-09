import React, { FormEvent, useReducer, useState } from "react";
import theme from "./Form.module.scss";
import cx from "classnames";
import { MdOutlineCheck, MdOutlineClose } from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { genres } from "../../constants/constants";
import { BookCard, BookGenre } from "../../types/Book.type";
import getLibrary from "../../helpers/getLibrary";
import saveLibrary from "../../helpers/saveLibrary";
import { BookForm, BookFormEvent, FormTypes } from "../../types/Form.type";
import { LibraryStage } from "../../types/Stage.type";

const formReducer = (state: BookCard, event: BookFormEvent) => {
  return {
    ...state,
    [event.name]: event.value,
  };
};

const Form: React.FC<BookForm> = ({
  formType,
  submitLabel,
  cancelAction,
  book,
}) => {
  const booksLibrary = getLibrary();

  const bookMode = formType === FormTypes.Add || formType === FormTypes.Edit;

  const [formData, setFormData] = useReducer(formReducer, book);

  const { title, author, review, rating, size, genre } = book;

  const [submitting, setSubmitting] = useState<boolean>(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    if (formType === FormTypes.Add) {
      booksLibrary[0].items.push({ ...formData, id: book.id });
      saveLibrary(booksLibrary);
    }

    if (formType === FormTypes.Delete) {
      saveLibrary(
        booksLibrary.map((stage: LibraryStage) => {
          return {
            ...stage,
            items: stage.items.filter((el: BookCard) => el.id !== formData.id),
          };
        })
      );
    }

    if (formType !== FormTypes.Delete && formType !== FormTypes.Add) {
      booksLibrary.map(
        (stage: LibraryStage) =>
          (stage.items[
            stage.items.findIndex((el: BookCard) => el.id === book.id)
          ] = {
            ...formData,
          })
      );
      saveLibrary(booksLibrary);
    }

    setTimeout(() => {
      setSubmitting(false);
      cancelAction(false);
    }, 1000);
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement | any>
  ) =>
    event.target.type === "checkbox"
      ? setFormData({
          name: "genre",
          value: event.target.checked
            ? [
                ...formData.genre,
                {
                  name: event.target.name,
                  color: event.target.value,
                },
              ]
            : formData.genre.filter(
                (elem: BookGenre) => elem.name !== event.target.id
              ),
        })
      : setFormData({
          name: event.target.name,
          value: event.target.value,
        });

  return (
    <form className={theme.form} onSubmit={handleSubmit}>
      {bookMode ? (
        <>
          <div className={theme.formRow}>
            <div className={theme.formInput}>
              <label htmlFor="title">Book title</label>
              <input
                type="text"
                id="title"
                name="title"
                placeholder="Enter book title"
                defaultValue={title}
                required
                minLength={3}
                maxLength={50}
                onChange={handleChange}
              />
              <span>This field is required and must be 3 to 50 symbols</span>
            </div>
            <div className={theme.formInput}>
              <label htmlFor="author">Book author</label>
              <input
                type="text"
                id="author"
                name="author"
                placeholder="Type something..."
                defaultValue={author}
                required
                minLength={3}
                maxLength={50}
                onChange={handleChange}
              />
              <span>This field is required and must be 3 to 50 symbols</span>
            </div>
            <div className={theme.formInput}>
              <label htmlFor="wordCount">Word count</label>
              <input
                type="text"
                id="size"
                name="size"
                placeholder="Type something..."
                defaultValue={size}
                required
                minLength={3}
                maxLength={10}
                onChange={handleChange}
              />
              <span>This field is required and must be 3 to 50 symbols</span>
            </div>
          </div>
          <div className={theme.formSubtitle}>Book genre</div>
          <div className={theme.formList}>
            {genres.map((genreItem: BookGenre) => (
              <div className={theme.formCheckbox} key={genreItem.name}>
                <input
                  key={genreItem.name}
                  type="checkbox"
                  defaultChecked={
                    genre.filter((e) => e.name === genreItem.name).length > 0
                  }
                  id={genreItem.name}
                  name={genreItem.name}
                  value={genreItem.color}
                  onChange={handleChange}
                />
                <label htmlFor={genreItem.name}>{genreItem.name}</label>
              </div>
            ))}
          </div>
          {(formData.genre.length === 0 || formData.genre.length > 2) && (
            <span className={theme.formError}>
              Please, select at least 1 and maximum 2 genres per book
            </span>
          )}
        </>
      ) : (
        <>
          <div className={theme.formRow}>
            <div className={theme.formInput}>
              <label htmlFor="rating">Rating</label>
              <input
                type="number"
                id="rating"
                name="rating"
                min="1"
                max="10"
                step="1"
                placeholder="Type something..."
                defaultValue={rating}
                required
                onChange={handleChange}
              />
              <span>This field is required and must be set from 1 to 10</span>
            </div>
          </div>
          <div className={cx(theme.formInput, theme.formTextarea)}>
            <label htmlFor="review">Add review</label>
            <textarea
              id="review"
              name="review"
              defaultValue={review}
              rows={10}
              cols={50}
              required
              onChange={handleChange}
            />
            <span>This field is required and must be not empty</span>
          </div>
        </>
      )}
      <div className={theme.formFooter}>
        <div>
          <button
            className={cx(theme.formButton, theme.formButtonCancel)}
            onClick={() => cancelAction(false)}
          >
            <MdOutlineClose />
            Cancel
          </button>
          {formType === FormTypes.Edit && (
            <button
              className={cx(theme.formButton, theme.formButtonCancel)}
              onClick={() => (formType = FormTypes.Delete)}
            >
              Delete
            </button>
          )}
        </div>
        <button
          className={cx(theme.formButton, theme.formButtonSubmit)}
          type="submit"
          disabled={submitting}
        >
          {submitting ? (
            <>
              <AiOutlineLoading3Quarters className={theme.loading} />
              Submitting
            </>
          ) : (
            <>
              <MdOutlineCheck />
              {submitLabel}
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default Form;
