import { NextRequest, NextResponse } from 'next/server'
import { writeFile, readFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'

const DATA_DIR = path.join(process.cwd(), 'data')
const WAITLIST_FILE = path.join(DATA_DIR, 'waitlist.json')

async function ensureDataDir() {
  if (!existsSync(DATA_DIR)) {
    await mkdir(DATA_DIR, { recursive: true })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      )
    }

    await ensureDataDir()

    let waitlist: string[] = []
    if (existsSync(WAITLIST_FILE)) {
      try {
        const fileContent = await readFile(WAITLIST_FILE, 'utf-8')
        waitlist = JSON.parse(fileContent)
      } catch (error) {
        // If file is corrupted or empty, start fresh
        waitlist = []
      }
    }

    // Avoid duplicates
    if (!waitlist.includes(email)) {
      waitlist.push(email)
      
      await writeFile(
        WAITLIST_FILE,
        JSON.stringify(waitlist, null, 2),
        'utf-8'
      )
    }

    return NextResponse.json({ success: true, message: 'Email added to waitlist' })
  } catch (error) {
    console.error('Error saving waitlist entry:', error)
    return NextResponse.json(
      { error: 'Failed to save email' },
      { status: 500 }
    )
  }
}
