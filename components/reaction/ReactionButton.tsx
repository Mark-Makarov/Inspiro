// constants
import { EMOJI_REACTIONS } from "@/constants"

// types
type ReactionSelectorProps = {
  setReactions: (reaction: string) => void;
};

const ReactionSelector = ({ setReactions }: ReactionSelectorProps) => (
      <div
          className="absolute bottom-20 left-0 right-0 mx-auto w-fit transform rounded-full bg-white px-2"
          onPointerMove={(e) => e.stopPropagation()}
      >
        {EMOJI_REACTIONS.map((reaction) => (
          <button
          key={reaction}
          className="transform select-none p-2 text-xl transition-transform hover:scale-150 focus:scale-150 focus:outline-none"
          onPointerDown={() => setReactions(reaction)}
          >
            {reaction}
          </button>
        ))}
      </div>
  );

export default ReactionSelector;
