"use client";

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils";
import { Bot, Send } from "lucide-react"
import { useState } from "react";
import Markdown from 'react-markdown'

export default function Home() {
  const [prompt, setPrompt] = useState("")
  const [response, setResponse] = useState("")

  const handleKeyDown = (e:any) => {
    // if(e.key === 'Enter'){
    //   e.preventDefault()
    //   handleSend()
    // }
  }

  const handleSend = async () => {
    if(!prompt){
      console.log('Prompt is empty', );
      return;
    }

    const response = await fetch('api/chat', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        prompt
      })
    })

    const data:any = await response.json()
    console.log('---data:', data);
    setResponse(data.text)
  }

  return (
    <main className="flex min-h-screen flex-col items-center py-20 px-10 gap-6">
      <h3 className="text-2xl font-semibold flex gap-2 items-center">
        <Bot className="w-7 h-7" />
        Google Gemini Pro Start
      </h3>
      <div className="flex flex-col items-end gap-4 w-full max-w-4xl">
        <Textarea className="flex-1" onChange={(e)=>{
          setPrompt(e.target.value)
        }}
        onKeyDown={(e) => handleKeyDown(e)}
        />
        <Button className="w-24 flex gap-2" onClick={handleSend}>
          <Send className="w-4 h-4" />
          Send
        </Button>
      </div>
      <h2 className="text-left">Response</h2>
      <div className="rounded-md border border-gray-300 px-5 py-6 w-full">
        <Markdown className={cn("w-full h-full ")}>{`${response}`}</Markdown>
      </div>
    </main>
  )
}
