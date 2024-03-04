"use client";

// react/next.js
import { useCallback } from "react";

// hooks
import { useMyPresence, useOthers } from "@/liveblocks.config";

// components
import LiveCursors from "@/components/cursor/LiveCursors"

const Live = () => {
  const others = useOthers();
  const [{ cursor }, updateMyPresence] = useMyPresence() as any;
  console.log(cursor)

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    e.preventDefault();

    const x = e.clientX - e.currentTarget.getBoundingClientRect().x;
    const y = e.clientY - e.currentTarget.getBoundingClientRect().y;

    updateMyPresence({ cursor: { x, y } });
  }, [])

  const handlePointerLeave = useCallback((e: React.PointerEvent) => {
    e.preventDefault();

    updateMyPresence({ cursor: null, message: null });
  }, [])

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    e.preventDefault();

    const x = e.clientX - e.currentTarget.getBoundingClientRect().x;
    const y = e.clientY - e.currentTarget.getBoundingClientRect().y;

    updateMyPresence({ cursor: { x, y } });
  }, [])

  return (
    <div
        className="h-[100vh] w-full flex justify-center items-center text-center"
        onPointerMove={handlePointerMove}
        onPointerDown={handlePointerDown}
        onPointerLeave={handlePointerLeave}
    >
      <h1 className="font-5xl text-white">Inspiro</h1>
      <LiveCursors others={others} />
    </div>
  );
};

export default Live;
