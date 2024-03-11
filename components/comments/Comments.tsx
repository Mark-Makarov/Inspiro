// libraries
import { ClientSideSuspense } from "@liveblocks/react";

// components
import CommentsOverlay from "@/components/comments/CommentsOverlay";

export const Comments = () => (
  <ClientSideSuspense fallback={null}>
    {() => <CommentsOverlay />}
  </ClientSideSuspense>
);
