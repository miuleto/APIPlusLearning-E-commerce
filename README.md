## Database

This project uses Prisma to manage the database. Provider is sqlite, Detail can be found in Prisma directory, the schema is `schema.prisma`

```bash
# create the database from schema
prisma migrate $your_database_name --name init

# generate client for your database
prisma generate
```

## Environment Variables

```bash
# This should be automatically handled by Prisma when init
DATABASE_URL="file:./$your_database_name.d"

# Key for Stripe Payment Gateway
PUBLIC_STRIPE_PUBLIC_KEY = your_stripe_public_key
STRIPE_SECRET_KEY = your_stripe_secret_key
PUBLIC_SERVER_URL = your_url
```
