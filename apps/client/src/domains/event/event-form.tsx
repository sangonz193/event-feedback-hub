import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  useZodForm,
  useZodFormContext,
} from "@/lib/react-hook-form/use-zod-form"
import { z } from "zod"

type Props = {
  children: React.ReactNode
  onSubmit: (data: z.infer<typeof formSchema>) => unknown | Promise<unknown>
}

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters long.",
  }),
})

export function EventForm({ children, onSubmit }: Props) {
  const form = useZodForm({ schema: formSchema, defaultValues: { name: "" } })

  const handleSubmit = form.handleSubmit(
    async (v) => {
      await onSubmit({
        name: v.name,
      })
    },
    (e) => console.error(e),
  )

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit}>{children}</form>
    </Form>
  )
}

export function EventFormFields() {
  const form = useZodFormContext<typeof formSchema>()

  return (
    <FormField
      control={form.control}
      name="name"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Name</FormLabel>
          <FormControl>
            <Input placeholder="JS Meetup" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
