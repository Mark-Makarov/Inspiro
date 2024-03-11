"use client";

// react/next.js
import { useCallback, useEffect, useState } from "react";

// libraries
import {
  useBroadcastEvent,
  useEventListener,
  useMyPresence,
  useRedo,
  useUndo,
} from "@/liveblocks.config";

// constants
import { SHORTCUTS } from "@/constants";

// hooks
import useInterval from "@/hooks/useInterval";

// components
import LiveCursors from "@/components/cursor/LiveCursors";
import ChatCursor from "@/components/cursor/ChatCursor";
import ReactionSelector from "@/components/reaction/ReactionButton";
import FlyningReaction from "@/components/reaction/FlyningReaction";
import { Comments } from "@/components/comments/Comments";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

// types
import { CursorMode, CursorState, Reaction } from "@/types";

type Props = {
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>;
}

const Live = ({ canvasRef }: Props) => {
  const redo = useRedo();
  const undo = useUndo();
  const [{ cursor }, updateMyPresence] = useMyPresence();
  const [cursorState, setCursorState] = useState<CursorState>({ mode: CursorMode.Hidden });
  const [reactions, setReactions] = useState<Reaction[]>([]);

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

  const broadcast = useBroadcastEvent();

  useInterval(() => {
    setReactions((reactions) => reactions.filter((reaction) => (
      reaction.timestamp > Date.now() - 4000)
    ))
  }, 1000)

  useInterval(() => {
    if (cursorState.mode === CursorMode.Reaction && cursorState.isPressed && cursor) {
      setReactions((reactions) => reactions.concat([{
        point: { x: cursor.x, y: cursor.y },
        value: cursorState.reaction,
        timestamp: Date.now(),
      }]));

      broadcast({
        x: cursor.x,
        y: cursor.y,
        value: cursorState.reaction,
      })
    }
  }, 100)

  useEventListener((eventData) => {
    const { value, x, y } = eventData.event;

    setReactions((reactions) => reactions.concat([{
      point: { x, y },
      value,
      timestamp: Date.now(),
    }]));
  })

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

  return (
    <ContextMenu>
      <ContextMenuTrigger
          className="relative h-full w-full flex flex-1 justify-center items-center"
          id="canvas"
          style={{ cursor: cursorState.mode === CursorMode.Chat ? "none" : "auto" }}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
        >
        <canvas ref={canvasRef} />
        {reactions.map(({ value, timestamp, point }) => (
          <FlyningReaction
              key={timestamp.toString()}
              x={point.x}
              y={point.y}
              timestamp={timestamp}
              value={value}
          />
        ))}
        {cursor && (
            <ChatCursor
                cursor={cursor}
                cursorState={cursorState}
                setCursorState={setCursorState}
                updateMyPresence={updateMyPresence}
            />
        )}
        {cursorState.mode === CursorMode.ReactionSelector && (
            <ReactionSelector setReactions={handleSelectReaction} />
        )}
        <LiveCursors />
        <Comments />
      </ContextMenuTrigger>
      <ContextMenuContent className="right-menu-content">
        {SHORTCUTS.map((item) => (
          <ContextMenuItem
            className="right-menu-item"
            onClick={() => handleContextMenuClick(item.action)}
            key={item.key}
          >
            <p>{item.name}</p>
            <p className="text-sm text-primary-grey-300">
              {item.shortcut}
            </p>
          </ContextMenuItem>
        ))}
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default Live;
