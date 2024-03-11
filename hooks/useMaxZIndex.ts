// react/next.js
import { useMemo } from "react";

// hooks
import { useThreads } from "@/liveblocks.config";

const useMaxZIndex = () => {
  const { threads } = useThreads();

  return useMemo(() => {
    let max = 0;
    for (const thread of threads) {
      // @ts-ignore
      if (thread.metadata.zIndex > max) {
        // @ts-ignore
        max = thread.metadata.zIndex;
      }
    }
    return max;
  }, [threads]);
};

export default useMaxZIndex;
