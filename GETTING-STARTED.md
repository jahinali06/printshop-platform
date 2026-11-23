# Getting Started with PrintShop Platform

## 🎉 Project Successfully Initialized!

The PrintShop Platform foundation has been set up with a complete architecture ready for e-commerce development.

## 📁 Project Structure

```
printshop-platform/
├── apps/
│   ├── web/              ✅ Next.js 16 frontend (TypeScript + Tailwind CSS v4)
│   └── api/              ✅ NestJS 12 backend (TypeScript + Prisma)
├── packages/
│   └── database/         ✅ Prisma schema (40+ models)
├── docs/                 ✅ Comprehensive documentation
│   ├── PRD.md           - Product Requirements Document
│   ├── ARCHITECTURE.md  - System architecture
│   ├── DATABASE.md      - Database schema documentation
│   ├── DESIGN-SYSTEM.md - Design tokens and components
│   └── PROGRESS.md      - Development progress tracker
└── README.md            ✅ Project overview
```

## ✅ What's Been Built

### Infrastructure
- ✅ Turborepo monorepo with pnpm workspaces
- ✅ Build pipeline and scripts
- ✅ TypeScript configuration across all packages
- ✅ Environment variable setup

### Database Schema
- ✅ **40+ Prisma models** including:
  - Users, Organizations, Addresses
  - Products, Categories, Variants, Options
  - Suppliers, Fulfillment, Shipments
  - Orders, Payments, Refunds
  - Artwork, Designs, Templates
  - Promotions, Discounts, Notifications
  - Audit logs and webhooks

### Frontend (Next.js)
- ✅ Modern App Router architecture
- ✅ Brand identity (Deep Navy, Electric Blue, Teal)
- ✅ Inter & Manrope fonts
- ✅ Responsive homepage with:
  - Hero section
  - 6 product categories
  - Features showcase
  - Call-to-action sections
- ✅ Utility functions and constants

### Backend (NestJS)
- ✅ RESTful API structure
- ✅ Swagger/OpenAPI documentation
- ✅ Health check endpoint
- ✅ CORS and validation configured
- ✅ Dependencies installed:
  - Authentication (Passport, JWT)
  - Database (Prisma)
  - Payments (Stripe)
  - File storage (AWS SDK)
  - Queue processing (BullMQ)
  - Email (Nodemailer)

### Documentation
- ✅ Complete PRD with business requirements
- ✅ System architecture diagrams
- ✅ Database schema documentation
- ✅ Design system specification
- ✅ Progress tracking

## 🚀 Quick Start

### Prerequisites
- Node.js 22.x or higher
- PostgreSQL 15+
- Redis (optional, for background jobs)
- npm (comes with Node.js)

### Installation

1. **Install dependencies**
   ```bash
   npx pnpm install
   ```

2. **Set up environment variables**
   ```bash
   # Database package
   cp packages/database/.env.example packages/database/.env

   # Backend API
   cp apps/api/.env.example apps/api/.env

   # Frontend
   cp apps/web/.env.example apps/web/.env
   ```

3. **Configure PostgreSQL**

   Edit `packages/database/.env`:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/printshop?schema=public"
   ```

4. **Initialize the database**
   ```bash
   cd packages/database
   npx pnpm db:push
   ```

### Running the Applications

**Start everything in development mode:**
```bash
npx pnpm dev
```

This will start:
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- API Documentation: http://localhost:3001/api/docs

**Or run individually:**

```bash
# Frontend only
npx pnpm --filter @printshop/web dev

# Backend only
npx pnpm --filter @printshop/api dev
```

### Database Commands

```bash
# Generate Prisma Client
npx pnpm --filter @printshop/database db:generate

# Push schema to database (development)
npx pnpm --filter @printshop/database db:push

# Create migration (production)
npx pnpm --filter @printshop/database db:migrate

# Open Prisma Studio (database GUI)
npx pnpm --filter @printshop/database db:studio

# Seed database with sample data (TODO: needs to be created)
npx pnpm --filter @printshop/database db:seed
```

### Build for Production

```bash
# Build all applications
npx pnpm build

