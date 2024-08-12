import { useContext, useLayoutEffect } from "react";
import { LayoutContext, LayoutOptions } from "./context";

export function useLayoutOptions(options: LayoutOptions) {
  const { setOptions } = useContext(LayoutContext);

  useLayoutEffect(() => {
    setOptions(options);
  }, [options, setOptions]);
}
