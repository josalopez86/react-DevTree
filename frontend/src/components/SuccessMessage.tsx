import type { JSX, ReactNode } from "react";

type SuccessMessageProps = {
  children: ReactNode;
};

export const SuccessMessage = ({children}: SuccessMessageProps): JSX.Element => {
  return (
    <p className="bg-green-50 text-green-600 p-3 uppercase text-sm text-center font-bold">
      {children}
    </p>
  )
}
