import { ReactElement } from "react";

export const SidebarItem = ({
  text,
  icon,
}: {
  text: string;
  icon: ReactElement;
}) => {
  return (
    <div className="flex gap-4 items-center pl-6 py-2 border-gray-200 hover:bg-gray-100 transition-all duration-200">
      <div className="max-w-5 min-w-5">{icon}</div>
      <div className="text-sm">{text}</div>
    </div>
  );
};
