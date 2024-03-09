// libraries
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import jsPDF from "jspdf";

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
        name: "Квадрат",
      };

    case "circle":
      return {
        icon: "/assets/circle.svg",
        name: "Круг",
      };

    case "triangle":
      return {
        icon: "/assets/triangle.svg",
        name: "Треугольник",
      };

    case "line":
      return {
        icon: "/assets/line.svg",
        name: "Линия",
      };

    case "i-text":
      return {
        icon: "/assets/text.svg",
        name: "Текст",
      };

    case "image":
      return {
        icon: "/assets/image.svg",
        name: "Изображение",
      };

    case "freeform":
      return {
        icon: "/assets/freeform.svg",
        name: "Рисовать",
      };

    default:
      return {
        icon: "/assets/rectangle.svg",
        name: shapeType,
      };
  }
};

export const exportToPdf = () => {
  const canvas = document.querySelector("canvas");

  if (!canvas) return;

  const doc = new jsPDF({
    orientation: "landscape",
    unit: "px",
    format: [canvas.width, canvas.height],
  });

  const data = canvas.toDataURL();
  doc.addImage(data, "PNG", 0, 0, canvas.width, canvas.height);

  doc.save("inspiro.pdf");
};
