// react/next.js
import { useEffect } from "react";

// libraries
import { useRedo, useUndo } from "@/liveblocks.config";
import { fabric } from "fabric";

// utils
import {
  handleCanvasMouseDown,
  handleCanvasMouseMove,
  handleCanvasMouseUp,
  handleCanvasObjectModified,
  handleCanvasObjectScaling,
  handleCanvasSelectionCreated,
  handlePathCreated,
  handleResize,
  initializeFabric,
} from "@/lib/canvas";
import { handleKeyDown } from "@/lib/key-events";

// types
import { ActiveElement, Attributes } from "@/types";

interface Props {
  fabricRef: React.MutableRefObject<fabric.Canvas | null>;
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>;
  selectedShapeRef: React.MutableRefObject<string | null>;
  isDrawing: React.MutableRefObject<boolean>;
  shapeRef: React.MutableRefObject<fabric.Object | null>;
  syncShapeInStorage: (shape: Object) => void;
  activeObjectRef: React.MutableRefObject<fabric.Object | null>;
  setActiveElement: React.Dispatch<React.SetStateAction<ActiveElement>>;
  isEditingRef: React.MutableRefObject<boolean>;
  setElementAttributes: React.Dispatch<React.SetStateAction<Attributes>>;
  deleteShapeFromStorage: (objectId: string) => void;
}

const useHandleCanvasEvents = ({
  canvasRef,
  fabricRef,
  activeObjectRef,
  syncShapeInStorage,
  isDrawing,
  shapeRef,
  selectedShapeRef,
  setActiveElement,
  isEditingRef,
  setElementAttributes,
  deleteShapeFromStorage,
}: Props) => {
  const redo = useRedo();
  const undo = useUndo();

  useEffect(() => {
    const canvas = initializeFabric({ canvasRef, fabricRef });

    canvas.on("mouse:down", (options) => {
      handleCanvasMouseDown({
        options,
        canvas,
        selectedShapeRef,
        isDrawing,
        shapeRef,
      });
    });

    canvas.on("mouse:move", (options) => {
      handleCanvasMouseMove({
        options,
        canvas,
        selectedShapeRef,
        isDrawing,
        shapeRef,
        syncShapeInStorage,
      });
    });

    canvas.on("mouse:up", () => {
      handleCanvasMouseUp({
        canvas,
        selectedShapeRef,
        isDrawing,
        shapeRef,
        syncShapeInStorage,
        setActiveElement,
        activeObjectRef,
      });
    });

    canvas.on("object:modified", (options) => {
      handleCanvasObjectModified({
        options,
        syncShapeInStorage,
      })
    });

    canvas.on("selection:created", (options) => {
      handleCanvasSelectionCreated({
        options,
        isEditingRef,
        setElementAttributes,
      })
    });

    canvas.on("object:scaling", (options) => {
      handleCanvasObjectScaling({
        options,
        setElementAttributes,
      })
    });

    canvas.on("path:created", (options) => {
      handlePathCreated({
        options,
        syncShapeInStorage,
      })
    });

    window.addEventListener("resize", () => {
      handleResize({  canvas: fabricRef.current })
    });

    window.addEventListener("keydown", (e) => {
      handleKeyDown({
        e,
        canvas: fabricRef.current,
        undo,
        redo,
        syncShapeInStorage,
        deleteShapeFromStorage,
      })
    })

    return () => {
      canvas.dispose();
    }
  }, [canvasRef])
};

export default useHandleCanvasEvents;