# Build specific app
npx pnpm --filter @printshop/web build
npx pnpm --filter @printshop/api build
```

## 📋 Next Steps

### Immediate Priority (Phase 1 Completion)

1. **Create UI Components**
   - Button, Input, Card, Modal, Badge
   - Form components with validation
   - Loading states and skeletons

2. **Build Navigation**
   - Header with logo, menu, search, cart
   - Mobile responsive menu
   - Footer with links

3. **Additional Pages**
   - Product listing page
   - Product detail page (basic)
   - Login/Register pages
   - 404 and error pages

### Phase 2: Backend Development

4. **Database Setup**
   - Install PostgreSQL locally or use Docker
   - Run migrations
   - Create seed script with sample data

5. **Authentication Module**
   - User registration endpoint
   - Login/logout endpoints
   - JWT token management
   - Password reset flow

6. **Products Module**
   - CRUD endpoints for products
   - Category management
   - Product search and filtering
   - Image upload

7. **Admin Dashboard**
   - Basic admin interface
   - Product management UI
   - User management

### Phase 3: E-Commerce Features

8. **Product Configuration**
   - Configuration engine
   - Pricing calculator
   - Variant selection

9. **Shopping Cart**
   - Cart API and persistence
   - Guest cart support
   - Cart merge on login

10. **Checkout & Payments**
    - Checkout flow
    - Stripe integration
    - Order creation
    - Email confirmations

## 🛠 Development Workflow

### Creating New Components

```bash
# Frontend component
# Create in apps/web/components/

# Example: Button component
apps/web/components/ui/button.tsx
```

### Creating New API Endpoints

```bash
# Backend module
cd apps/api/src/modules
npx nest generate module products
npx nest generate controller products
npx nest generate service products
```

### Database Changes

1. Update `packages/database/prisma/schema.prisma`
2. Run `npx pnpm db:push` (dev) or `npx pnpm db:migrate` (prod)
3. Prisma Client will be regenerated automatically

## 📚 Documentation

- **[README.md](README.md)** - Project overview
- **[PRD.md](docs/PRD.md)** - Product requirements
- **[ARCHITECTURE.md](docs/ARCHITECTURE.md)** - System architecture
- **[DATABASE.md](docs/DATABASE.md)** - Database schema
- **[DESIGN-SYSTEM.md](docs/DESIGN-SYSTEM.md)** - Design guidelines
- **[PROGRESS.md](docs/PROGRESS.md)** - Development progress

## 🔧 Troubleshooting

### Dependencies won't install
```bash
# Clear caches and reinstall
rm -rf node_modules pnpm-lock.yaml
npx pnpm install
```

### Prisma errors
```bash
# Regenerate Prisma Client
cd packages/database
npx pnpm db:generate
```

### TypeScript errors in IDE
- Ensure your IDE is using the workspace TypeScript version
- Restart TypeScript server
- For VS Code: Cmd/Ctrl + Shift + P → "TypeScript: Restart TS Server"

### Port already in use
```bash
# Frontend (3000)
lsof -ti:3000 | xargs kill

# Backend (3001)
lsof -ti:3001 | xargs kill
```

## 🎨 Design System

The platform uses a professional design system:

**Brand Colors:**
- Deep Navy: `#10263D`
- Electric Blue: `#1677FF`
- Teal: `#18C9B5`

**Typography:**
- Headings: Manrope (Google Fonts)
- Body: Inter (Google Fonts)

**Responsive Breakpoints:**
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 🧪 Testing (To Be Implemented)

```bash
# Run tests
npx pnpm test

# Run tests in watch mode
npx pnpm test:watch

# Run E2E tests
npx pnpm test:e2e
```

## 📦 Key Dependencies

### Frontend
- Next.js 16 - React framework
- React 19 - UI library
- Tailwind CSS 4 - Styling
- Lucide Icons - Icon library
- Zod - Schema validation
- React Hook Form - Form handling

### Backend
- NestJS 12 - Node.js framework
- Prisma 5 - Database ORM
- Passport - Authentication
- BullMQ - Queue management
- Stripe - Payment processing
- Nodemailer - Email sending

## 🚢 Deployment (To Be Configured)

Deployment guides will be added for:
- Vercel (Frontend)
- Railway/Fly.io (Backend)
- Supabase/Neon (Database)
- AWS S3 (File storage)
- Redis Cloud (Cache/Queue)

## 📞 Support

For issues and questions:
1. Check documentation in `/docs`
2. Review `PROGRESS.md` for current status
3. Check the Prisma schema for database structure
4. Review NestJS and Next.js official documentation

## 🎯 Project Goals

1. **Phase 1 (Current):** Foundation and visual storefront
2. **Phase 2:** Database and product administration
3. **Phase 3:** Product configuration and pricing
4. **Phase 4:** Cart, checkout, and payments
5. **Phase 5:** Customer accounts and order management
6. **Phase 6:** Artwork and personalization
7. **Phase 7:** Supplier fulfillment
8. **Phase 8:** Business features and production hardening

---

**Current Status:** Phase 1 - 60% Complete
**Next Milestone:** Complete UI components and navigation
**Launch Target:** After Phase 8 completion

Happy coding! 🚀
