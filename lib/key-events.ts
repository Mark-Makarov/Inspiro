// libraries
import { fabric } from "fabric";
import { v4 as uuid4 } from "uuid";

// types
import { CustomFabricObject } from "@/types";

export const handleCopy = (canvas: fabric.Canvas) => {
  const activeObjects = canvas.getActiveObjects();

  if (activeObjects.length > 0) {
    const serializedObjects = activeObjects.map((obj) => obj.toObject());
    localStorage.setItem("clipboard", JSON.stringify(serializedObjects));
  }

  return activeObjects;
};

export const handlePaste = (
  canvas: fabric.Canvas,
  syncShapeInStorage: (shape: fabric.Object) => void
) => {
  if (!canvas || !(canvas instanceof fabric.Canvas)) {
    console.error("Invalid canvas object. Aborting paste operation.");
    return;
  }

  const clipboardData = localStorage.getItem("clipboard");

  if (clipboardData) {
    try {
      const parsedObjects = JSON.parse(clipboardData);
      parsedObjects.forEach((objData: fabric.Object) => {
        fabric.util.enlivenObjects(
          [objData],
          (enlivenedObjects: fabric.Object[]) => {
            enlivenedObjects.forEach((enlivenedObj) => {
              enlivenedObj.set({
                left: enlivenedObj.left || 0 + 20,
                top: enlivenedObj.top || 0 + 20,
                objectId: uuid4(),
                fill: "#aabbcc",
              } as CustomFabricObject<any>);

              canvas.add(enlivenedObj);
              syncShapeInStorage(enlivenedObj);
            });
            canvas.renderAll();
          },
          "fabric"
        );
      });
    } catch (error) {
      console.error("Error parsing clipboard data:", error);
    }
  }
};

export const handleDelete = (
  canvas: fabric.Canvas,
  deleteShapeFromStorage: (id: string) => void
) => {
  const activeObjects = canvas.getActiveObjects();
  if (!activeObjects || activeObjects.length === 0) return;

  if (activeObjects.length > 0) {
    activeObjects.forEach((obj: CustomFabricObject<any>) => {
      if (!obj.objectId) return;
      canvas.remove(obj);
      deleteShapeFromStorage(obj.objectId);
    });
  }

  canvas.discardActiveObject();
  canvas.requestRenderAll();
};

export const handleKeyDown = ({
  e,
  canvas,
  undo,
  redo,
  syncShapeInStorage,
  deleteShapeFromStorage,
}: {
  e: KeyboardEvent;
  canvas: fabric.Canvas | any;
  undo: () => void;
  redo: () => void;
  syncShapeInStorage: (shape: fabric.Object) => void;
  deleteShapeFromStorage: (id: string) => void;
}) => {
  switch (e.keyCode) {
    case 67: // 'C' key
      if (e.ctrlKey || e.metaKey) {
        handleCopy(canvas);
      }
      break;
    case 86: // 'V' key
      if (e.ctrlKey || e.metaKey) {
        handlePaste(canvas, syncShapeInStorage);
      }
      break;
    case 8: // Backspace key
    case 46: // Delete key
      handleDelete(canvas, deleteShapeFromStorage);
      break;
    case 88: // 'X' key
      if (e.ctrlKey || e.metaKey) {
        handleCopy(canvas);
        handleDelete(canvas, deleteShapeFromStorage);
      }
      break;
    case 90: // 'Z' key
      if (e.ctrlKey || e.metaKey) {
        undo();
      }
      break;
    case 89: // 'Y' key
      if (e.ctrlKey || e.metaKey) {
        redo();
      }
      break;
    case 191: // '/' key
      if (!e.shiftKey) {
        e.preventDefault();
      }
      break;
    default: break;
  }
};
