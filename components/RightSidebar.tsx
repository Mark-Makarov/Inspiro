// libraries
import { fabric } from "fabric";

// utils
import { modifyShape } from "@/lib/shapes";

// components
import Dimensions from "@/components/Dimensions";
import Text from "@/components/Text";
import Color from "@/components/Color";
import Export from "@/components/Export";

// types
import { RightSidebarProps } from "@/types";

const RightSidebar = ({
elementAttributes,
setElementAttributes,
fabricRef,
isEditingRef,
activeObjectRef,
syncShapeInStorage,
}: RightSidebarProps) => {
  const handleInputChange = (property: string, value: string) => {
    if (!isEditingRef.current) {
      isEditingRef.current = true;
    }

    setElementAttributes((prev) => ({...prev, [property]: value}))

    modifyShape({
      canvas: fabricRef.current as fabric.Canvas,
      property,
      value,
      activeObjectRef,
      syncShapeInStorage,
    })
  };

  return (
      <section className="flex flex-col border-t border-primary-grey-200 bg-primary-black text-primary-grey-300
                    min-2-[227px] sticky left-0 h-full max-sm:hidden select-none overflow-y-auto pb-20">
        <h3 className="px-5 pt-4 text-sx uppercase">Дизайн</h3>
        <span className="text-xs text-primary-grey-300 mt-3 px-5 border-b border-primary-grey-200 pb-4">
          Внесите изменения по вашему желанию!
        </span>
        <Dimensions
          width={elementAttributes.width}
          height={elementAttributes.height}
          handleInputChange={handleInputChange}
          isEditingRef={isEditingRef}
        />
        <Text />
        <Color />
        <Color />
        <Export />
      </section>
  );
};

export default RightSidebar;
