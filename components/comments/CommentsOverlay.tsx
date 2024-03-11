// libraries
import { useThreads } from "@/liveblocks.config";

// hooks
import useMaxZIndex from "@/hooks/useMaxZIndex";

// components
import OverlayThread from "@/components/comments/OverlayThread";

const CommentsOverlay = () => {
  const { threads } = useThreads();
  const maxZIndex = useMaxZIndex();

  const filteredThreads = threads.filter((thread) => !thread.metadata.resolved);

  return (
    <div>
      {filteredThreads.map((thread) => (
          <OverlayThread key={thread.id} thread={thread} maxZIndex={maxZIndex} />
        ))}
    </div>
  );
};

export default CommentsOverlay;
