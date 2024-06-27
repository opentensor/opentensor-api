'use client'
import { CloudUpload, Send } from 'lucide-react'
import React from 'react'
import toast, { Toaster } from 'react-hot-toast'

import { useGlobalStore } from '@/_store/globalStore'
import Loader from '@/components/blocks/loader'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

import ImageCard from '../vision-avatar/components/ImageCard'

function Page() {
  const engine = ['proteus', 'dreamshaper', 'playground', 'stable-diffusion-xl-turbo']
  const [prompt, setPrompt] = React.useState<string>('')
  const [loading, setLoading] = React.useState(false)
  const [imgUrl, setImgUrl] = React.useState<string>('')
  const selectedKey = useGlobalStore((state) => state.apiState.selectedKey)

  const [guidanceScale, setGuidanceScale] = React.useState([2])
  const [steps, setSteps] = React.useState([9])
  const [engineValue, setEngineValue] = React.useState<string>('proteus')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!selectedKey) {
      toast.error('Please select a valid api key', { position: 'top-right' })
      return
    }
    let reqData = JSON.stringify({
      text_prompts: [
        {
          text: prompt
        }
      ],
      engine: engineValue,
      steps: steps.toString(),
      cfg_scale: guidanceScale.toString()
    })

    try {
      setPrompt('')
      setLoading(true)
      const res = await fetch('/api/vision-text-to-image', {
        method: 'POST',
        headers: { accept: 'application/json', 'Content-Type': 'application/json', 'X-API-KEY': selectedKey },
        body: reqData
      })
      const response = await res.json()
      if (response.success) {
        setImgUrl(response.result.image_b64)
      }
      if (response.error) {
        toast.error('Failed to retrieve image. Please try again.', { position: 'top-right' })
      }
    } catch (error) {
      setPrompt('')
      console.log(error)
    }
    setLoading(false)
  }

  async function handleUpload() {
    const reqBody = JSON.stringify({
      imgStr: imgUrl,
      appTag: 'Generate'
    })
    try {
      setLoading(true)
      const res = await fetch('/api/image-studio', {
        method: 'POST',
        body: reqBody
      })

      const response = await res.json()

      if (response.success) {
        toast.success('Image saved successfully.', { position: 'top-right' })
        setImgUrl('')
      }
      if (response.error) {
        toast.error('Failed to generate image. Please try again.', { position: 'top-right' })
      }
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }

  return (
    <div className="flex h-full px-8 gap-3 py-4">
      <Toaster />

      <div className="w-full h-full flex flex-col justify-center gap-10">
        <form onSubmit={handleSubmit} className="flex items-center bg-white border px-4 dark:invert">
          <Input
            className="h-12 shadow-none border-none dark:invert px-2 focus-visible:ring-0 "
            placeholder="Imagine and describe what you want to see"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            required
            disabled={loading}
          />
          <Button type="submit" variant="ghost" className="p-2 shadow-sm" disabled={loading}>
            <Send className="dark:invert hover:cursor-pointer" />
          </Button>
        </form>
        <div className="relative border flex-1 bg-white dark:bg-black">
          {loading ? (
            <Loader />
          ) : (
            <div className={`absolute z-40 ${!imgUrl ? 'hidden' : 'block'}`}>
              <img
                src={`data:image/jpeg;base64,${imgUrl}`}
                alt="generated-image"
                className="object-cover max-h-[54vh] w-[47vw]"
              />
              <TooltipProvider delayDuration={100}>
                <Tooltip>
                  <TooltipTrigger className="absolute z-50 top-5 right-24 ">
                    <div
                      onClick={handleUpload}
                      className="hover:bg-transparent hover:text-white text-slate-500 dark:invert"
                    >
                      <CloudUpload size={22} />
                      <TooltipContent side="right">Save to cloud</TooltipContent>
                    </div>
                  </TooltipTrigger>
                </Tooltip>
              </TooltipProvider>
            </div>
          )}
        </div>
      </div>

      <div className=" min-w-[15rem] px-1 flex flex-col gap-10">
        <div className=" flex flex-col gap-2 py-2">
          <Label className="font-light" htmlFor="cfgScale">
            Engine
          </Label>
          <Select value={engineValue} onValueChange={(val) => setEngineValue(val)}>
            <SelectTrigger>
              <SelectValue placeholder="Select Engine" defaultChecked />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {engine.map((value, idx) => (
                  <SelectItem key={idx + 1} value={value}>
                    <p className="capitalize">{value}</p>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className=" flex flex-col gap-2 py-2">
          <Label className="font-light" htmlFor="cfgScale">
            Guidance Scale: {guidanceScale}
          </Label>
          <Slider
            name="cfgScale"
            max={4}
            step={0.1}
            min={1}
            value={guidanceScale}
            onValueChange={(val) => setGuidanceScale(val)}
          />
        </div>

        <div className=" flex flex-col gap-2 py-2">
          <Label className="font-light" htmlFor="steps">
            Steps: {steps}
          </Label>
          <Slider name="steps" max={12} step={1} min={8} value={steps} onValueChange={(val) => setSteps(val)} />
        </div>
      </div>
    </div>
  )
}

export default Page
