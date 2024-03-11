export const COLORS = [
  "#DC2626",
  "#D97706",
  "#059669",
  "#7C3AED",
  "#DB2777"
];

export const SHAPE_ELEMENTS = [
  {
    icon: "/assets/rectangle.svg",
    name: "Rectangle",
    value: "rectangle",
  },
  {
    icon: "/assets/circle.svg",
    name: "Circle",
    value: "circle",
  },
  {
    icon: "/assets/triangle.svg",
    name: "Triangle",
    value: "triangle",
  },
  {
    icon: "/assets/line.svg",
    name: "Line",
    value: "line",
  },
  {
    icon: "/assets/image.svg",
    name: "Image",
    value: "image",
  },
  {
    icon: "/assets/freeform.svg",
    name: "Free Drawing",
    value: "freeform",
  },
];

export const NAV_ELEMENTS = [
  {
    icon: "/assets/select.svg",
    name: "Select",
    value: "select",
  },
  {
    icon: "/assets/rectangle.svg",
    name: "Rectangle",
    value: SHAPE_ELEMENTS,
  },
  {
    icon: "/assets/text.svg",
    value: "text",
    name: "Text",
  },
  {
    icon: "/assets/delete.svg",
    value: "delete",
    name: "Delete",
  },
  {
    icon: "/assets/reset.svg",
    value: "reset",
    name: "Reset",
  },
  {
    icon: "/assets/comments.svg",
    value: "comments",
    name: "Comments",
  },
];

export const DEFAULT_NAV_ELEMENT = {
  icon: "/assets/select.svg",
  name: "Select",
  value: "select",
};

export const FONT_FAMILY_OPTIONS = [
  { value: "Helvetica", label: "Helvetica" },
  { value: "Times New Roman", label: "Times New Roman" },
  { value: "Comic Sans MS", label: "Comic Sans MS" },
  { value: "Brush Script MT", label: "Brush Script MT" },
];

export const FONT_SIZE_OPTIONS = [
  {
    value: "10",
    label: "10",
  },
  {
    value: "12",
    label: "12",
  },
  {
    value: "14",
    label: "14",
  },
  {
    value: "16",
    label: "16",
  },
  {
    value: "18",
    label: "18",
  },
  {
    value: "20",
    label: "20",
  },
  {
    value: "22",
    label: "22",
  },
  {
    value: "24",
    label: "24",
  },
  {
    value: "26",
    label: "26",
  },
  {
    value: "28",
    label: "28",
  },
  {
    value: "30",
    label: "30",
  },
  {
    value: "32",
    label: "32",
  },
  {
    value: "34",
    label: "34",
  },
  {
    value: "36",
    label: "36",
  },
];

export const FONT_WEIGHT_OPTIONS = [
  {
    value: "400",
    label: "Normal",
  },
  {
    value: "500",
    label: "Semibold",
  },
  {
    value: "600",
    label: "Bold",
  },
];

export const SHORTCUTS = [
  {
    key: "1",
    name: "Чат",
    action: "Chat",
    shortcut: "/",
  },
  {
    key: "2",
    name: "Отменить",
    action: "Undo",
    shortcut: "⌘ Mac / ⊞ Win + Z",
  },
  {
    key: "3",
    name: "Вернуть",
    action: "Redo",
    shortcut: "⌘ Mac / ⊞ Win + Y",
  },
  {
    key: "4",
    name: "Реакции",
    action: "Reactions",
    shortcut: "E",
  },
];

export const EMOJI_REACTIONS = [
  "👍",
  "🔥",
  "🤪",
  "😍",
  "👀",
  "😱",
  "🙁",
  "💩",
  "🌚",
];
