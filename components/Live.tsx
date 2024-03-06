"use client";

// react/next.js
import {useCallback, useEffect, useState} from "react";

// hooks
import {useBroadcastEvent, useEventListener, useMyPresence, useOthers} from "@/liveblocks.config";
import useInterval from "@/hooks/useInterval";

// components
import LiveCursors from "@/components/cursor/LiveCursors"
import ChatCursor from "@/components/cursor/ChatCursor";

// types
import {CursorMode, CursorState, Reaction, ReactionEvent} from "@/types";
import ReactionSelector from "@/components/reaction/ReactionButton";
import FlyningReaction from "@/components/reaction/FlyningReaction";


const Live = () => {
  const others = useOthers();
  const [{ cursor }, updateMyPresence] = useMyPresence() as any;
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
    const { value, x, y } = eventData.event as ReactionEvent;

    setReactions((reactions) => reactions.concat([{
      point: { x, y },
      value,
      timestamp: Date.now(),
    }]));
  })

  return (
    <div
        className="h-[100vh] w-full flex justify-center items-center text-center"
        onPointerMove={handlePointerMove}
        onPointerDown={handlePointerDown}
        onPointerLeave={handlePointerLeave}
        onPointerUp={handlePointerUp}
    >
      <h1 className="font-5xl text-white">Inspiro</h1>
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
      <LiveCursors others={others} />
    </div>
  );
};

export default Live;