// constants
import { SHORTCUTS } from "@/constants";

// components
import { ContextMenuContent, ContextMenuItem } from "@/components/ui/context-menu";

type Props = {
  handleContextMenuClick: (action: string) => void;
}

const CustomContextMenu = ({ handleContextMenuClick }: Props) => (
      <ContextMenuContent className="right-menu-content">
        {SHORTCUTS.map((item) => (
          <ContextMenuItem
            className="right-menu-item"
            onClick={() => handleContextMenuClick(item.action)}
            key={item.key}
          >
            <p>{item.name}</p>
            <p className="text-sm text-primary-grey-300">
              {item.shortcut}
            </p>
          </ContextMenuItem>
        ))}
      </ContextMenuContent>
  );

export default CustomContextMenu;
