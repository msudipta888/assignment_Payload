// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import {multiTenantPlugin} from '@payloadcms/plugin-multi-tenant'
import ContactUs from './collections/Contact_Us'
import Tenants from './collections/Tenant'
import FormSubmissions from './collections/FormSubmission'
const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
     importMap: {
      baseDir: path.resolve(dirname),
    },
  },

  collections: [Users,Tenants,FormSubmissions, ContactUs],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
  plugins: [
    formBuilderPlugin({}),
   multiTenantPlugin({
     
      tenantField: { name: 'slug' },
      
     collections:{
       "form-submissions":{
        isGlobal: false,
        useTenantAccess: true,
       }
     },
    }),
  ],
})
