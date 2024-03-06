// types
import { ChatCursorProps, CursorMode} from "@/types";
import CursorSVG from "@/components/cursor/CursorSVG";

const ChatCursor = ({
cursor,
cursorState,
setCursorState,
updateMyPresence,
}: ChatCursorProps) => {
  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateMyPresence({ message: e.target.value });
    setCursorState({
      mode: CursorMode.Chat,
      previousMessage: null,
      message: e.target.value,
    });
  };

  const keyDownHandler= (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setCursorState({
        mode: CursorMode.Chat,
        previousMessage: cursorState.message,
        message: "",
      });
    } else if (e.key === "Escape") {
      setCursorState({ mode: CursorMode.Hidden });
    }
  };

  // TODO
  return (
      <div
          className="absolute top-0 left-0"
          style={{ transform: `translateX(${cursor.x}px) translateY(${cursor.y}px)` }}
      >
        {cursorState.mode === CursorMode.Chat && (
         <>
           <CursorSVG color="#000" />
           <div className="absolute left-2 top-5 bg-blue-500 px-4 py-4 text-sm leading-relaxed text-white rounded-[20px]">
             {cursorState.previousMessage && (
                 <div>{cursorState.previousMessage}</div>
             )}
             <input
                 className="z-10 w-60 border-none bg-transparent text-white placeholder-blue-300 outline-none"
                 autoFocus
                 onChange={inputHandler}
                 onKeyDown={keyDownHandler}
                 placeholder={cursorState.previousMessage ? "" : "Введите сообщение..."}
                 value={cursorState.message}
                 maxLength={50}
             />
           </div>
         </>
        )}
      </div>
  );
};

export default ChatCursor;
