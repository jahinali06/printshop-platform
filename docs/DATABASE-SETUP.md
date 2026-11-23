# Database Setup Guide

This guide will walk you through setting up PostgreSQL for the PrintShop application.

## Prerequisites

- PostgreSQL 14 or higher
- Node.js 18 or higher
- pnpm (or npx pnpm)

## Step 1: Install PostgreSQL

### macOS

```bash
# Using Homebrew
brew install postgresql@14
brew services start postgresql@14
```

### Ubuntu/Debian

```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

### Windows

Download and install from [PostgreSQL official website](https://www.postgresql.org/download/windows/)

## Step 2: Create Database and User

Connect to PostgreSQL:

```bash
# macOS/Linux
sudo -u postgres psql

# Windows (use psql from Start Menu)
psql -U postgres
```

Create the database and user:

```sql
-- Create a new database
CREATE DATABASE printshop;

-- Create a user with password
CREATE USER printshop_user WITH PASSWORD 'your_secure_password';

-- Grant all privileges on the database to the user
GRANT ALL PRIVILEGES ON DATABASE printshop TO printshop_user;

-- Connect to the database
\c printshop

-- Grant schema privileges (PostgreSQL 15+)
GRANT ALL ON SCHEMA public TO printshop_user;

-- Exit psql
\q
```

## Step 3: Configure Environment Variables

### Backend API

Create `.env` file in `apps/api/`:

```env
# Database
DATABASE_URL="postgresql://printshop_user:your_secure_password@localhost:5432/printshop?schema=public"

# JWT Authentication
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
JWT_EXPIRES_IN="1h"
JWT_REFRESH_SECRET="your-super-secret-refresh-key-change-this-in-production"
JWT_REFRESH_EXPIRES_IN="7d"

# AWS S3 (for file uploads)
AWS_REGION="eu-west-2"
AWS_ACCESS_KEY_ID="your-aws-access-key"
AWS_SECRET_ACCESS_KEY="your-aws-secret-key"
AWS_S3_BUCKET="printshop-uploads"

# Stripe (for payments)
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Application
NODE_ENV="development"
PORT="3001"
CORS_ORIGIN="http://localhost:3000"
```

### Frontend Web App

Create `.env.local` file in `apps/web/`:

```env
# API Configuration
NEXT_PUBLIC_API_URL="http://localhost:3001"

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."

# AWS S3 (public URLs)
NEXT_PUBLIC_AWS_S3_BUCKET="printshop-uploads"
NEXT_PUBLIC_AWS_REGION="eu-west-2"
```

### Database Package

The `packages/database` package reads from the root `.env` or `apps/api/.env` automatically.

## Step 4: Generate Prisma Client

Navigate to the database package:

```bash
cd packages/database
```

Generate the Prisma client:

```bash
npx pnpm prisma generate
```

This will create TypeScript types from your schema.

## Step 5: Run Database Migrations

Apply the schema to your database:

```bash
# From packages/database directory
npx pnpm prisma migrate dev --name init

# Or from project root
npx pnpm --filter @printshop/database prisma migrate dev --name init
```

This will:
- Create all tables, indexes, and constraints
- Apply any pending migrations
- Regenerate Prisma Client

## Step 6: Seed the Database

Populate the database with sample data:

```bash
# From packages/database directory
npx pnpm prisma db seed

# Or from project root
npx pnpm --filter @printshop/database prisma db seed
```

This will create:
- 1 admin user (email: `admin@printshop.com`, password: `admin123`)
- 6 product categories
- 6 sample products with options and variants
- Sample pricing rules

## Step 7: Verify Database Setup

### Check Database Connection

```bash
# From packages/database directory
npx pnpm prisma studio
```

This opens Prisma Studio at `http://localhost:5555` where you can browse your data.

### Test API Connection

Start the backend API:

```bash
# From project root
npx pnpm dev:api
```

The API should start on `http://localhost:3001` and connect to the database successfully.

### Test from Frontend

Start the frontend:

```bash
# From project root
npx pnpm dev:web
```

You should be able to log in with the seeded admin account.

## Common Issues

### Issue: "password authentication failed"

**Solution**: Check your DATABASE_URL credentials match the user you created.

### Issue: "relation does not exist"

**Solution**: Run migrations again:

