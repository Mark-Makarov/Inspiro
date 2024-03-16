// components
import EmodjiReaction from "@/components/reaction/Reaction";

// types
import { Reaction } from "@/types";

type Props = {
  reactions: Reaction[];
};

const FlyningReactions = ({ reactions }: Props) => (
  <>
    {reactions.map(({ value, timestamp, point }) => (
        <EmodjiReaction
          key={timestamp.toString()}
          x={point.x}
          y={point.y}
          timestamp={timestamp}
          value={value}
        />
      ))}
  </>
  );

export default FlyningReactions;
