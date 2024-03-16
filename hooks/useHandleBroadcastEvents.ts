// libraries
import { useBroadcastEvent, useEventListener } from "@/liveblocks.config";

// hooks
import useInterval from "@/hooks/useInterval";

// types
import { CursorMode, CursorState, Reaction } from "@/types";

interface Props {
  setReactions: React.Dispatch<React.SetStateAction<Reaction[]>>;
  cursor: { x: number; y: number } | null;
  cursorState: CursorState;
}

const useHandleBroadcastEvents = ({
  setReactions,
  cursorState,
  cursor
}: Props) => {
  const broadcast = useBroadcastEvent();

  useInterval(() => {
    setReactions((reactions) => reactions.filter((reaction) => (
      reaction.timestamp > Date.now() - 4000)
    ))
  }, 1000)

  useInterval(() => {
    if (cursorState.mode === CursorMode.Reaction && cursorState.isPressed && cursor) {
      setReactions((reactions) => reactions.concat([{
        point: { x: cursor.x, y: cursor.y },
        value: cursorState.reaction,
        timestamp: Date.now(),
      }]));

      broadcast({
        x: cursor.x,
        y: cursor.y,
        value: cursorState.reaction,
      })
    }
  }, 100)

  useEventListener((eventData) => {
    const { value, x, y } = eventData.event;

    setReactions((reactions) => reactions.concat([{
      point: { x, y },
      value,
      timestamp: Date.now(),
    }]));
  })
};

export default useHandleBroadcastEvents;
