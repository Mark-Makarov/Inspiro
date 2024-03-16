// react/next.js
import { useCallback } from "react";

// libraries
import { useRedo, useUndo } from "@/liveblocks.config";

// types
import { CursorMode, CursorState } from "@/types";

interface Props {
  cursor: { x: number; y: number } | null;
  cursorState: CursorState;
  setCursorState: React.Dispatch<React.SetStateAction<CursorState>>;
  updateMyPresence: (
    presence: Partial<{
      cursor: { x: number; y: number } | null;
      cursorColor: string;
      message: string | null;
    }>
  ) => void;
}

const useHandlePointerEvents = ({
  cursor,
  cursorState,
  setCursorState,
  updateMyPresence,
}: Props) => {
  const redo = useRedo();
  const undo = useUndo();

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    e.preventDefault();

    if (cursor == null || cursorState.mode !== CursorMode.ReactionSelector) {
      const x = e.clientX - e.currentTarget.getBoundingClientRect().x;
      const y = e.clientY - e.currentTarget.getBoundingClientRect().y;

      updateMyPresence({ cursor: { x, y } });
    }
  }, []);

  const handlePointerLeave = useCallback(() => {
    setCursorState({ mode: CursorMode.Hidden });
    updateMyPresence({ cursor: null, message: null });
  }, []);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    const x = e.clientX - e.currentTarget.getBoundingClientRect().x;
    const y = e.clientY - e.currentTarget.getBoundingClientRect().y;

    updateMyPresence({ cursor: { x, y } });

    setCursorState((state: CursorState) =>
      cursorState.mode === CursorMode.Reaction ? { ...state, isPressed: true } : state
    );
  }, [cursorState.mode]);

  const handlePointerUp = useCallback(() => {
    setCursorState((state: CursorState) =>
      cursorState.mode === CursorMode.Reaction ? { ...state, isPressed: false } : state
    );
  }, [cursorState.mode]);

  const handleSelectReaction = useCallback((reaction: string) => {
    setCursorState({mode: CursorMode.Reaction, reaction, isPressed: false})
  }, [])

  const handleContextMenuClick = useCallback((action: string) => {
    switch (action) {
      case "Chat":
        setCursorState({
          mode: CursorMode.Chat,
          previousMessage: null,
          message: "",
        })
        break;
      case "Undo":
        undo();
        break;
      case "Redo":
        redo();
        break;
      case "Reactions":
        setCursorState({
          mode: CursorMode.ReactionSelector,
        });
        break

      default: break;
    }
  }, []);

  return {
    handlePointerDown,
    handlePointerMove,
    handlePointerLeave,
    handlePointerUp,
    handleSelectReaction,
    handleContextMenuClick,
  };
};

export default useHandlePointerEvents;
