import { ChevronRight, SquareUserRound } from 'lucide-react'
import React from 'react'

import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

import MyDropzone from './components/MyDropzone'

function Page() {
  return (
    <div className="flex items-center justify-center h-full gap-28">
      <div className=" flex flex-col  w-[60%] gap-12 p-12">
        <div className="flex text-2xl gap-3 ">
          <SquareUserRound size={30} />
          <h2 className="">Avatar</h2>
        </div>

        <Textarea
          placeholder="Describe how you'd like your avatar to look..."
          className="resize-none w-full text-sm h-[120px] "
        />

        <Button className="flex items-center justify-center">
          Generate Avatar
          <ChevronRight size={20} />
        </Button>
      </div>
      {/* <div className="border">Preview</div> */}
      <div className="w-full h-full flex flex-col justify-center rounded-lg">
        <MyDropzone />
      </div>
    </div>
  )
}

export default Page
