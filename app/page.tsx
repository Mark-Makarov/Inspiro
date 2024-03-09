"use client";

// react/next.js
import { useEffect, useRef, useState } from "react";

// libraries
import { fabric } from "fabric";
import { useMutation, useRedo, useStorage, useUndo } from "@/liveblocks.config";

// constants
import { DEFAULT_NAV_ELEMENT } from "@/constants";

// utils
import {
  handleCanvasMouseMove,
  handleCanvasMouseDown,
  handleResize,
  initializeFabric,
  handleCanvasMouseUp,
  renderCanvas,
  handleCanvasObjectModified, handleCanvasSelectionCreated, handleCanvasObjectScaling,
} from "@/lib/canvas";
import { handleDelete, handleKeyDown } from "@/lib/key-events";
import { handleImageUpload } from "@/lib/shapes";

// components
import Live from "@/components/Live";
import Navbar from "@/components/Navbar";
import LeftSidebar from "@/components/LeftSidebar";
import RightSidebar from "@/components/RightSidebar";

// types
import { ActiveElement, Attributes } from "@/types";

export default function Page() {
  const redo = useRedo();
  const undo = useUndo();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricRef = useRef<fabric.Canvas | null>(null);
  const isDrawing = useRef(false);
  const shapeRef = useRef<fabric.Object | null>(null);
  const selectedShapeRef = useRef<string | null>(null);
  const activeObjectRef = useRef<fabric.Object | null>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const isEditingRef = useRef(false);

  const [activeElement, setActiveElement] = useState<ActiveElement>({
    name: "",
    icon: "",
    value: "",
  });
  const [elementAttributes, setElementAttributes] = useState<Attributes>({
    width: "",
    height: "",
    fontSize: "",
    fontFamily: "",
    fontWeight: "",
    fill: "#aabbcc",
    stroke: "#aabbcc",
  });

  const canvasObjects = useStorage((root) => root.canvasObjects);

  const syncShapeInStorage = useMutation(({ storage }, object) => {
    if (!object) return;

    const { objectId } = object;

    const shapeData = object.toJSON();
    shapeData.objectId = objectId;

    const canvasObjects = storage.get("canvasObjects");
    canvasObjects.set(objectId, shapeData);
  }, []);

  const deleteAllShapes = useMutation(({ storage }) => {
    const canvasObjects = storage.get("canvasObjects");

    if (!canvasObjects || canvasObjects.size === 0) {
      return true
    }

    for (const [key, value] of canvasObjects.entries()) {
      canvasObjects.delete(key);
    }

    return canvasObjects.size === 0;
  }, [])

  const deleteShapeFromStorage = useMutation(({ storage }, objectId) => {
    const canvasObjects = storage.get("canvasObjects");

    canvasObjects.delete(objectId);
  }, [])

  const handleActiveElement = (element: ActiveElement) => {
    setActiveElement(element);

    switch (element?.value) {
      case "reset":
        deleteAllShapes();
        fabricRef.current?.clear();
        setActiveElement(DEFAULT_NAV_ELEMENT);
        break;
      case "delete":
        handleDelete(fabricRef.current as any, deleteShapeFromStorage);
        setActiveElement(DEFAULT_NAV_ELEMENT);
        break;
      case "image":
        imageInputRef.current?.click();
        isDrawing.current = false;

        if (fabricRef.current) {
          fabricRef.current.isDrawingMode = false;
        }
        break;

      default: break;
    }

    selectedShapeRef.current = element?.value as string;
  };

  const imageInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();

    if (e.target.files) {
      handleImageUpload({
        file: e.target.files[0],
        canvas: fabricRef as any,
        shapeRef,
        syncShapeInStorage,
      })
    }
  };

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

  useEffect(() => {
    renderCanvas({
      fabricRef,
      canvasObjects,
      activeObjectRef,
    });
  }, [canvasObjects])

  return (
    <main className="h-screen overflow-hidden" >
      <Navbar
          activeElement={activeElement}
          handleActiveElement={handleActiveElement}
          imageInputRef={imageInputRef}
          handleImageUpload={imageInputHandler}
      />
      <section className="flex h-full flex-row">
        <LeftSidebar allShapes={Array.from(canvasObjects)} />
        <Live canvasRef={canvasRef}/>
        <RightSidebar
          elementAttributes={elementAttributes}
          setElementAttributes={setElementAttributes}
          fabricRef={fabricRef}
          isEditingRef={isEditingRef}
          activeObjectRef={activeObjectRef}
          syncShapeInStorage={syncShapeInStorage}
        />
      </section>
    </main>
  );
}
