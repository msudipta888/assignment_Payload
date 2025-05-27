'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'


const FORM_ID = 'contact-us'

export default function ContactForm() {
  const [formMeta, setFormMeta] = useState(null)
  const [formData, setFormData] = useState({ fullName: '', email: '', message: '' })
  const [status, setStatus] = useState('')

  useEffect(() => {
    // Fetch form metadata
    axios
      .get(`/api/forms/${FORM_ID}`)
      .then((res) => setFormMeta(res.data))
      .catch((err) => console.error(err))
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('Submitting...')
    try {
      await axios.post(`/api/forms/${FORM_ID}/submissions`, formData)
      setStatus('Submitted successfully!')
      setFormData({ fullName: '', email: '', message: '' })
    } catch (error) {
      setStatus('Submission failed.')
      console.error(error)
    }
  }

  if (formMeta) return <p>{formMeta}</p>

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: '0 auto' }}>
      <h2> Contact Us</h2>
      <div>
        <label>Full Name</label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Email Address</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
      </div>
      <div>
        <label>Message</label>
        <textarea name="message" value={formData.message} onChange={handleChange} required />
      </div>
      <button type="submit">Submit</button>
      {status && <p>{status}</p>}
    </form>
  )
}
