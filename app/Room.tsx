"use client";

// configs
import { RoomProvider } from "@/liveblocks.config";

// libraries
import { ClientSideSuspense } from "@liveblocks/react";
import { LiveMap } from "@liveblocks/client";

// components
import Loader from "@/components/Loader";

// types
import { ReactNode } from "react";

export function Room({ children }: { children: ReactNode }) {
  const initialPresence = {
    cursor: null,
    cursorColor: null,
    editingText: null,
  };

    return (
        <RoomProvider
          id="my-room"
          initialPresence={initialPresence}
          initialStorage={{ canvasObjects: new LiveMap()}}
        >
            <ClientSideSuspense fallback={<Loader/>}>
                {() => children}
            </ClientSideSuspense>
        </RoomProvider>
    );
}
