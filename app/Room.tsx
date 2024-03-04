"use client";

// configs
import { RoomProvider } from "@/liveblocks.config";

// libraries
import { ClientSideSuspense } from "@liveblocks/react";

// types
import { ReactNode } from "react";

export function Room({ children }: { children: ReactNode }) {
    return (
        <RoomProvider id="my-room" initialPresence={{}}>
            <ClientSideSuspense fallback={<div>Loading…</div>}>
                {() => children}
            </ClientSideSuspense>
        </RoomProvider>
    );
}
