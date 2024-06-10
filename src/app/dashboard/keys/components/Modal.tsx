import { ReloadIcon } from '@radix-ui/react-icons'
import React from 'react'
import toast, { Toaster } from 'react-hot-toast'

import { useGlobalStore } from '@/_store/globalStore'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function Modal() {
  const [status, error, createNewApiKey] = useGlobalStore((state) => [
    state.apiState.status,
    state.apiState.error,
    state.apiActions.createNewApiKey
  ])
  const [name, setName] = React.useState('')


  async function submitHandler() {
    if (!name) return
    setName('')
    await createNewApiKey(name)
  }

  return (
    <AlertDialog>
      <Toaster />
      <AlertDialogTrigger asChild>
        <Button className="font-normal">CREATE API KEY</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="font-[Haffer] font-light text-2xl">Create Key</AlertDialogTitle>
          <AlertDialogDescription className="text-xs font-light">
            {'Give you new API key a name.'}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="grid gap-4 py-4">
          <div className="">
            <Input value={name} onChange={(evt) => setName(evt.target.value)} id="name" className="col-span-3" />
          </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogAction className="font-light w-[94px]" disabled={status === 'PENDING'} onClick={submitHandler}>
            {status === 'PENDING' ? (
              <>
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              </>
            ) : (
              'SAVE KEY'
            )}
          </AlertDialogAction>
          <AlertDialogCancel className="font-light" disabled={status === 'PENDING'}>
            CANCEL
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
