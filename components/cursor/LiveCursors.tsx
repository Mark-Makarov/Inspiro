// constants
import { COLORS } from '@/constants';

// libraries
import { useOthers } from "@/liveblocks.config";

// components
import Cursor from '@/components/cursor';

const LiveCursors = () => {
  const others = useOthers();

  return others.map(({ connectionId, presence }) => {
    if (presence == null || !presence?.cursor) {
      return null;
    }

    return (
        <Cursor
            key={connectionId}
            color={COLORS[Number(connectionId) % COLORS.length]}
            x={presence.cursor.x}
            y={presence.cursor.y}
            message={presence.message || ""}
        />
    );
  });
};

export default LiveCursors;
