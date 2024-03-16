"use client";

// configs
import { RoomProvider } from "@/liveblocks.config";

// libraries
import { ClientSideSuspense } from "@liveblocks/react";
import { LiveMap } from "@liveblocks/client";

// components
import Loader from "@/components/Loader";

export function Room({ children }: { children: React.ReactNode }) {
  const initialPresence = {
    cursor: null,
    cursorColor: null,
    editingText: null,
    message: null,
  };
  const initialStorage = { canvasObjects: new LiveMap()};

    return (
        <RoomProvider
          id="my-room"
          initialPresence={initialPresence}
          initialStorage={initialStorage}
        >
            <ClientSideSuspense fallback={<Loader/>}>
                {() => children}
            </ClientSideSuspense>
        </RoomProvider>
    );
}
