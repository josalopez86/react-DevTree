import type { ReactNode } from "react";

type ErrorMessageProps = {
  children: ReactNode;
};

export const ErrorMessage = ({children}: ErrorMessageProps) => {
  return (
    <p className="text-red-500 text-sm">
      {children}
    </p>
  )
}
