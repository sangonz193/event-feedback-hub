import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { StarIcon } from "lucide-react"
import { useState } from "react"

export const RATINGS = [1, 2, 3, 4, 5] as const
export type Rating = (typeof RATINGS)[number]

export function RatingInput({
  value,
  onChange,
}: {
  value?: Rating
  onChange?: (value: Rating) => void
}) {
  const [hoveredOrFocused, setHoveredOrFocused] = useState<Rating | null>(null)

  return (
    <div className="flex" onBlur={() => setHoveredOrFocused(null)}>
      {RATINGS.map((star) => {
        const isActive = star <= (value ?? 0)
        const isHovered = star <= (hoveredOrFocused ?? 0)

        return (
          <Button
            key={star}
            className="group flex items-center gap-2"
            variant="ghost"
            size="icon"
            onClick={() => onChange?.(star)}
            onMouseEnter={() => setHoveredOrFocused(star)}
            onMouseLeave={() => setHoveredOrFocused(null)}
            onFocus={() => setHoveredOrFocused(star)}
            onBlur={() => setHoveredOrFocused(null)}
          >
            <StarIcon
              className={cn(
                "size-4 stroke-orange-400 opacity-50",
                (isHovered || isActive) && "fill-yellow-400",
                isActive && "opacity-100",
              )}
            />
          </Button>
        )
      })}
    </div>
  )
}
