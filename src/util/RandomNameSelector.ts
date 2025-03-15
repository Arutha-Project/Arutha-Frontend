import { drawingObjectName } from "../constants";

export const getRandomDrawingObject = (): string => {
  const randomIndex = Math.floor(Math.random() * drawingObjectName.length);
  return drawingObjectName[randomIndex];
}
