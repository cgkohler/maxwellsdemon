import { NextRequest, NextResponse } from 'next/server'
import { writeFile, readFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'

const DATA_DIR = path.join(process.cwd(), 'data')
const CONTACTS_FILE = path.join(DATA_DIR, 'contacts.json')

interface ContactData {
  name: string
  email: string
  phone: string
  timestamp: string
}

async function ensureDataDir() {
  if (!existsSync(DATA_DIR)) {
    await mkdir(DATA_DIR, { recursive: true })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone } = await request.json()

    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return NextResponse.json(
        { error: 'Valid name is required' },
        { status: 400 }
      )
    }

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      )
    }

    if (!phone || typeof phone !== 'string' || phone.trim().length === 0) {
      return NextResponse.json(
        { error: 'Valid phone number is required' },
        { status: 400 }
      )
    }

    await ensureDataDir()

    let contacts: ContactData[] = []
    if (existsSync(CONTACTS_FILE)) {
      try {
        const fileContent = await readFile(CONTACTS_FILE, 'utf-8')
        contacts = JSON.parse(fileContent)
      } catch (error) {
        // If file is corrupted or empty, start fresh
        contacts = []
      }
    }

    const contactData: ContactData = {
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      timestamp: new Date().toISOString(),
    }

    contacts.push(contactData)

    await writeFile(
      CONTACTS_FILE,
      JSON.stringify(contacts, null, 2),
      'utf-8'
    )

    return NextResponse.json({ success: true, message: 'Contact information saved' })
  } catch (error) {
    console.error('Error saving contact:', error)
    return NextResponse.json(
      { error: 'Failed to save contact information' },
      { status: 500 }
    )
  }
}
