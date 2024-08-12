import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { FilterIcon, ChevronDownIcon, StarIcon } from "lucide-react"
import { useState, useMemo } from "react"
import { Rating, RATINGS } from "./rating-input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

type Props = {
  value: Set<Rating>
  onValueChange: (value: Set<Rating>) => void
}

export function FeedbackFilter({ value, onValueChange }: Props) {
  const [open, setOpen] = useState(false)
  const selected = useMemo(
    () =>
      new Set(
        Object.entries(value)
          .filter((i) => i[1])
          .map((i) => +i[0]),
      ),
    [value],
  )
  const filtering = ![0, RATINGS.length].includes(selected.size)

  const buttonText = useMemo(() => {
    if (!filtering) return "All ratings"

    if (selected.size === 1) {
      const value = selected.values().next().value
      return `${value} star${value > 1 ? "s" : ""}`
    }

    const values = Array.from(selected).sort()
    const last = values.pop()!

    return `${values.join(", ")} and ${last} star${last > 1 ? "s" : ""}`
  }, [selected])

  return (
    <div className="flex flex-col">
      <Popover open={open} onOpenChange={setOpen}>
        <div className="flex">
          <PopoverTrigger asChild>
            <Button
              variant={filtering ? "default" : "outline"}
              className="gap-1.5 border"
            >
              <div className="relative flex">
                <FilterIcon className="size-4" />
                {filtering && (
                  <span className="absolute -right-0.5 -top-0.5 size-2 rounded-full bg-red-400" />
                )}
              </div>

              <div className="relative flex">
                <span className="opacity-0">1, 2, 3, 4 and 5 stars</span>
                <span className="absolute left-0">{buttonText}</span>
              </div>

              <ChevronDownIcon
                className={cn("size-4", !open && "rotate-180")}
              />
            </Button>
          </PopoverTrigger>
        </div>

        <PopoverContent className="max-w-56">
          <div className="flex flex-col gap-0">
            {RATINGS.map((rating) => {
              return (
                <Label key={rating} className="flex min-h-9 items-center">
                  <Checkbox
                    checked={value.has(rating)}
                    onCheckedChange={(checked) => {
                      const next = new Set(value)
                      if (checked) next.add(rating)
                      else next.delete(rating)

                      onValueChange(next)
                    }}
                  />

                  <div className="flex items-center gap-1 rounded-full px-2 font-mono">
                    <span>{rating}</span>
                    <StarIcon className="ml-0.5 size-4" stroke="orange" />
                  </div>
                </Label>
              )
            })}
          </div>

          <div className="mt-4 flex gap-2">
            <Button
              variant="link"
              size="sm"
              className="ml-auto"
              onClick={() => onValueChange(new Set())}
            >
              Clear
            </Button>

            <Button
              size="sm"
              variant="secondary"
              onClick={() => onValueChange(new Set(RATINGS))}
            >
              Select all
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
