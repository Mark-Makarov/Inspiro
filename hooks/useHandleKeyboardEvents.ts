// react/next.js
import { useEffect } from "react";

// types
import { CursorMode, CursorState } from "@/types";

interface Props {
  setCursorState: (cursorState: CursorState) => void;
  updateMyPresence: (
    presence: Partial<{
      cursor: { x: number; y: number };
      cursorColor: string;
      message: string;
    }>
  ) => void;
}

const useHandleKeyboardEvents = ({
  setCursorState,
  updateMyPresence,
}: Props) => {
  useEffect(() => {
    const onKeyUp = (e: KeyboardEvent) => {
      switch (e.key) {
        case "/":
          setCursorState({
            mode: CursorMode.Chat,
            previousMessage: null,
            message: "",
          });
          break;
        case "Escape":
          updateMyPresence({ message: "" });
          setCursorState({ mode: CursorMode.Hidden });
          break;
        case "e":
          setCursorState({ mode: CursorMode.ReactionSelector });
          break;

        default: break;
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/") {
        e.preventDefault();
      }
    };

    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);
};

export default useHandleKeyboardEvents;
