'use client'
import { ChevronRight, SquareUserRound } from 'lucide-react'
import { RotateCcw } from 'lucide-react'
import React from 'react'
import Dropzone from 'react-dropzone'
import toast, { Toaster } from 'react-hot-toast'

import { useGlobalStore } from '@/_store/globalStore'
import { toBase64 } from '@/_utils/base64'
import Loader from '@/components/blocks/loader'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

import ImageCard from './components/ImageCard'

function Page() {
  const [prompt, setPrompt] = React.useState<string>('')
  const [avatarStr, setAvatarStr] = React.useState<string>('')
  const [preview, setPreview] = React.useState<string>('')
  const [loading, setLoading] = React.useState(false)
  const selectedKey = useGlobalStore((state) => state.apiState.selectedKey)
  function handlePromptChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
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
    const avatar = preview.split(',')[1]
    let reqData = JSON.stringify({
      text_prompts: [
        {
          text: prompt,
          weight: 0
        }
      ],
      init_image: avatar,
      //TODO:change these to be dynamic
      ipadapter_strength: 0.5,
      control_strength: 0.5,
      steps: 10
    })

    try {
      setLoading(true)

      setPrompt('')
      setPreview('')
      const res = await fetch('/api/avatar', {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
          'X-API-KEY': selectedKey
        },
        body: reqData
      })
      const response = await res.json()
      if (response.success) {
        setAvatarStr(response.result.image_b64)
      }
      if (response.error) {
        toast.error('Failed to generate avatar. Please try again.', { position: 'top-right' })
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
      imgStr: avatarStr,
      appTag: 'Avatar'
    })
    try {
      setLoading(true)
      const res = await fetch('/api/image-studio', {
        method: 'POST',
        body: reqBody
      })

      const response = await res.json()

      if (response.success) {
        toast.success('Avatar saved successfully.', { position: 'top-right' })
        setAvatarStr('')
      }
      if (response.error) {
        toast.error('Failed to generate avatar. Please try again.', { position: 'top-right' })
      }
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }

  return (
    <div className="flex items-center justify-center h-full gap-28">
      <Toaster />

      <form onSubmit={handleSubmit} className=" flex flex-col  w-[60%] gap-12 p-12">
        <div className="flex text-2xl gap-3 ">
          <SquareUserRound size={30} />
          <h2 className="">Avatar</h2>
        </div>

        <Textarea
          required
          placeholder="Describe how you'd like your avatar to look..."
          className="resize-none w-full text-sm h-[120px] bg-white dark:bg-black "
          value={prompt}
          onChange={handlePromptChange}
        />

        <Button disabled={loading} loading={loading} type="submit" className="flex items-center justify-center">
          Generate Avatar
          <ChevronRight size={20} />
        </Button>
      </form>

      <div className="w-full h-full flex flex-col justify-center rounded-lg">
        <div className="bg-white dark:bg-black border">
          <Dropzone
            accept={{ 'image/jpeg': ['.png', '.webp', '.jpeg', '.jpg'] }}
            onDrop={async (acceptedFiles: any) => {
              const file: any = await toBase64(acceptedFiles[0])
              setPreview(file)
            }}
            disabled={loading || avatarStr ? true : false}
          >
            {({ getRootProps, getInputProps }) => (
              <section>
                {preview ? (
                  <div className="relative">
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
                          <div className={`absolute z-50 ${!avatarStr ? 'hidden' : 'block'}`}>
                            <ImageCard
                              isLoading={loading}
                              imgStr={avatarStr}
                              handleReset={() => setAvatarStr('')}
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
      </div>
    </div>
  )
}

export default Page
