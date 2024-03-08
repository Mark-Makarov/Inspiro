// libraries
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

const adjectives = [
  "Счастливый",
  "Творческий",
  "Энергичный",
  "Живой",
  "Динамичный",
  "Сияющий",
  "Радостный",
  "Пышный",
  "Веселый",
  "Солнечный",
  "Искрящийся",
  "Яркий",
  "Сияющий",
];

const animals = [
  "Дельфин",
  "Тигр",
  "Слон",
  "Пингвин",
  "Кенгуру",
  "Пантера",
  "Лев",
  "Гепард",
  "Жираф",
  "Гиппопотам",
  "Обезьяна",
  "Панда",
  "Крокодил",
];

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateRandomName(): string {
  const randomAdjective =
      adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomAnimal = animals[Math.floor(Math.random() * animals.length)];

  return `${randomAdjective} ${randomAnimal}`;
}

export const getShapeInfo = (shapeType: string) => {
  switch (shapeType) {
    case "rect":
      return {
        icon: "/assets/rectangle.svg",
        name: "Rectangle",
      };

    case "circle":
      return {
        icon: "/assets/circle.svg",
        name: "Circle",
      };

    case "triangle":
      return {
        icon: "/assets/triangle.svg",
        name: "Triangle",
      };

    case "line":
      return {
        icon: "/assets/line.svg",
        name: "Line",
      };

    case "i-text":
      return {
        icon: "/assets/text.svg",
        name: "Text",
      };

    case "image":
      return {
        icon: "/assets/image.svg",
        name: "Image",
      };

    case "freeform":
      return {
        icon: "/assets/freeform.svg",
        name: "Free Drawing",
      };

    default:
      return {
        icon: "/assets/rectangle.svg",
        name: shapeType,
      };
  }
};

