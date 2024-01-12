import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const modelVersion = 'gemini-pro'
// const modelVersion = 'gemini-pro-vision'

export async function POST(req: NextRequest) {
  const reqBody = await req.json()
  const { prompt } = reqBody


  // Access your API key as an environment variable (see "Set up your API key" above)
  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY as string);

  const model = genAI.getGenerativeModel({ model: modelVersion });

  try {
    const result = await model.generateContent(prompt)
    const response = await result.response
    console.log('---response:', response);
    const text = response.text()
    return NextResponse.json({
      text
    })
  } catch (error) {
    return NextResponse.json({
      text: 'Unable to process the prompt. Please try again.'
    })
  }

}
