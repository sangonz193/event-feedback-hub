import { createContext, PropsWithChildren, useMemo, useState } from "react";

export type LayoutOptions = {
  secondBreadcrumbPageName?: string | undefined;
  headerRight?: React.ReactNode | undefined;
};

export type LayoutContextType = {
  options?: LayoutOptions;
  setOptions: (options: LayoutContextType["options"]) => void;
};

export const LayoutContext = createContext<LayoutContextType>(null as never);

export function LayoutProvider({ children }: PropsWithChildren) {
  const [options, setOptions] = useState<LayoutContextType["options"]>();

  const contextValue = useMemo(
    () =>
      ({
        options,
        setOptions,
      }) satisfies LayoutContextType,
    [options]
  );

  return (
    <LayoutContext.Provider value={contextValue}>
      {children}
    </LayoutContext.Provider>
  );
}
