// utils
import { exportToPdf } from "@/lib/utils";

// components
import { Button } from "@/components/ui/button";

const Export = () => (
  <div className="flex flex-col gap-3 px-5 py-3">
    <h3 className="text-[10px] uppercase">Экспортировать</h3>
    <Button
      variant="outline"
      className="w-full border border-primary-grey-100 hover:bg-primary-green hover:text-primary-black"
      onClick={exportToPdf}
    >
      PDF
    </Button>
  </div>
);

export default Export;
