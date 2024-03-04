// constants
import { COLORS } from '@/constants';

// components
import Cursor from '@/components/cursor';

// types
import { LiveCursorProps } from "@/types";

const LiveCursors = ({ others }: LiveCursorProps) => {
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
            message={presence.message}
        />
    );
  });
};

export default LiveCursors;
