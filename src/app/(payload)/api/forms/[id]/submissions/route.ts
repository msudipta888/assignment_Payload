// app/api/forms/contact-us/submissions/route.ts
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const body = await req.json()
  const { fullName, email, message } = body

  console.log('Form submitted:', { fullName, email, message })

  return NextResponse.json({ message: 'Form submission successful' })
}
