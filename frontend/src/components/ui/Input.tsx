import { RefObject } from "react";

export interface InputProps {
  type: string;
  placeholder: string;
  reference?: RefObject<HTMLInputElement>;
}

export const Input = (props: InputProps) => {
  return (
    <div>
      <input
        type={props.type}
        placeholder={props.placeholder}
        ref={props.reference}
        className="w-full rounded-md border-2 border-gray-200 px-4 py-2 text-gray-600"
      />
    </div>
  );
};
