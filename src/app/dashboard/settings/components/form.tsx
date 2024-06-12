'use client'

import { zodResolver } from '@hookform/resolvers/zod'

import { ReloadIcon } from '@radix-ui/react-icons'

import { useSession } from 'next-auth/react'
import React from 'react'
import { useForm } from 'react-hook-form'
import toast, { Toaster } from 'react-hot-toast'
import { z } from 'zod'

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'

import { Input } from '@/components/ui/input'

const accountFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'Name must be at least 2 characters.'
    })
    .max(30, {
      message: 'Name must not be longer than 30 characters.'
    }),
  username: z
    .string()
    .min(2, {
      message: 'Username must be at least 2 characters.'
    })
    .max(30, {
      message: 'Name must not be longer than 30 characters.'
    }),
  email: z.string().email().optional()
})

type AccountFormValues = z.infer<typeof accountFormSchema>

export function AccountForm() {
  const { data: session } = useSession()

  const defaultValues: Partial<AccountFormValues> = {
    name: session?.user.name,
    username: session?.user.username,
    // dob: new Date('2023-01-23'),
    email: session?.user.email
  }

  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues
  })

  React.useEffect(() => {
    if (session) {
      form.reset({
        name: session.user.name,
        username: session.user.username,
        email: session.user.email
      })
    }
  }, [session, form])

  const [loading, setLoading] = React.useState(false)

  async function onSubmit(data: AccountFormValues) {
    console.log(data)

    try {
      setLoading(true)
      const res = await fetch('/api/user', {
        method: 'PUT',
        body: JSON.stringify(data)
      })

      const result = await res.json()
      if (result.success) {
        toast.success('Account update successfully.')
      }
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }

  return (
    <Form {...form}>
      <Toaster position="top-right" />
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-1/2">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Your name" {...field} />
              </FormControl>
              <FormDescription>This is the name that will be displayed on your dashboard.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="username" {...field} />
              </FormControl>
              <FormDescription>This is the name that will be displayed on your profile.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          disabled
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email" {...field} />
              </FormControl>
              <FormDescription>This is the email that will be displayed on your profile.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={loading} type="submit" className="font-light">
          {loading ? (
            <>
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </>
          ) : (
            'Update account'
          )}
        </Button>
      </form>
    </Form>
  )
}
