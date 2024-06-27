'use client'
import { RotateCcw, Send } from 'lucide-react'
import React from 'react'
import Dropzone from 'react-dropzone'
import toast, { Toaster } from 'react-hot-toast'

import { useGlobalStore } from '@/_store/globalStore'
import { toBase64 } from '@/_utils/base64'
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

import ImageCard from './components/ImageCard'

function Page() {
  const engine = ['proteus', 'dreamshaper', 'playground', 'stable-diffusion-xl-turbo']
  const [guidanceScale, setGuidanceScale] = React.useState([2])
  const [imageStrength, setImageStrength] = React.useState([0.25])
  const [steps, setSteps] = React.useState([9])
  const [engineValue, setEngineValue] = React.useState('proteus')
  const [prompt, setPrompt] = React.useState<string>('')
  const [generatedImg, setGeneratedImg] = React.useState<string>('')
  const [preview, setPreview] = React.useState<string>('')
  const [loading, setLoading] = React.useState(false)
  const selectedKey = useGlobalStore((state) => state.apiState.selectedKey)

  function handlePromptChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPrompt(e.target.value)
  }

  function handleReset() {
    setPreview('')
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!preview) {
      toast.error('Please upload an image', { position: 'top-right' })
      return
    }
    if (!selectedKey) {
      toast.error('Please select a valid api key', { position: 'top-right' })
      return
    }
    const initImg = preview.split(',')[1]
    let reqData = JSON.stringify({
      cfg_scale: guidanceScale.toString(),
      steps: steps.toString(),
      engine: engineValue,
      init_image: initImg,
      text_prompts: [
        {
          text: prompt
        }
      ],
      image_strength: imageStrength.toString()
    })

    try {
      setLoading(true)

      setPrompt('')

      setPreview('')

      const res = await fetch('/api/vision-image-to-image', {
        method: 'POST',
        headers: { accept: 'application/json', 'Content-Type': 'application/json', 'X-API-KEY': selectedKey },
        body: reqData
      })

      const response = await res.json()
      if (response.success) {
        setGeneratedImg(response.result.image_b64)
      }
      if (response.error) {
        toast.error('Failed to retrieve image. Please try again.', { position: 'top-right' })
      }
    } catch (error) {
      setPrompt('')

      setPreview('')

      console.log(error)
    }

    setLoading(false)
  }

  async function handleUpload() {
    const reqBody = JSON.stringify({
      imgStr: generatedImg,
      appTag: 'Reimagine'
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
        setGeneratedImg('')
      }
      if (response.error) {
        toast.error('Failed to generate Image. Please try again.', { position: 'top-right' })
      }
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }

  return (
    <div className="flex px-8 gap-3 py-4">
      <Toaster />

      <div className="w-full h-full flex flex-col justify-center gap-10">
        <div className="bg-white border flex-1 dark:bg-black">
          <Dropzone
            accept={{ 'image/jpeg': ['.png', '.webp', '.jpeg', '.jpg'] }}
            onDrop={async (acceptedFiles: any) => {
              const file: any = await toBase64(acceptedFiles[0])
              setPreview(file)
            }}
            disabled={loading || generatedImg ? true : false}
          >
            {({ getRootProps, getInputProps }) => (
              <section>
                {preview ? (
                  <div className="relative ">
                    <img src={preview} alt="Uploaded avatar" className="h-[30rem]" />
                    <RotateCcw
                      size={22}
                      className="absolute z-50 top-5 right-10 hover:cursor-pointer"
                      onClick={handleReset}
                    />
                  </div>
                ) : (
                  <div {...getRootProps()} className="h-[30rem] hover:cursor-pointer">
                    <input {...getInputProps()} />
                    {loading ? (
                      <Loader />
                    ) : (
                      <>
                        <div className="flex flex-col gap-10 text-muted-foreground items-center justify-center h-full text-center text-wrap">
                          Drag &apos;n&apos; drop some files here, <br />
                          or click to select files
                          <span className="text-xs">.png, .jpg, .webp</span>
                          <div className={`absolute z-50 ${!generatedImg ? 'hidden' : 'block'}`}>
                            <ImageCard
                              isLoading={loading}
                              imgStr={generatedImg}
                              handleReset={() => setGeneratedImg('')}
                              handleUpload={handleUpload}
                            />
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </section>
            )}
          </Dropzone>
        </div>

        <form onSubmit={handleSubmit} className="flex items-center bg-white border px-4 dark:invert">
          <Input
            className="h-12 shadow-none border-none dark:invert px-2 focus-visible:ring-0"
            placeholder="Imagine and describe what you want to see"
            value={prompt}
            onChange={handlePromptChange}
            required
            disabled={loading}
          />
          <Button type="submit" variant="ghost" className="p-2 shadow-sm" disabled={loading}>
            <Send className="dark:invert hover:cursor-pointer" />
          </Button>
        </form>
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
          <Label className="font-light" htmlFor="img-strength">
            Image Strength: {imageStrength}
          </Label>
          <Slider
            name="img-strength"
            max={0.1}
            step={0.1}
            min={0.75}
            value={imageStrength}
            onValueChange={(val) => setImageStrength(val)}
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
