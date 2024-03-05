"use client";

// react/next.js
import {useCallback, useEffect, useState} from "react";

// hooks
import {useMyPresence, useOthers} from "@/liveblocks.config";

// components
import LiveCursors from "@/components/cursor/LiveCursors"
import ChatCursor from "@/components/cursor/ChatCursor";

// types
import {CursorMode, CursorState, Reaction} from "@/types";
import ReactionSelector from "@/components/reaction/ReactionButton";

const Live = () => {
  const others = useOthers();
  const [{ cursor }, updateMyPresence] = useMyPresence() as any;
  const [cursorState, setCursorState] = useState<CursorState>({ mode: CursorMode.Hidden });
  const [reaction, setReaction] = useState<Reaction[]>([]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    e.preventDefault();

    if (cursor == null || cursorState.mode !== CursorMode.ReactionSelector) {
      const x = e.clientX - e.currentTarget.getBoundingClientRect().x;
      const y = e.clientY - e.currentTarget.getBoundingClientRect().y;

      updateMyPresence({ cursor: { x, y } });
    }
  }, []);

  const handlePointerLeave = useCallback((e: React.PointerEvent) => {
    setCursorState({ mode: CursorMode.Hidden });
    updateMyPresence({ cursor: null, message: null });
  }, []);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    e.preventDefault();

    const x = e.clientX - e.currentTarget.getBoundingClientRect().x;
    const y = e.clientY - e.currentTarget.getBoundingClientRect().y;

    updateMyPresence({ cursor: { x, y } });

    setCursorState((state: CursorState) =>
      cursorState.mode === CursorMode.Reaction ? {...state, isPressed: true} : state
    );
  }, [cursorState.mode]);

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    setCursorState((state: CursorState) =>
        // TODO isPressed: false
        cursorState.mode === CursorMode.Reaction ? {...state, isPressed: true} : state
    );
  }, [cursorState.mode]);

  useEffect(() => {
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key === "/") {
        setCursorState({
          mode: CursorMode.Chat,
          previousMessage: null,
          message: "",
        });
      } else if (e.key === "Escape") {
        updateMyPresence({ message: "" });
        setCursorState({ mode: CursorMode.Hidden });
      } else if (e.key === "e") {
        setCursorState({ mode: CursorMode.ReactionSelector });
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

  return (
    <div
        className="h-[100vh] w-full flex justify-center items-center text-center"
        onPointerMove={handlePointerMove}
        onPointerDown={handlePointerDown}
        onPointerLeave={handlePointerLeave}
        onPointerUp={handlePointerUp}
    >
      <h1 className="font-5xl text-white">Inspiro</h1>
      {cursor && (
          <ChatCursor
              cursor={cursor}
              cursorState={cursorState}
              setCursorState={setCursorState}
              updateMyPresence={updateMyPresence}
          />
      )}
      {cursorState.mode === CursorMode.ReactionSelector && (
          <ReactionSelector setReaction={(reaction) => setReaction(reaction)} />
      )}
      <LiveCursors others={others} />
    </div>
  );
};

export default Live;
