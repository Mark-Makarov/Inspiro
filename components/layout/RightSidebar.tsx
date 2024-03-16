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
import { useRef } from "react";

const RightSidebar = ({
elementAttributes,
setElementAttributes,
fabricRef,
isEditingRef,
activeObjectRef,
syncShapeInStorage,
}: RightSidebarProps) => {
  const colorInputRef = useRef(null);
  const strokeInputRef = useRef(null);

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

  const {
    stroke,
    height,
    fill,
    fontSize,
    fontFamily,
    width,
    fontWeight,
  } = elementAttributes;

  return (
      <section className="flex flex-col border-t border-primary-grey-200 bg-primary-black text-primary-grey-300
                          min-2-[227px] sticky left-0 h-full max-sm:hidden select-none overflow-y-auto pb-20">
        <h3 className="px-5 pt-4 text-sx uppercase">Дизайн</h3>
        <Dimensions
          width={width}
          height={height}
          handleInputChange={handleInputChange}
          isEditingRef={isEditingRef}
        />
        <Text
          fontFamily={fontFamily}
          fontSize={fontSize}
          fontWeight={fontWeight}
          handleInputChange={handleInputChange}
        />
        <Color
          inputRef={colorInputRef}
          attribute={fill}
          attributeType="fill"
          placeholder="Цвет"
          handleInputChange={handleInputChange}
        />
        <Color
          inputRef={strokeInputRef}
          attribute={stroke}
          attributeType="stroke"
          placeholder="Обводка"
          handleInputChange={handleInputChange}
        />
        <Export />
      </section>
  );
};

export default RightSidebar;