```bash
npx pnpm --filter @printshop/database prisma migrate reset
```

This will drop the database, recreate it, and run all migrations.

### Issue: "FATAL: role does not exist"

**Solution**: Make sure you created the PostgreSQL user:

```sql
CREATE USER printshop_user WITH PASSWORD 'your_password';
```

### Issue: "Could not connect to localhost:5432"

**Solution**: Ensure PostgreSQL is running:

```bash
# macOS
brew services list
brew services restart postgresql@14

# Linux
sudo systemctl status postgresql
sudo systemctl start postgresql
```

### Issue: Permission denied for schema public (PostgreSQL 15+)

**Solution**: Grant schema privileges:

```sql
-- Connect as postgres user
sudo -u postgres psql

-- Connect to your database
\c printshop

-- Grant privileges
GRANT ALL ON SCHEMA public TO printshop_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO printshop_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO printshop_user;
```

## Database Schema Overview

The database includes 40+ models covering:

### Core Entities
- **Users**: Customer accounts with roles and permissions
- **Organizations**: Multi-tenant business accounts
- **Products**: Product catalog with categories, variants, and options
- **Orders**: Complete order lifecycle management
- **Payments**: Payment processing and transactions

### Product Management
- **Categories**: Hierarchical product categorization
- **ProductVariants**: Size, color, material variations
- **ProductOptions**: Configurable product options
- **PricingRules**: Quantity-based pricing tiers
- **ProductImages**: Product media gallery

### Order Fulfillment
- **OrderItems**: Individual items within orders
- **Shipments**: Tracking and delivery information
- **SupplierOrders**: Dropshipping supplier integration
- **Addresses**: Shipping and billing addresses

### Design & Artwork
- **Artworks**: Customer-uploaded design files
- **DesignProjects**: Online design tool projects
- **PrintFiles**: Print-ready file management

### Marketing & Analytics
- **Reviews**: Product reviews and ratings
- **Notifications**: User notification system
- **ActivityLog**: Audit trail for all actions

## Prisma Commands Reference

```bash
# Generate Prisma Client (after schema changes)
npx pnpm prisma generate

# Create a new migration
npx pnpm prisma migrate dev --name descriptive_migration_name

# Apply migrations in production
npx pnpm prisma migrate deploy

# Reset database (WARNING: Deletes all data)
npx pnpm prisma migrate reset

# Open Prisma Studio (GUI database browser)
npx pnpm prisma studio

# Seed the database
npx pnpm prisma db seed

# Format schema file
npx pnpm prisma format

# Validate schema
npx pnpm prisma validate

# View migration status
npx pnpm prisma migrate status
```

## Next Steps

1. **Start Development**: Run `npx pnpm dev` to start both frontend and backend
2. **Test API**: Visit `http://localhost:3001/api` to see Swagger documentation
3. **Login**: Use `admin@printshop.com` / `admin123` to test authentication
4. **Explore Data**: Open Prisma Studio to browse seeded products

## Production Deployment

For production deployment:

1. **Use managed PostgreSQL**: Consider AWS RDS, Google Cloud SQL, or DigitalOcean Managed Databases
2. **Enable SSL**: Add `?sslmode=require` to your DATABASE_URL
3. **Connection Pooling**: Use PgBouncer or Prisma Data Proxy for connection pooling
4. **Backups**: Set up automated daily backups
5. **Monitoring**: Use pg_stat_statements and performance monitoring tools

Example production DATABASE_URL:

```env
DATABASE_URL="postgresql://user:password@db-host.region.provider.com:5432/printshop?sslmode=require&connection_limit=5"
```

## Security Best Practices

1. **Never commit `.env` files** - Already in `.gitignore`
2. **Use strong passwords** - Minimum 16 characters for database users
3. **Rotate JWT secrets** - Change secrets regularly in production
4. **Enable SSL/TLS** - Always use encrypted connections in production
5. **Limit database access** - Use restrictive firewall rules
6. **Regular updates** - Keep PostgreSQL and dependencies up to date

## Support

If you encounter issues not covered in this guide:

1. Check the [Prisma Documentation](https://www.prisma.io/docs)
2. Review [PostgreSQL Documentation](https://www.postgresql.org/docs/)
3. Check the project's GitHub issues
4. Consult the main README.md for additional resources
