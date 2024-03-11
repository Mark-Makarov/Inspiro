// libraries
import { GridLoader } from "react-spinners"

const Loader = () => (
  <div className='flex h-screen w-screen flex-col items-center justify-center gap-2'>
    <GridLoader
      size={25}
      color="#c45a3f"
    />
    <p className="text-sm font-bold text-primary-grey-300">Загрузка...</p>
  </div>
);

export default Loader;
