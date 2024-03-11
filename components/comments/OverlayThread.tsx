// react/next.js
import { useCallback, useRef } from "react";

// libraries
import { ThreadData } from "@liveblocks/client";
import { ThreadMetadata, useEditThreadMetadata } from "@/liveblocks.config";

// components
import { PinnedThread } from "@/components/comments/PinnedThread";

type Props = {
  thread: ThreadData<ThreadMetadata>;
  maxZIndex: number;
};

const OverlayThread = ({ thread, maxZIndex }: Props) => {
  const editThreadMetadata = useEditThreadMetadata();
  const threadRef = useRef<HTMLDivElement>(null);

  const handleIncreaseZIndex = useCallback(() => {
    if (maxZIndex === thread.metadata.zIndex) {
      return;
    }
    editThreadMetadata({
      threadId: thread.id,
      metadata: {
        zIndex: maxZIndex + 1,
      },
    });
  }, [thread, editThreadMetadata, maxZIndex]);

  return (
    <div
      ref={threadRef}
      id={`thread-${thread.id}`}
      className="absolute left-0 top-0 flex gap-5"
      style={{
        transform: `translate(${thread.metadata.x}px, ${thread.metadata.y}px)`,
      }}
    >
      <PinnedThread thread={thread} onFocus={handleIncreaseZIndex} />
    </div>
  );
};

export default OverlayThread;
