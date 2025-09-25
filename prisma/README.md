# Database Migration Instructions

This project supports multiple database systems (SQLite, MySQL, PostgreSQL) using Prisma ORM.

## Setup Commands

### Initialize the correct schema based on environment
```bash
node scripts/setup-prisma.js
```

### Generate Prisma client
```bash
npx prisma generate
```

### Push schema changes to database (for development)
```bash
npx prisma db push
```

### Create and apply migrations (for production)
```bash
npx prisma migrate dev
```

### Reset database (be careful!)
```bash
npx prisma migrate reset
```

## Environment Configuration

The database type is controlled by the `DATABASE_TYPE` variable in `.env.local`:
- `DATABASE_TYPE=sqlite` for SQLite
- `DATABASE_TYPE=mysql` for MySQL/MariaDB
- `DATABASE_TYPE=postgresql` for PostgreSQL

Make sure to update `DATABASE_URL` accordingly for your selected database type.