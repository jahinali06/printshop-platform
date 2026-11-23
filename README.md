# PrintShop Platform

A fully functional e-commerce platform for online printing and dropshipping, built with modern technologies.

## 🚀 Current Status

**Phase 1 (Foundation): 100% Complete ✅**
**Phase 2 (Database & Product Administration): 85% Complete ✅**

### What's Working
- ✅ Complete authentication system (JWT + Passport)
- ✅ Products & Categories API (25+ endpoints)
- ✅ User account dashboard with order management
- ✅ 11 frontend pages with responsive design
- ✅ 15+ reusable UI components
- ✅ Full database schema (40+ models)
- ✅ Prisma migrations and seed script

### What's Next
- Database setup (requires PostgreSQL installation)
- Frontend-backend integration
- Shopping cart state management
- Checkout flow
- Payment integration (Stripe)

**📖 See [docs/PROGRESS.md](docs/PROGRESS.md) for detailed progress**

## Overview

This platform combines:
- Commercial printing (similar to VistaPrint)
- Print-on-demand merchandise (similar to Printful)
- Multi-supplier dropshipping (similar to Printify)
- Online product personalization (similar to Canva)
- Complete e-commerce functionality (comparable to Shopify)

## Technology Stack

### Frontend
- **Next.js** (App Router) - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components
- **Lucide Icons** - Icons

### Backend
- **NestJS** - Node.js framework
- **PostgreSQL** - Database
- **Prisma ORM** - Database toolkit
- **REST APIs** - API architecture
- **Redis** - Caching
- **BullMQ** - Background jobs

### Infrastructure
- **Turborepo** - Monorepo management
- **pnpm** - Package manager
- **Docker** - Containerization
- **Stripe** - Payment processing

## Project Structure

```
printshop-platform/
├── apps/
│   ├── web/          # Next.js frontend application
│   └── api/          # NestJS backend API
├── packages/
│   ├── database/     # Prisma schema and client
│   ├── ui/           # Shared UI components
│   └── config/       # Shared configuration
├── docs/             # Project documentation
└── turbo.json        # Turborepo configuration
```

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL 15+
- Redis (optional, for background jobs)
- pnpm (package manager)

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd printshop-platform
```

2. Install dependencies
```bash
npx pnpm install
```

3. Set up environment variables
```bash
cp packages/database/.env.example packages/database/.env
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env
```

4. Set up PostgreSQL database

**📖 See [docs/DATABASE-SETUP.md](docs/DATABASE-SETUP.md) for detailed instructions**

Quick setup:
```bash
# Create PostgreSQL database (see guide for details)
createdb printshop

# Run migrations
cd packages/database
npx pnpm prisma migrate dev --name init

# Seed database with sample data
npx pnpm prisma db seed
```

5. Start development servers
```bash
pnpm dev
```

## Development

### Available Scripts

- `pnpm dev` - Start all applications in development mode
- `pnpm build` - Build all applications
- `pnpm test` - Run all tests
- `pnpm lint` - Lint all code
- `pnpm format` - Format code with Prettier

### Database Management

- `pnpm --filter @printshop/database db:generate` - Generate Prisma client
- `pnpm --filter @printshop/database db:push` - Push schema to database
- `pnpm --filter @printshop/database db:migrate` - Run migrations
- `pnpm --filter @printshop/database db:studio` - Open Prisma Studio
- `pnpm --filter @printshop/database db:seed` - Seed database

## Documentation

Comprehensive documentation is available in the `/docs` directory:

### Getting Started
- **[Database Setup Guide](docs/DATABASE-SETUP.md)** - Complete PostgreSQL setup instructions
- **[Progress Tracker](docs/PROGRESS.md)** - Development progress and next steps

### Project Documentation
- [Product Requirements Document (PRD)](docs/PRD.md)
- [Architecture](docs/ARCHITECTURE.md)
- [Database Schema](docs/DATABASE.md)
- [Design System](docs/DESIGN-SYSTEM.md)

### Implementation Guides (Coming Soon)
- [API Documentation](docs/API.md)
- [Products](docs/PRODUCTS.md)
- [Pricing](docs/PRICING.md)
- [Suppliers](docs/SUPPLIERS.md)
- [Order Lifecycle](docs/ORDER-LIFECYCLE.md)
- [Security](docs/SECURITY.md)
- [Testing](docs/TESTING.md)
- [Deployment](docs/DEPLOYMENT.md)

## License

MIT
