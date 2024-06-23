'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { ReloadIcon } from '@radix-ui/react-icons'
import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast, { Toaster } from 'react-hot-toast'
import { z } from 'zod'

import { Navbar } from '@/components/blocks/navbar'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
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
  message: z.string().min(2, {
    message: 'Message must be at least 2 characters.'
  }),
  email: z.string().email()
})

type AccountFormValues = z.infer<typeof accountFormSchema>

function Page() {
  const defaultValues: Partial<AccountFormValues> = {
    name: '',
    message: '',
    email: ''
  }
  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues
  })

  const [isSubmitted, setIsSubmitted] = useState(false)

  async function onSubmit(data: AccountFormValues) {
    
    try {
      // setIsSubmitted(false)
      const res = await fetch('/api/contact-us', {
        method: 'POST',
        body: JSON.stringify(data)
      })
      const result = await res.json()

      if (result.success) {
        toast.success('Message sent successfully.', { position: 'top-right' })
      }
      if (result.error) {
        toast.error(`Failed to send message: ${result.error}. Please try again.`, { position: 'top-right' })
      }
    } catch (error) {
      console.log(error)
    }
    setIsSubmitted(true)
  }

  const formVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 }
  }

  const successVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 }
  }
  return (
    <div className="flex flex-col w-screen h-screen">
      <Toaster />
      <div className="flex flex-col p-8">
        <Navbar />
      </div>

      <div className="flex justify-center h-full items-center w-full px-6 lg:px-12 py-6 ">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={formVariants}
          transition={{ duration: 0.5 }}
          className="w-[50%] p-8 bg-white bg-opacity-10 backdrop-blur-lg rounded-lg shadow-lg border border-white border-opacity-20 "
        >
          {isSubmitted ? (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={successVariants}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <h2 className="text-2xl">Thank You!</h2>
              <p className="mt-4 font-light">Your message has been successfully sent. We will contact you soon.</p>
            </motion.div>
          ) : (
            <div className="flex flex-col justify-center items-center gap-16 h-full w-full">
              <div className="flex flex-col justify-center items-center gap-10">
                <div className="font-firacode font-thin text-5xl">{`Contact ${process.env.NEXT_PUBLIC_BRAND_NAME}`}</div>
                <div className="font-firacode font-thin tracking-widest">Let&#39;s connect </div>
              </div>
              <Form {...form}>
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
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your message" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button disabled={isSubmitted} type="submit" className="font-light">
                    {isSubmitted ? (
                      <>
                        <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                        Please wait
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </Button>
                </form>
              </Form>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default Page
