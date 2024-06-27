'use client'
import { Bird, CornerDownLeft, Mic, Paperclip, Rabbit, Turtle, User } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import toast, { Toaster } from 'react-hot-toast'

import { useGlobalStore } from '@/_store/globalStore'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

type ParsedLineType = {
  data: {
    choices: [{ delta: { content: string; role?: string }; finish_reason?: string }]
  }
}

function Page() {
  const model = [
    { value: 'gpt-4o', name: 'GPT-4o' },
    { value: 'gpt-3.5-turbo', name: 'GPT 4 Turbo' },
    { value: 'cortext-ultra', name: 'Cortext Ultra' },
    { value: 'cortext-lite', name: 'Cortext Lite' },
    { value: 'cortext', name: 'Cortext' }
  ]
  const messagesContainerRef = React.useRef<HTMLDivElement | null>(null)
  const [response, setResponse] = React.useState<any>()

  const [selectedModel, setSelectedModel] = React.useState('gpt-4o')
  const [prompt, setPrompt] = React.useState<string>('')
  const [loading, setLoading] = React.useState(false)
  const [messages, setMessages] = React.useState<{ text?: string; isBot: boolean; html?: string; isDummy?: boolean }[]>(
    [
      {
        text: '',
        isBot: true,
        isDummy: true
      }
    ]
  )
  const selectedKey = useGlobalStore((state) => state.apiState.selectedKey)

  function handlePromptChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setPrompt(e.target.value)
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (prompt === '') {
      toast.error('Please enter a prompt', { position: 'top-right' })
      return
    }
    if (!selectedKey) {
      toast.error('Please select a valid api key', { position: 'top-right' })
      return
    }

    let reqData = JSON.stringify({
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.001,
      model: selectedModel,
      stream: true,
      top_p: 0.01,
      max_tokens: 1500
    })

    try {
      let messagesCopy: any = [
        ...messages,
        {
          text: prompt,
          isBot: false
        }
      ]
      setMessages(messagesCopy)
      setPrompt('')
      setLoading(true)
      const response: any = await fetch('/api/cortext-chat', {
        method: 'POST',
        headers: { accept: 'application/json', 'content-type': 'application/json', 'X-API-KEY': selectedKey },
        body: reqData
      })
      setLoading(false)

      const reader = response.body.getReader()
      let decoder = new TextDecoder('utf-8')
      let buffer: string | undefined = ''
      let currentMessage: boolean = false

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        buffer += decoder.decode(value, { stream: true })
        const lines: string[] = buffer?.split('\n') || []
        buffer = lines.pop()

        // Process each line
        const html = await lineParser(lines)

        setResponse(html)
        if (currentMessage) {
          messagesCopy[messagesCopy.length - 1].html += html
        } else {
          messagesCopy.push({
            html,
            isBot: true
          })
        }
        setMessages(messagesCopy)
        currentMessage = true
      }
    } catch (error) {
      console.error('Error fetching streaming data:', error)

      toast.error('Failed to retrieve response. Please try again.', { position: 'top-right' })
    }

    setLoading(false)
  }

  async function lineParser(lines: string[]): Promise<string> {
    return new Promise((resolve, reject) => {
      let html = ''
      for (const line of lines) {
        if (line.length === 0) {
          continue
        }

        const newLine = '{' + line + '}'

        const parsedLine = eval('(' + newLine + ')') as ParsedLineType
        if (parsedLine && parsedLine.data) {
          const { choices } = parsedLine.data

          if (choices.length > 0) {
            const [choice] = choices

            const {
              delta: { content },
              finish_reason
            } = choice

            if (content) {
              html += content

              continue
            }

            if (finish_reason && finish_reason === 'stop') {
              resolve(html)

              break
            }
          }
        }
      }

      resolve(html)
    })
  }

  const handlePromptClick = (prompt: string) => {
    setPrompt(prompt)
    setTimeout(() => {
      const form = document.getElementById('chat-form')
      form?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))
    }, 0)
  }

  return (
    <div className="border h-[74vh] rounded-md w-full">
      <Toaster />
      <div className="flex h-full w-full">
        <main className="flex w-full gap-3">
          <div className="min-w-[20vw] p-1 flex ">
            <div className="grid w-full items-start gap-6">
              <fieldset className="grid gap-6 rounded-lg border p-4">
                <div className="grid gap-3">
                  <Label htmlFor="model">Model</Label>
                  <Select value={selectedModel} onValueChange={(val) => setSelectedModel(val)}>
                    <SelectTrigger id="model" className="items-start [&_[data-description]]:hidden">
                      <SelectValue placeholder="Select a model" defaultChecked />
                    </SelectTrigger>
                    <SelectContent>
                      {model.map((item, idx) => (
                        <SelectItem key={idx + 1} value={item.value}>
                          <p className="capitalize">{item.name}</p>
                        </SelectItem>
                      ))}
                      {/* <SelectItem value="genesis">
                        <div className="flex items-start gap-3 text-muted-foreground">
                          <Rabbit className="size-5" />
                          <div className="grid gap-0.5">
                            <p>
                              Neural <span className="font-medium text-foreground">Genesis</span>
                            </p>
                            <p className="text-xs" data-description>
                              Our fastest model for general use cases.
                            </p>
                          </div>
                        </div>
                      </SelectItem> */}
                    </SelectContent>
                  </Select>
                </div>
                {/* <div className="grid gap-3">
                  <Label htmlFor="temperature">Temperature</Label>
                  <Input id="temperature" type="number" placeholder="0.4" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-3">
                    <Label htmlFor="top-p">Top P</Label>
                    <Input id="top-p" type="number" placeholder="0.7" />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="top-k">Top K</Label>
                    <Input id="top-k" type="number" placeholder="0.0" />
                  </div>
                </div> */}
              </fieldset>
            </div>
          </div>
          <div className="relative flex flex-1 h-full min-h-[70vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2">
            <Badge variant="outline" className="absolute right-3 top-3">
              Output
            </Badge>
            <div className="overflow-y-scroll p-2 flex-1">
              {messages.length > 1 ? (
                <>
                  <div className="flex-1  flex flex-col gap-3 py-10 overflow-y-auto">
                    {messages.map((message, idx) => (
                      <div className="flex mb-5 gap-3 px-3 " key={idx + 1}>
                        {!message.isDummy && (
                          <div>
                            {message.isBot ? (
                              <Image className="pt-2" src={'/logo.svg'} alt="logo" width={28} height={28} />
                            ) : (
                              <User size={28} />
                            )}
                          </div>
                        )}
                        <div className="px-6 w-[95%] text-lg">
                          {message.text ? <span>{message.text}</span> : <>{message.html || ''}</>}
                        </div>
                      </div>
                    ))}
                  </div>
                  {loading ? (
                    <div className="px-5 flex gap-6">
                      <Image src={'/logo.svg'} alt="logo" width={28} height={28} />
                      <p>generating text...</p>
                    </div>
                  ) : null}
                  <div ref={messagesContainerRef} />
                </>
              ) : (
                <main className="w-full transition-width flex flex-col overflow-hidden items-stretch flex-1 ">
                  <div className="flex-1 overflow-hidden">
                    <div className="flex flex-col items-center text-sm md:h-full bg-lightBlack">
                      <div className="w-full md:max-w-2xl lg:max-w-3xl md:h-[70%] md:flex md:flex-col px-6 ">
                        <h1 className="text-4xl  font-semibold text-center mt-6 sm:mt-[10vh] ml-auto mr-auto mb-10 sm:mb-16">
                          Bit-AI Chat
                        </h1>
                        <div className="md:flex items-start text-center gap-3.5">
                          {[
                            {
                              icon: '',
                              title: '',
                              subTitle: [
                                `Create a workout plan`,
                                `Got any creative ideas for a 10 year old’s birthday?`,
                                `How do I make an HTTP request in Javascript?`
                              ],
                              hover: true
                            },
                            {
                              icon: '',
                              title: '',
                              subTitle: [
                                `Can you recommend a good science fiction book for a beginner?`,
                                `I'm planning a trip to Japan. What are the top five tourist attractions I should visit?`,
                                `I need a healthy dinner recipe that's quick and easy to make. Any suggestions?`
                              ],
                              hover: true
                            },
                            {
                              icon: '',
                              title: '',
                              subTitle: [
                                `How can I improve my productivity when working from home?`,
                                `Can you explain the basics of quantum computing to me?`,
                                `What are some effective exercises for relieving back pain?`
                              ],
                              hover: true
                            }
                          ].map((item, index) => (
                            <div className="flex flex-col mb-8 md:mb-auto gap-3.5 flex-1" key={index}>
                              <ul className="flex flex-col gap-3.5 w-full sm:max-w-md m-auto">
                                {item.subTitle.map((subTitle, subTitleIndex) => (
                                  <button
                                    className={`w-full p-3 border rounded-md min-h-[10vh] ${
                                      item.hover
                                        ? 'hover:bg-gray-200 dark:hover:bg-gray-900 cursor-pointer'
                                        : 'cursor-text'
                                    }`}
                                    key={subTitleIndex}
                                    onClick={() => handlePromptClick(subTitle)}
                                  >
                                    {subTitle}
                                  </button>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </main>
              )}
            </div>
            <form
              className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring"
              x-chunk="dashboard-03-chunk-1"
              onSubmit={handleSubmit}
            >
              <Label htmlFor="message" className="sr-only">
                Message
              </Label>
              <Textarea
                id="message"
                placeholder="Type your message here..."
                value={prompt}
                onChange={handlePromptChange}
                required
                disabled={loading}
                className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
              />
              <div className="flex items-center p-3 pt-0">
                <TooltipProvider delayDuration={100}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      {/* <Button variant="ghost" size="icon"> */}
                      <div>
                        <Paperclip className="size-4" />
                        <span className="sr-only">Attach file</span>
                      </div>
                      {/* </Button> */}
                    </TooltipTrigger>
                    <TooltipContent side="top">Coming Soon...</TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      {/* <Button variant="ghost" size="icon" disabled> */}
                      <div>
                        <Mic className="size-4" />
                        <span className="sr-only">Use Microphone</span>
                      </div>
                      {/* </Button> */}
                    </TooltipTrigger>
                    <TooltipContent side="top">Coming Soon...</TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <Button type="submit" size="sm" className="ml-auto gap-1.5">
                  Send Message
                  <CornerDownLeft className="size-3.5" />
                </Button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Page
