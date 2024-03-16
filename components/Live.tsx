"use client";

// react/next.js
import { useState } from "react";

// libraries
import { useMyPresence } from "@/liveblocks.config";

// hooks
import useHandleKeyboardEvents from "@/hooks/useHandleKeyboardEvents";
import useHandleBroadcastEvents from "@/hooks/useHandleBroadcastEvents";
import useHandlePointerEvents from "@/hooks/useHandlePointerEvents";

// components
import LiveCursors from "@/components/cursor/LiveCursors";
import ChatCursor from "@/components/cursor/ChatCursor";
import ReactionSelector from "@/components/reaction/ReactionButton";
import { Comments } from "@/components/comments/Comments";
import { ContextMenu, ContextMenuTrigger } from "@/components/ui/context-menu";
import CustomContextMenu from "@/components/cursor/CustomContextMenu";
import FlyningReactions from "@/components/reaction/FlyningReactions";

// types
import { CursorMode, CursorState, Reaction } from "@/types";

type Props = {
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>;
}

const Live = ({ canvasRef }: Props) => {
  const [{ cursor }, updateMyPresence] = useMyPresence();
  const [cursorState, setCursorState] = useState<CursorState>({ mode: CursorMode.Hidden });
  const [reactions, setReactions] = useState<Reaction[]>([]);

  useHandleKeyboardEvents({ updateMyPresence, setCursorState });
  useHandleBroadcastEvents({cursor, cursorState, setReactions});

  const {
    handlePointerDown,
    handlePointerMove,
    handlePointerLeave,
    handlePointerUp,
    handleSelectReaction,
    handleContextMenuClick,
  } = useHandlePointerEvents({
    cursor,
    cursorState,
    setCursorState,
    updateMyPresence
  });

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
        <FlyningReactions reactions={reactions}/>
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
      <CustomContextMenu handleContextMenuClick={handleContextMenuClick}/>
    </ContextMenu>
  );
};

export default Live;
