import React from 'react'
import './styles.css'
import ContactForm from '@/components/Contact'

export default async function HomePage() {
  return (
    <div className="home">
      <ContactForm />
    </div>
  )
}
