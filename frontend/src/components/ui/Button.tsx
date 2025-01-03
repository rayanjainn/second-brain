import React, { ReactElement } from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "primary" | "secondary";
  size: "sm" | "md" | "lg";
  text: string;
  icon?: ReactElement;
  fullWidth?: boolean;
  loading?: boolean;
  onClick: () => void;
}

const buttonVariants = {
  primary: "bg-purple-700 hover:bg-purple-500 text-white",
  secondary: "bg-purple-300 hover:bg-purple-400 text-purple-500",
};

const buttonSizes = {
  sm: "px-3 py-2 text-sm",
  md: "px-4 py-3 text-base",
  lg: "px-5 py-4 text-lg",
};

export const Button = (props: ButtonProps) => {
  const { variant, size, text, icon, onClick, fullWidth } = props;
  const style = `flex items-center justify-center rounded-md shadow-sm transition-all duration-200 ${
    buttonVariants[variant]
  } ${buttonSizes[size]} ${fullWidth ? "w-full" : ""}`;
  return (
    <button className={style} onClick={onClick}>
      {icon ? <div className="pr-2">{icon}</div> : null}
      <div className="flex items-center justify-center font-sans ">{text}</div>
    </button>
  );
};
