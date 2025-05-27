import express, { Request, Response } from 'express'
import payload from 'payload'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())

const start = async () => {
  await payload
    .init({
      secret: process.env.PAYLOAD_SECRET,
      database: process.env.DATABASE_URI,
      express: app,
    })
    .then(() => {
      app.get('/forms/contact-us', async (_req, res) => {
        try {
          const form = await payload.findGlobal({ slug: 'contact-us' }) // Correct type for slug
          res.json(form)
        } catch (err) {
          res.status(500).json({ error: err.message })
        }
      })
    })

  const PORT = process.env.PORT || 3000
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))
}

start()
