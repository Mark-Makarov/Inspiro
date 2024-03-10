// constants
import {
  FONT_FAMILY_OPTIONS,
  FONT_SIZE_OPTIONS,
  FONT_WEIGHT_OPTIONS,
} from "@/constants";

// components
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const selectConfigs = [
  {
    property: "fontFamily",
    placeholder: "Выберите шрифт",
    options: FONT_FAMILY_OPTIONS,
  },
  {
    property: "fontSize",
    placeholder: "30",
    options: FONT_SIZE_OPTIONS
  },
  {
    property: "fontWeight",
    placeholder: "Semibold",
    options: FONT_WEIGHT_OPTIONS,
  },
];

type TextProps = {
  fontFamily: string;
  fontSize: string;
  fontWeight: string;
  handleInputChange: (property: string, value: string) => void;
};

const Text = ({
  fontFamily,
  fontSize,
  fontWeight,
  handleInputChange,
}: TextProps) => (
  <div className="flex flex-col gap-3 border-b border-primary-grey-200 px-5 py-3">
    <h3 className="text-[10px] uppercase">Шрифт</h3>

    <div className="flex flex-col gap-3">
      {RenderSelect({
        config: selectConfigs[0],
        fontSize,
        fontWeight,
        fontFamily,
        handleInputChange,
      })}

      <div className="flex gap-2">
        {selectConfigs.slice(1).map((config) =>
          RenderSelect({
            config,
            fontSize,
            fontWeight,
            fontFamily,
            handleInputChange,
          })
        )}
      </div>
    </div>
  </div>
);

type Props = {
  config: {
    property: string;
    placeholder: string;
    options: { label: string; value: string }[];
  };
  fontSize: string;
  fontWeight: string;
  fontFamily: string;
  handleInputChange: (property: string, value: string) => void;
};

const RenderSelect = ({
  config,
  fontSize,
  fontWeight,
  fontFamily,
  handleInputChange,
}: Props) => (
  <Select
    key={config.property}
    onValueChange={(value) => handleInputChange(config.property, value)}
    value={
      config.property === "fontFamily"
        ? fontFamily
        : config.property === "fontSize"
          ? fontSize
          : fontWeight
    }
  >
    <SelectTrigger className="no-ring w-full rounded-sm border border-primary-grey-200">
      <SelectValue
        placeholder={
          config.property === "fontFamily"
            ? "Выберите шрифт"
            : config.property === "fontSize"
              ? "30"
              : "Semibold"
        }
      />
    </SelectTrigger>
    <SelectContent className="border-primary-grey-200 bg-primary-black text-primary-grey-300">
      {config.options.map((option) => (
        <SelectItem
          key={option.value}
          value={option.value}
          className="hover:bg-primary-green hover:text-primary-black"
        >
          {option.label}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);

export default Text;