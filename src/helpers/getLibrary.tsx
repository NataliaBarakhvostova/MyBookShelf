import { demoStages } from "../constants/constants";
import saveLibrary from "./saveLibrary";

const getLibrary = () => {
  const defaultValue = JSON.stringify(demoStages);

  let currentValue;

  try {
    currentValue = JSON.parse(localStorage.getItem("books") || defaultValue);
  } catch (error) {
    currentValue = defaultValue;
  }

  saveLibrary(currentValue);

  return currentValue;
};

export default getLibrary;
