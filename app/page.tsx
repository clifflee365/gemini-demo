import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Bot, Send } from "lucide-react"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center py-20 px-10 gap-6">
      <h3 className="text-2xl font-semibold flex gap-2 items-center">
        <Bot className="w-7 h-7" />
        Google Gemini Pro Start
      </h3>
      <div className="flex flex-col items-end gap-4 w-full max-w-4xl">
        <Textarea className="flex-1" />
        <Button className="w-24 flex gap-2">
          <Send className="w-4 h-4" />
          Send
        </Button>
      </div>
    </main>
  )
}
