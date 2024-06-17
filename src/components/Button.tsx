import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  handleClick?: VoidFunction;
}

export const Button = ({ children, handleClick }: Props) => {
  return (
    <button
      onClick={handleClick}
      className="bg-blue-500 text-white rounded-[6px] px-[8px] py-[4px]"
    >
      {children}
    </button>
  );
};
