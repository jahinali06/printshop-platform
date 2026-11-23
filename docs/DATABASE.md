# Database Schema Documentation

## Overview

The PrintShop Platform uses PostgreSQL as its primary database, managed through Prisma ORM. The schema is designed to support:
- Multi-tenant business accounts
- Complex product configurations
- Multi-supplier fulfillment
- Artwork and design management
- Complete order lifecycle tracking
- Audit and compliance

## Entity Relationship Overview

### Core Domains

1. **Users & Organizations** - Authentication, user management, business accounts
2. **Products** - Catalogue, variants, options, pricing
3. **Shopping** - Carts, quotes, discounts
4. **Orders** - Order processing, payments, refunds
5. **Artwork & Design** - File management, design projects, approvals
6. **Fulfillment** - Suppliers, production, shipping
7. **System** - Notifications, audit logs, webhooks

## Detailed Schema

### 1. Users & Authentication

#### User
- Primary user account table
- Supports customers, admins, and staff
- Secure password storage
- Status management (active, inactive, suspended)

**Key Relationships:**
- Has many: Addresses, Carts, Orders, Designs, Artwork
- Belongs to many: Organizations (through OrganisationMember)

#### Organisation
- Business account support
- Company information
- VAT and billing details

**Key Relationships:**
- Has many: OrganisationMembers, Orders, ArtworkFiles

#### OrganisationMember
- Join table for user-organization relationships
- Role-based permissions (Owner, Admin, Member)
- Multi-user business accounts

#### Address
- Billing and shipping addresses
- Supports multiple addresses per user
- Default address selection
- UK address format

**Fields:**
- firstName, lastName, company
- line1, line2, city, county, postcode, country
- phone, type (billing/shipping/both)

### 2. Product Catalogue

#### Category
- Hierarchical category structure
- Self-referencing parent-child relationship
- SEO metadata
- Status and sort order

#### Product
- Core product information
- Product type classification
- Base pricing
- Tax configuration
- Artwork and design requirements
- Production lead times
- SEO optimization

**Key Configuration:**
- sku, name, slug, description
- basePrice, taxRate
- requiresArtwork, allowsDesign
- minQuantity, maxQuantity
- productionDays

**Relationships:**
- Belongs to: Category
- Has many: Images, Variants, Options, PricingRules

#### ProductImage
- Multiple images per product
- Primary image designation
- Sort order
- Alt text for accessibility

#### ProductVariant
- Size, color, or other variations
- Separate SKU
- Price deltas
- Stock tracking
- Availability status

#### ProductOption
- Configurable product options
- Multiple option types (select, text, number, color, size, material, finish)
- Required vs optional
- Sort order

#### OptionValue
- Predefined values for select options
- Price adjustments
- Availability per value

### 3. Suppliers & Fulfillment

#### Supplier
- Supplier information
- Manual or API-based
- Contact details
- API credentials
- Production lead times
- Status management

#### SupplierProduct
- Product-to-supplier mapping
- Supplier SKU mapping
- Production costs
- Production times
- Minimum quantities
- Priority ordering

**Purpose:**
- Enables multi-supplier support
- Allows supplier selection based on cost, speed, or availability
- Tracks supplier-specific information

### 4. Pricing

#### PricingRule
- Flexible pricing strategies
- Fixed, quantity-based, or dynamic
- Markup configuration
- Time-based validity
- Active/inactive status

#### QuantityTier
- Volume-based pricing
- Min/max quantity ranges
- Tier-specific prices

**Example:**
```
1-50 units: £5.00 each
51-100 units: £4.50 each
101-500 units: £4.00 each
500+ units: £3.50 each
```

### 5. Shopping Cart & Quotes

#### Cart
- Persistent shopping baskets
- Guest and registered user support
- Session-based for guests
- Expiration management
- Status tracking (active, abandoned, converted)

#### CartItem
- Product selections
- Quantity
- Configuration JSON (selected options)
- Price snapshots
- Timestamps for cart abandonment tracking

#### Quote
- Formal price quotations
- Quote number generation
- Validity period
- Status workflow (draft, sent, accepted, rejected, expired)
- Total calculations with tax

