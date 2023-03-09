import React, { useEffect, useState } from "react";
import theme from "./Stages.module.scss";

import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import Card from "../Card/Card";
import { IoMdAdd } from "react-icons/io";
import Modal from "../Modal/Modal";
import Form from "../Form/Form";
import { MdOutlineEdit, MdOutlineRateReview } from "react-icons/md";
import { RxLightningBolt } from "react-icons/rx";
import getLibrary from "../../helpers/getLibrary";
import { LibraryStage, StageTypes } from "../../types/Stage.type";
import { BookCard } from "../../types/Book.type";
import { FormTypes } from "../../types/Form.type";
import { ModalAction } from "../../types/Modal.type";
import EmptyCard from "../Card/EmptyCard";
import saveLibrary from "../../helpers/saveLibrary";
import { emptyStages } from "../../constants/constants";

const Stages: React.FC = () => {
  const emptyBook = {
    id: Date.now(),
    title: "",
    author: "",
    genre: [],
    size: "",
    rating: 0,
    review: "",
  };
  const [booksLibrary, setBooksLibrary] = useState(getLibrary());
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDragEnded, setIsDragEnded] = useState<boolean>(false);
  const [modalActions, setModalActions] = useState<ModalAction>({
    formType: FormTypes.Add,
    modalTitle: "",
    submitBtnLabel: "",
    book: emptyBook,
  });

  useEffect(() => {
    setBooksLibrary(getLibrary());
  }, [isModalOpen, isDragEnded]);

  const onDragEnded = (result: DropResult) => {
    // dropped nowhere
    if (!result.destination) return;

    const { source, destination } = result;

    const start = booksLibrary[source.droppableId];
    const finish = booksLibrary[destination.droppableId];

    //drop between the same stages/columns
    if (start === finish) {
      const oldItems = start.items;
      const newItemPosition = start.items.findIndex(
        (el: BookCard) => el.id === destination.index
      );

      const oldItemPosition = start.items.findIndex(
        (el: BookCard) => el.id === source.index
      );
      const draggableElem = start.items[oldItemPosition];

      oldItems.splice(oldItemPosition, 1);
      oldItems.splice(newItemPosition, 0, draggableElem);

      booksLibrary[source.droppableId] = {
        ...start,
        items: oldItems,
      };
    } else {
      //drop between different stages/columns
      const oldItems = start.items;
      const newItems = finish.items;

      const newItemPosition = finish.items.findIndex(
        (el: BookCard) => el.id === destination.index
      );

      const oldItemPosition = start.items.findIndex(
        (el: BookCard) => el.id === source.index
      );

      const draggableElem = start.items[oldItemPosition];

      oldItems.splice(oldItemPosition, 1);

      newItemPosition === 0
        ? newItems.unshift(draggableElem)
        : newItemPosition > 0
        ? newItems.splice(newItemPosition, 0, draggableElem)
        : newItems.push(draggableElem);

      booksLibrary[destination.droppableId] = {
        ...finish,
        items: newItems,
      };
    }

    saveLibrary(booksLibrary);
    setIsDragEnded(!isDragEnded);
  };

  const handleModalAction = (
    formType: FormTypes,
    modalTitle: string,
    submitBtnLabel: string,
    book: BookCard
  ) => {
    setModalActions({
      formType,
      modalTitle,
      submitBtnLabel,
      book,
    });
    setIsModalOpen(!isModalOpen);
  };

  const actionModal = isModalOpen && (
    <Modal openAction={setIsModalOpen} title={modalActions.modalTitle}>
      <Form
        formType={modalActions.formType}
        cancelAction={setIsModalOpen}
        submitLabel={modalActions.submitBtnLabel}
        book={modalActions.book}
      />
    </Modal>
  );

  return (
    <>
      <DragDropContext onDragEnd={onDragEnded}>
        <div className={theme.grid}>
          {booksLibrary.map((stage: LibraryStage) => {
            return (
              <div key={stage.id}>
                <div className={theme.stage}>
                  <span className={theme.stageTitle}>{stage.title}:</span>
                  <span className={theme.stageCounter}>
                    {stage.items.length}
                  </span>
                </div>
                <Droppable droppableId={stage.id.toString()} key={stage.id}>
                  {(provided, snapshot) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className={theme.gridColumn}
                      style={
                        snapshot.isDraggingOver
                          ? { backgroundColor: "#FAE603" }
                          : { backgroundColor: "transparent" }
                      }
                    >
                      {stage.items.map((book: BookCard) => (
                        <Draggable
                          draggableId={book.id.toString()}
                          index={book.id}
                          key={book.id}
                        >
                          {(provided, snapshot) => (
                            <div
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                            >
                              <Card {...book} status={stage.status}>
                                {stage.status === StageTypes.Done ? (
                                  <button
                                    className={theme.icon}
                                    onClick={() =>
                                      book.rating > 0
                                        ? handleModalAction(
                                            FormTypes.EditReview,
                                            `Edit review for "${book.title}"`,
                                            "Edit review",
                                            {
                                              ...book,
                                            }
                                          )
                                        : handleModalAction(
                                            FormTypes.AddReview,
                                            `Add review for "${book.title}"`,
                                            "Add review",
                                            {
                                              ...book,
                                            }
                                          )
                                    }
                                  >
                                    <MdOutlineRateReview />
                                  </button>
                                ) : (
                                  <button
                                    className={theme.icon}
                                    onClick={() =>
                                      handleModalAction(
                                        FormTypes.Edit,
                                        `Edit "${book.title}"`,
                                        "Edit book",
                                        {
                                          ...book,
                                        }
                                      )
                                    }
                                  >
                                    <MdOutlineEdit />
                                  </button>
                                )}
                              </Card>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
                {stage.status === StageTypes.Ready && (
                  <>
                    <button
                      className={theme.addBookCard}
                      onClick={() =>
                        handleModalAction(
                          FormTypes.Add,
                          "Add new book",
                          "Submit book",
                          emptyBook
                        )
                      }
                    >
                      <IoMdAdd />
                      <span>Add book</span>
                    </button>
                    <button
                      className={theme.clearAll}
                      onClick={() => {
                        setBooksLibrary(emptyStages);
                        saveLibrary(emptyStages);
                      }}
                    >
                      <RxLightningBolt />
                      <span>Clear all</span>
                      <RxLightningBolt />
                    </button>
                  </>
                )}
                {!stage.items.length && stage.status !== StageTypes.Ready && (
                  <EmptyCard text={"No books here ¯\\_(ツ)_/¯"} />
                )}
              </div>
            );
          })}
        </div>
      </DragDropContext>
      {actionModal}
    </>
  );
};

export default Stages;
