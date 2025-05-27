import { CollectionConfig } from 'payload'

const Tenants: CollectionConfig = {
  slug: 'tenants',
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'settings',
      type: 'group',
      fields: [
        {
          name: 'allowFormCreation',
          type: 'checkbox',
          defaultValue: true,
        },
      ],
    },
  ],
}

export default Tenants
