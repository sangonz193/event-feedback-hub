import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { ReactNode } from "react";

export function EmptyState({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "bg-foreground/5 border flex flex-col items-center rounded-md p-6 gap-2",
        className
      )}
    >
      {children}
    </div>
  );
}

export function EmptyStateIcon({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <Slot
      className={cn(
        "size-16 mx-auto text-muted-foreground opacity-30",
        className
      )}
    >
      {children}
    </Slot>
  );
}

export function EmptyStateTitle({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "text-center text-balance text-muted-foreground whitespace-pre-wrap px-4 mt-2",
        className
      )}
    >
      {children}
    </span>
  );
}
