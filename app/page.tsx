"use client"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import { Bot, Copy, Egg, Send, XCircle } from "lucide-react"
import { useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import Markdown from "react-markdown"

export default function Home() {
  const [prompt, setPrompt] = useState("")
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState("")

  const handleKeyDown = (e: any) => {
    // if(e.key === 'Enter'){
    //   e.preventDefault()
    //   handleSend()
    // }
  }

  const handleSend = async () => {
    if (!prompt) {
      console.log("Prompt is empty")
      toast({
        variant: "destructive",
        title: "Prompt is empty",
      })
      return
    }

    setLoading(true)
    const response = await fetch("api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    })

    const data: any = await response.json()
    console.log("---data:", data)
    setResponse(data.text)
    setLoading(false)
  }

  const handleCopy = () => {
    if (!response) {
      toast({
        title: "Response is empty",
      })
      return
    }
    navigator.clipboard.writeText(response)
    toast({
      title: "Copied to clipboard!",
    })
  }

  const handleClear = () => {
    console.log("---clear:")
    setPrompt("")
    setResponse("")
  }

  return (
    <main className="flex min-h-screen flex-col items-center py-20 sm:px-10 px-4 gap-6 max-w-4xl m-auto">
      <h3 className="text-2xl font-semibold flex gap-2 items-center">
        <Bot className="w-7 h-7" />
        Google Gemini Pro Start
      </h3>
      <div className="flex flex-col items-end gap-4 w-full">
        <div className="relative w-full">
          <Textarea
            value={prompt}
            className="flex-1"
            onChange={(e) => {
              setPrompt(e.target.value)
            }}
            onKeyDown={(e) => handleKeyDown(e)}
          />
          {/* <Button
            variant="ghost"
            size="icon"
            className="w-6 h-6 absolute right-1 bottom-1"
            onClick={handleClear}
          >
            <XCircle className="w-4 h-4" />
          </Button> */}
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex gap-2"
            onClick={handleClear}
          >
            <XCircle className="w-4 h-4" /> Clear
          </Button>
          <Button className="flex gap-2" onClick={handleSend}>
            <Send className="w-4 h-4" />
            Send
          </Button>
        </div>
      </div>

      <div className="flex flex-col w-full">
        <div className="w-full flex justify-end">
          <Button
            variant="ghost"
            size="icon"
            className="w-6 h-6"
            onClick={handleCopy}
          >
            <Copy className="w-4 h-4" />
          </Button>
        </div>
        <div className="rounded-md border border-gray-300 px-5 py-6 w-full">
          {!response && !loading && (
            <div className="flex gap-3 items-center">
              <Egg className="w-5 h-5" />
              Waiting to generate response...
            </div>
          )}
          {response && (
            <Markdown
              className={cn("w-full h-full ")}
            >{`${response}`}</Markdown>
          )}
          {loading && (
            <div className="flex flex-col gap-4">
              <Skeleton className="w-full h-[30px] rounded" />
              <Skeleton className="w-full h-[30px] rounded" />
              <Skeleton className="w-[50px] h-[30px] rounded" />
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