#### QuoteItem
- Individual quoted items
- Configuration snapshot
- Pricing snapshot
- Production time estimates

### 6. Orders & Payments

#### Order
- Complete order information
- Unique order number
- Customer and organization reference
- Billing and shipping addresses
- Comprehensive status tracking
- Payment status
- Financial breakdown (subtotal, tax, shipping, discounts, total)
- Delivery estimates
- Notes (customer and admin)

**Status Flow:**
```
PENDING_PAYMENT → PAID → PROCESSING → ARTWORK_REQUIRED →
ARTWORK_APPROVED → IN_PRODUCTION → DISPATCHED → DELIVERED
```

**Alternative Flows:**
- CANCELLED
- REFUNDED
- FAILED

#### OrderItem
- Line items in an order
- Product reference
- Quantity and configuration
- Price snapshots (immutable)
- Tax calculation
- Individual item status
- Production tracking

#### Payment
- Payment transaction records
- Stripe integration
- Amount and currency
- Payment method
- Status tracking
- Failure reasons
- Metadata storage

#### Refund
- Refund requests and processing
- Refund reasons
- Stripe refund tracking
- Admin notes
- Processing audit trail

### 7. Artwork & Design

#### ArtworkFile
- Uploaded customer artwork
- File storage references (S3 URLs)
- File metadata (name, size, type)
- Approval workflow
- Review notes
- Organization sharing

**Status Flow:**
```
UPLOADED → PENDING_REVIEW → APPROVED/REJECTED → PRINT_READY
```

#### ArtworkProof
- Proof versions for approval
- Proof URLs
- Version tracking
- Approval notes

#### DesignProject
- Customer-created designs
- Design editor sessions
- Project organization
- Status tracking (draft, saved, submitted)

#### DesignVersion
- Version history for designs
- Design data (JSON)
- Export URLs
- Automatic versioning

#### DesignTemplate
- Pre-made design templates
- Category organization
- Product type association
- Public/private visibility

### 8. Fulfillment & Shipping

#### FulfilmentOrder
- Supplier fulfillment tracking
- Order-to-supplier assignment
- Supplier order references
- Production timeline
- Status workflow

**Status Flow:**
```
PENDING → ASSIGNED → SUBMITTED → IN_PRODUCTION →
COMPLETED/FAILED/CANCELLED
```

#### FulfilmentItem
- Individual items in fulfillment order
- Quantity tracking
- Production cost tracking

#### Shipment
- Shipping information
- Carrier details
- Tracking numbers and URLs
- Delivery status
- Timestamps (shipped, delivered)

#### TrackingEvent
- Shipment tracking history
- Status updates
- Location tracking
- Event timestamps

### 9. Promotions & Discounts

#### Promotion
- Marketing promotions
- Promotion types (percentage, fixed amount, free shipping)
- Minimum order requirements
- Maximum discount caps
- Validity periods
- Status management

#### DiscountCode
- Coupon codes
- Usage limits
- Usage tracking
- Code activation

**Example:**
```sql
-- Promotion: 10% off orders over £50
type: PERCENTAGE
value: 10.00
minOrder: 50.00

-- DiscountCode: SAVE10
code: "SAVE10"
usageLimit: 100
usageCount: 23
isActive: true
```

### 10. Notifications

#### Notification
- Transactional notifications
- Email tracking
- Status monitoring (pending, sent, failed)
- Metadata storage
- Send timestamps

**Notification Types:**
- ORDER_CONFIRMATION
- PAYMENT_CONFIRMED
- ARTWORK_REQUIRED
- ARTWORK_APPROVED
- ARTWORK_REJECTED
- ORDER_DISPATCHED
- ORDER_DELIVERED
- REFUND_PROCESSED

### 11. System & Audit

#### AuditLog
- Comprehensive audit trail
- User actions
- Order changes
- Entity tracking
- IP address and user agent
- Change snapshots (JSON)

**Audit Actions:**
- CREATE, UPDATE, DELETE
- LOGIN, LOGOUT
- PAYMENT, REFUND
- STATUS_CHANGE

#### WebhookEvent
- Incoming webhook tracking (Stripe, suppliers)
- Event storage
- Retry management
- Error logging
- Processing status

