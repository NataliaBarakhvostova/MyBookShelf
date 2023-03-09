import { LibraryStage } from "../types/Stage.type";

const saveLibrary = (data: LibraryStage[]) =>
  localStorage.setItem("books", JSON.stringify(data));
export default saveLibrary;
