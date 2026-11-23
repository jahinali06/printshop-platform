# System Architecture

## Overview

The PrintShop Platform uses a modular monolith architecture within a Turborepo monorepo. This approach provides:
- Clear separation of concerns
- Shared code reusability
- Independent deployment capabilities
- Simplified development workflow

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                        Client Layer                          │
├─────────────────────────────────────────────────────────────┤
│  Web Browser (Next.js)  │  Mobile App (Future)              │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ HTTPS/REST
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                     API Gateway Layer                        │
├─────────────────────────────────────────────────────────────┤
│                     NestJS Backend API                       │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐      │
│  │  Auth    │ │ Products │ │  Orders  │ │ Payments │      │
│  │  Module  │ │  Module  │ │  Module  │ │  Module  │      │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘      │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐      │
│  │ Artwork  │ │ Suppliers│ │  Design  │ │  Admin   │      │
│  │  Module  │ │  Module  │ │  Module  │ │  Module  │      │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘      │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                      Service Layer                           │
├─────────────────────────────────────────────────────────────┤
│  Business Logic  │  Validation  │  Price Engine  │  Jobs    │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                     Data Access Layer                        │
├─────────────────────────────────────────────────────────────┤
│                     Prisma ORM Client                        │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                     Persistence Layer                        │
├─────────────────────────────────────────────────────────────┤
│  PostgreSQL  │  Redis Cache  │  S3 Storage  │  Email Queue  │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                   External Services                          │
├─────────────────────────────────────────────────────────────┤
│  Stripe API  │  Supplier APIs  │  Email Service  │  CDN     │
└─────────────────────────────────────────────────────────────┘
```

## Technology Stack

### Frontend (apps/web)
- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **State Management**: React Context + Server Components
- **Forms**: React Hook Form + Zod validation
- **HTTP Client**: Fetch API
- **Icons**: Lucide Icons

### Backend (apps/api)
- **Framework**: NestJS
- **Language**: TypeScript
- **API Style**: REST
- **Documentation**: OpenAPI (Swagger)
- **Validation**: class-validator
- **Authentication**: JWT + Passport
- **File Upload**: Multer
- **Background Jobs**: BullMQ

### Database (packages/database)
- **Database**: PostgreSQL 15+
- **ORM**: Prisma
- **Migrations**: Prisma Migrate
- **Seeding**: Custom seed scripts

### Infrastructure
- **Monorepo**: Turborepo
- **Package Manager**: pnpm
- **Containerization**: Docker
- **Cache**: Redis
- **File Storage**: S3-compatible
- **Email**: SMTP / SendGrid / SES

## Application Structure

### Monorepo Organization

```
printshop-platform/
├── apps/
│   ├── web/                    # Next.js frontend
│   │   ├── app/               # App router pages
│   │   ├── components/        # React components
│   │   ├── lib/               # Utilities and helpers
│   │   └── public/            # Static assets
│   └── api/                    # NestJS backend
│       ├── src/
│       │   ├── modules/       # Feature modules
│       │   ├── common/        # Shared utilities
│       │   ├── config/        # Configuration
│       │   └── main.ts        # Entry point
│       └── test/              # E2E tests
├── packages/
│   ├── database/              # Prisma schema & client
│   │   ├── prisma/
│   │   │   ├── schema.prisma
│   │   │   └── seed.ts
│   │   └── index.ts
│   ├── ui/                    # Shared UI components
│   └── config/                # Shared configuration
└── docs/                      # Documentation
```

## Backend Modules

### Core Modules

#### Auth Module
- User registration
- Login/logout
- Password reset
- JWT token management
- Role-based access control

#### Products Module
- Product CRUD operations
- Category management
- Product variants
- Product options
- Product images
- Search and filtering

#### Orders Module
- Order creation
- Order management
- Order status tracking
- Order history
- Order cancellation

#### Payments Module
- Stripe integration
- Payment processing
- Webhook handling
- Refund processing
- Payment history

#### Artwork Module
- File upload
- Artwork storage
- Approval workflow
- Version management
- Preview generation

#### Design Module
- Design editor backend
- Design storage
- Template management
- Export functionality

#### Suppliers Module
- Supplier management
- Product mapping
- Fulfillment orders
- API integration
- Status tracking

#### Admin Module
- Dashboard metrics
- System management
- User management
- Reporting

### Supporting Modules

#### Notifications Module
- Email notifications
- Background job processing
- Template management
- Delivery tracking

#### Analytics Module
- Event tracking
- Metrics calculation
- Report generation

## Data Flow

### Order Creation Flow

```
1. Customer adds items to cart
   ↓
2. Cart items stored in database
   ↓
3. Customer proceeds to checkout
   ↓
4. Checkout page validates inventory
   ↓
5. Customer submits payment
   ↓
6. Stripe processes payment
   ↓
7. Webhook confirms payment
   ↓
8. Order created in database
   ↓
9. Confirmation email queued
   ↓
10. Order assigned to supplier
```

### Artwork Approval Flow

```
1. Customer uploads artwork
   ↓
2. File stored in S3
   ↓
3. Preview generated
   ↓
4. Artwork marked for review
   ↓
5. Admin reviews artwork
   ↓
6. Approve or reject
   ↓
7. Customer notified
   ↓
8. If approved → Production
   If rejected → Customer re-upload
```

## Security Architecture

### Authentication
- JWT tokens (access + refresh)
- Secure password hashing (bcrypt)
- Session management
- CSRF protection

### Authorization
- Role-based access control (RBAC)
- Route guards
- API endpoint protection
- Resource ownership validation

### Data Security
- Input validation (class-validator)
- SQL injection prevention (Prisma)
- XSS protection
- File upload restrictions
- Rate limiting
- Audit logging

### Payment Security
- PCI DSS compliance
- Stripe hosted checkout
- No card storage
- Webhook signature verification

## Scalability Considerations

### Horizontal Scaling
- Stateless API servers
- Load balancer ready
- Session storage in Redis
- Database connection pooling

### Performance Optimization
- Database indexing
- Query optimization
- API response caching
- CDN for static assets
- Image optimization
- Background job processing

### Database Optimization
- Proper indexing strategy
- Read replicas (future)
- Connection pooling
- Query result caching
- Pagination for large datasets

## Deployment Architecture

### Development Environment
- Local PostgreSQL
- Local Redis
- Local file storage
- Stripe test mode

### Staging Environment
- Managed PostgreSQL
- Managed Redis
- S3-compatible storage
- Stripe test mode
- SSL certificates

### Production Environment
- High-availability PostgreSQL
- Managed Redis cluster
- S3 with CDN
- Stripe live mode
- SSL certificates
- Monitoring and alerts
- Automated backups

## Monitoring & Observability

### Application Monitoring
- Error tracking (Sentry)
- Performance monitoring
- API response times
- Database query performance

### Infrastructure Monitoring
- Server health
- Database metrics
- Redis metrics
- Storage usage

### Business Metrics
- Order volume
- Revenue tracking
- Conversion rates
- Customer analytics

## Disaster Recovery

### Backup Strategy
- Daily database backups
- Point-in-time recovery
- File storage redundancy
- Configuration backups

### Recovery Plan
- Database restore procedures
- Application rollback
- Data integrity verification
- Communication plan

## Future Architecture Enhancements

### Phase 2
- Elasticsearch for advanced search
- GraphQL API option
- Microservices extraction
- Event-driven architecture

### Phase 3
- Kubernetes deployment
- Global CDN
- Multi-region database
- Real-time features (WebSockets)

### Phase 4
- Serverless functions
- Edge computing
- AI/ML services
- Advanced analytics pipeline
