import { Download, Info, Menu } from "lucide-react";

export const Sidebar = () => {
  return (
    <div className="bg-white flex flex-col justify-end ">
      <div className="bg-black  h-[95%] w-20 rounded-tr-[30px] text-white p-5 flex flex-col items-center justify-between ">
        <div>
          <Menu className="cursor-pointer" />
        </div>
        <div className="flex flex-col gap-5">
          <Download className="cursor-pointer" />
          <Info className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
};
