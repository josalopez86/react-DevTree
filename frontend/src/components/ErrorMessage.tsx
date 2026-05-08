import type { JSX, ReactNode } from "react";

type ErrorMessageProps = {
  children: ReactNode;
};

export const ErrorMessage = ({children}: ErrorMessageProps): JSX.Element => {
  return (
    <p className="bg-red-50 text-red-600 p-3 uppercase text-sm text-center font-bold">
      {children}
    </p>
  )
}
