import { SidebarItem } from "./SidebarItem";
import { BrainIcon } from "./ui/icons/BrainIcon";
import { TwitterIcon } from "./ui/icons/TwitterIcon";
import { YoutubeIcon } from "./ui/icons/YoutubeIcon";

export const Sidebar = () => {
  return (
    <div className="h-full bg-white border-r-2 w-60 fixed top-0 left-0 border-gray-200 ">
      <div className="flex justify-start items-center gap-3 p-2 mt-2 ml-2">
        <BrainIcon />
        <div className="text-xl text-gray-700">Second Brain</div>
      </div>
      <div className="pl-3 pt-10 text-gray-700">
        <SidebarItem text="Youtube" icon={<YoutubeIcon />} />
        <SidebarItem text="Twitter" icon={<TwitterIcon />} />
      </div>
    </div>
  );
};
