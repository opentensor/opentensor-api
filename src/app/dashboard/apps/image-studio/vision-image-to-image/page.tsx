'use client'
import { Send } from 'lucide-react'
import React from 'react'

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

import MyDropzone from './components/MyDropzone'

function Page() {
  const engine = ['proteus', 'dreamshaper', 'playground', 'stable-diffusion-xl-turbo']
  const [guidanceScale, setGuidanceScale] = React.useState([2])
  const [imageStrength, setImageStrength] = React.useState([0.25])
  const [steps, setSteps] = React.useState([9])
  const [engineValue, setEngineValue] = React.useState('proteus')

  return (
    <div className="flex px-8 gap-3 py-4">
      <div className="w-full h-full flex flex-col justify-center gap-10 dark:invert">
        <div className="flex-1">
          <MyDropzone />
        </div>
        <div className="flex items-center bg-white border px-4">
          <Input
            className="h-12 shadow-none border-none dark:invert px-2 focus-visible:ring-0"
            placeholder="Imagine and describe what you want to see"
          />
          <div className="p-2 shadow-sm">
            <Send className="dark:invert hover:cursor-pointer" />
          </div>
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
