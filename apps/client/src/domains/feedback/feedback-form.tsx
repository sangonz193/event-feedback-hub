import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import {
  useZodForm,
  useZodFormContext,
} from "@/lib/react-hook-form/use-zod-form"
import { z } from "zod"
import { Rating, RatingInput, RATINGS } from "./rating-input"
import { Textarea } from "@/components/ui/textarea"

type Props = {
  children: React.ReactNode
  onSubmit: (data: z.infer<typeof formSchema>) => unknown | Promise<unknown>
  className?: string
}

const formSchema = z.object({
  stars: z.coerce
    .number({
      required_error: "Must select a rating.",
      invalid_type_error: "Must select a rating.",
    })
    .int()
    .min(1, {
      message: "Stars must be at least 1.",
    })
    .max(RATINGS[RATINGS.length - 1], {
      message: `Stars must be at most ${RATINGS[RATINGS.length - 1]}.`,
    }),
  content: z.string().min(2, {
    message: "Name must be at least 2 characters long.",
  }),
})

export function FeedbackForm({ children, onSubmit, className }: Props) {
  const form = useZodForm({
    schema: formSchema,
    defaultValues: { content: "", stars: undefined },
  })

  const handleSubmit = form.handleSubmit(
    async (v) => {
      await onSubmit(v)
    },
    (e) => console.error(e),
  )

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className={className}>
        {children}
      </form>
    </Form>
  )
}

export function FeedbackFormFields() {
  const form = useZodFormContext<typeof formSchema>()

  return (
    <>
      <FormField
        control={form.control}
        name="stars"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <RatingInput
                value={field.value as Extract<typeof field.value, Rating>}
                onChange={(value) => field.onChange(value)}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="content"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Textarea placeholder="Enter your feedback" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  )
}
