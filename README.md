````markdown
# 📝 Multi-Tenant Form Builder with Payload CMS & Supabase

A self-contained Payload CMS project demonstrating:

- 🔨 **Dynamic Form Builder** via `@payloadcms/plugin-form-builder`  
- 🏢 **Multi-Tenancy** via `@payloadcms/plugin-multi-tenant`  
- 💾 **Supabase** (Postgres) as the database  
- ⚙️ All in **one codebase**—no separate frontend or backend needed  

---

## 🚀 Tech Stack

- **Payload CMS** (v3+)  
- Plugins:  
  - `@payloadcms/plugin-form-builder`  
  - `@payloadcms/plugin-multi-tenant`  
- DB Adapter: `@payloadcms/db-postgres` → **Supabase Postgres**  
- Image processing: `sharp`  
- Language: TypeScript  
- Server: Express (bundled by Payload)

---

## 🔧 DB Provider

We’ll use Supabase’s managed Postgres:

```ts
import { postgresAdapter } from '@payloadcms/db-postgres'

db: postgresAdapter({
  pool: {
    connectionString: process.env.SUPABASE_DATABASE_URL!,
  },
}),
````

> 🔑 In your `.env`:
>
> ```env
> SUPABASE_DATABASE_URL=<your-supabase-db-url>
> PAYLOAD_SECRET=<a-strong-secret>

> ```

---

## 🏗️ Project Setup

1. **Clone & install**

   ```bash
   git clone https://github.com/msudipta888/assignment_Payload.git
   cd payload-multitenant-forms
   npm install
   ```

2. **Configure environment**
   Create a `.env` in project root:

   ```env
   SUPABASE_DATABASE_URL=postgres://…  
   PAYLOAD_SECRET=yourPayloadSecret  
   NODE_ENV=development  
   PORT=3000  
   ```

3. **Run Payload**

   ```bash
   npx payload build
   npm run dev
   ```

4. **Access Admin UI**
   Open [http://localhost:3000/admin](http://localhost:3000/admin) in your browser.

---

## 🛠️ Implementation Steps

1. **Define Collections**

   * **Users** (with `auth: true` and a `tenant` relationship)
   * **Tenants** (slug + name)
2. **Define Form Global**

   * **contact-us** (fields: fullName, email, message)
3. **Configure Plugins**

   * **Form Builder**
   * **Multi-Tenant** scoped to:

     * Global: `contact-us`
     * Collection: `form-builder-submissions`
4. **Seed First Data via Admin**

   * Create one or more Tenants
   * Create your Admin user (assign a tenant)

---



## 🔑 API Endpoints

> Payload exposes REST under `/api/*`

| Method  | Endpoint                        | Description                                                         |
| ------- | ------------------------------- | ------------------------------------------------------------------- |
| GET     | `/api/forms/${FORM_ID}`       | Fetch form schema (contact-us global)                               |
| POST    | `/api/forms/${FORM_ID}/submissions` | Submit form data (body JSON includes `form: "contact-us"` + `data`) |

---

## 🎯 Usage

1. **Create Tenants** in Admin UI → **Tenants**
2. **Create Admin User** → **Users** (assign a Tenant)
3. All requests must include the header:

   ```
   x-tenant-id: my-tenant-slug
   ```
4. The Form Builder plugin auto-generates the `/api/forms/${FORM_ID}/submissions` endpoint—no extra code needed.

---
