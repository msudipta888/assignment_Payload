import payload from 'payload'
export async function GET() {
   try {
          const form = await payload.findGlobal({ slug: 'contact-us' }) 
          res.json(form)
        } catch (err) {
          res.status(500).json({ error: err.message })
        }
}