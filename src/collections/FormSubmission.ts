import { CollectionConfig } from 'payload'

const FormSubmissions: CollectionConfig = {
  slug: 'form-submission',
  labels: {
    singular: 'Form Submission',
    plural:   'Form Submissions',
  },
  fields: [
    {
      name: 'tenant',
      type: 'text',
      required: true,
    },
    {
      name: 'data',
      type: 'json',
      required: true,
    },
  ],
  access: {
    // Anyone (no auth) can submit
    create: () => true,

    // Only users in same tenant can list or view submissions
    read:   ({ req }) => {
      if (req.user?.tenants) {
        return { tenant: { equals: req.user.tenants } };
      }
      return false;
    },

    // Immutable once created
    update: () => false,
    delete: () => false,
  },
}

export default FormSubmissions