## Indexing Strategy

### Primary Indexes
- All `id` fields (primary keys)
- Unique constraints on:
  - User.email
  - Product.sku, Product.slug
  - Category.slug
  - Order.orderNumber
  - Payment.stripePaymentId
  - Refund.stripeRefundId
  - DiscountCode.code

### Performance Indexes
- User.role, User.email
- Product.categoryId, Product.status, Product.type, Product.slug
- Order.userId, Order.status, Order.paymentStatus, Order.orderNumber
- OrderItem.orderId, OrderItem.productId, OrderItem.status
- Cart.userId, Cart.sessionId, Cart.status
- Payment.orderId, Payment.status
- Shipment.trackingNumber, Shipment.status
- ArtworkFile.orderItemId, ArtworkFile.userId, ArtworkFile.status
- FulfilmentOrder.orderId, FulfilmentOrder.supplierId
- Notification.userId, Notification.type, Notification.status
- AuditLog.userId, AuditLog.orderId, AuditLog.createdAt

### Composite Indexes
- OrganisationMember (organisationId, userId) - unique
- SupplierProduct (supplierId, productId) - unique

## Data Types

### Financial Data
- **Decimal(10, 2)** for all monetary values
- Prevents floating-point precision issues
- Supports up to £99,999,999.99

### JSON Fields
Used for flexible, schemaless data:
- CartItem.configuration - Selected product options
- OrderItem.configuration - Immutable order configuration
- DesignVersion.designData - Design editor state
- Payment.metadata - Additional payment data
- AuditLog.changes - Change tracking

### Timestamps
- `createdAt` - Record creation
- `updatedAt` - Last modification (auto-updated)
- Custom timestamps: sentAt, shippedAt, deliveredAt, etc.

## Relationships

### One-to-Many
- User → Addresses
- User → Orders
- Product → ProductImages
- Order → OrderItems
- Order → Payments

### Many-to-Many
- Users ↔ Organisations (through OrganisationMember)
- Products ↔ Suppliers (through SupplierProduct)

### Self-Referencing
- Category → parent Category

## Cascading Deletes

**Cascade on Delete:**
- Deleting a User cascades to Addresses, OrganisationMembers
- Deleting a Product cascades to ProductImages, ProductVariants, ProductOptions
- Deleting an Order cascades to OrderItems
- Deleting a Cart cascades to CartItems

**Protected Deletes:**
- Cannot delete Product if referenced by Orders
- Cannot delete Supplier if has active FulfilmentOrders

## Migration Strategy

### Development
```bash
npx prisma db push          # Sync schema without migrations
npx prisma studio           # GUI for data inspection
```

### Production
```bash
npx prisma migrate deploy   # Apply pending migrations
npx prisma generate         # Generate Prisma Client
```

### Creating Migrations
```bash
npx prisma migrate dev --name descriptive_migration_name
```

## Seeding

Seed data includes:
- Admin user
- Product categories
- Sample products
- Sample suppliers
- Design templates
- Pricing rules

```bash
npx pnpm --filter @printshop/database db:seed
```

## Backup & Recovery

### Backup Strategy
- Daily automated backups
- Point-in-time recovery (PITR)
- Retention: 30 days

### Critical Tables (Priority Backup)
1. orders, order_items
2. payments, refunds
3. users, organisations
4. artwork_files, design_projects

## Performance Considerations

### Query Optimization
- Use Prisma's query optimization
- Leverage select/include strategically
- Implement pagination for large datasets
- Use database views for complex reports

### Connection Pooling
```typescript
new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
  log: ['query', 'error', 'warn'],
})
```

## Security

### Access Control
- Row-level security for multi-tenant isolation
- Prisma middleware for authorization
- Audit logging for sensitive operations

### Data Privacy
- Password hashing (never store plain text)
- PCI compliance (no card data storage)
- GDPR compliance (data export, deletion)

## Future Enhancements

- Full-text search indexes (PostgreSQL tsvector)
- Materialized views for reporting
- Partitioning for large tables (orders, audit_logs)
- Read replicas for scaling
- TimescaleDB for time-series data
