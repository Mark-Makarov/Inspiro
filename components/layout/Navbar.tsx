// react/next.js
import Image from "next/image";
import { memo } from "react";

// constants
import { NAV_ELEMENTS } from "@/constants";

// components
import ActiveUsers from "@/components/users/ActiveUsers";
import { Button } from "@/components/ui/button";
import ShapesMenu from "@/components/ShapesMenu";
import { NewThread } from "@/components/comments/NewThread";

// types
import { ActiveElement, NavbarProps } from "@/types";


const Navbar = ({ activeElement, imageInputRef, handleImageUpload, handleActiveElement }: NavbarProps) => {
  const isActive = (value: string | Array<ActiveElement>) =>
      (activeElement && activeElement.value === value) ||
      (Array.isArray(value) && value.some((val) => val?.value === activeElement?.value));

  const navbarClickHandler = (item: ActiveElement) => {
    if (Array.isArray(item?.value)) return;
    handleActiveElement(item);
  };

  return (
      <nav className="flex select-none items-center justify-between gap-4 bg-primary-black px-5 text-white">
        <p className="font-bold text-2xl">Inspiro</p>

        <ul className="flex flex-row">
          {NAV_ELEMENTS.map((item: ActiveElement | any) => (
              <li
                  key={item.name}
                  onClick={() => navbarClickHandler(item)}
                  className={`group px-2.5 py-5 flex justify-center items-center
            ${isActive(item.value) ? "bg-primary-green" : "hover:bg-primary-grey-200"}`}
              >
                {Array.isArray(item.value) ? (
                    <ShapesMenu
                        item={item}
                        activeElement={activeElement}
                        imageInputRef={imageInputRef}
                        handleActiveElement={handleActiveElement}
                        handleImageUpload={handleImageUpload}
                    />
                ) : item?.value === "comments" ? (
                    <NewThread>
                      <Button className="relative w-5 h-5 object-contain">
                        <Image
                            src={item.icon}
                            alt={item.name}
                            fill
                            className={isActive(item.value) ? "invert" : ""}
                        />
                      </Button>
                    </NewThread>
                ) : (
                    <Button className="relative w-5 h-5 object-contain">
                      <Image
                          src={item.icon}
                          alt={item.name}
                          fill
                          className={isActive(item.value) ? "invert" : ""}
                      />
                    </Button>
                )}
              </li>
          ))}
        </ul>
        <ActiveUsers />
      </nav>
  );
};

export default memo(Navbar, (prevProps, nextProps) => prevProps.activeElement === nextProps.activeElement);
