import { zodResolver } from "@hookform/resolvers/zod"
import { UseFormProps, useForm, useFormContext } from "react-hook-form"
import { Except } from "type-fest"
import { z } from "zod"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useZodForm<TSchema extends z.ZodType<any, any>>({
  schema,
  ...params
}: Except<UseFormProps<z.input<TSchema>, unknown>, "resolver"> & {
  schema: TSchema
}) {
  return useForm<z.input<TSchema>, unknown, z.infer<TSchema>>({
    resolver: zodResolver(schema),
    ...params,
  })
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useZodFormContext<TSchema extends z.ZodType<any, any>>() {
  return useFormContext<z.input<TSchema>, unknown, z.infer<TSchema>>()
}
