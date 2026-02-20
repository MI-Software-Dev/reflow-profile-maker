import { FC } from "react";

export const PageContent: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="bg-base-100 min-h-screen w-full px-4 pt-16 pb-4">
      {children}
    </div>
  );
};
