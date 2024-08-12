import { ComponentType, PropsWithChildren } from "react";

export const withWrappers =
  <T extends object>(
    wrappers: ComponentType<Required<PropsWithChildren> & T>[],
    Component: ComponentType<T>
  ) =>
  (props: T) =>
    wrappers.reduceRight(
      (previousValue, CurrentValue) => (
        <CurrentValue {...props}>{previousValue}</CurrentValue>
      ),
      <Component {...props} />
    );
