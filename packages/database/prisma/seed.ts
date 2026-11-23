import { PrismaClient, ProductType, ProductStatus, CategoryStatus, UserRole } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create admin user
  console.log('Creating admin user...');
  const hashedPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@printshop.com' },
    update: {},
    create: {
      email: 'admin@printshop.com',
      password: hashedPassword,
      firstName: 'Admin',
      lastName: 'User',
      role: UserRole.ADMIN,
    },
  });

  console.log('✓ Admin user created');

  // Create categories
  console.log('Creating categories...');
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'business-printing' },
      update: {},
      create: {
        name: 'Business Printing',
        slug: 'business-printing',
        description: 'Professional printing for your business needs',
        status: CategoryStatus.ACTIVE,
        sortOrder: 1,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'clothing-workwear' },
      update: {},
      create: {
        name: 'Clothing & Workwear',
        slug: 'clothing-workwear',
        description: 'Custom apparel and branded workwear',
        status: CategoryStatus.ACTIVE,
        sortOrder: 2,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'promotional-products' },
      update: {},
      create: {
        name: 'Promotional Products',
        slug: 'promotional-products',
        description: 'Marketing materials and promotional items',
        status: CategoryStatus.ACTIVE,
        sortOrder: 3,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'signs-displays' },
      update: {},
      create: {
        name: 'Signs & Displays',
        slug: 'signs-displays',
        description: 'Eye-catching signs and display materials',
        status: CategoryStatus.ACTIVE,
        sortOrder: 4,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'stickers-packaging' },
      update: {},
      create: {
        name: 'Stickers & Packaging',
        slug: 'stickers-packaging',
        description: 'Custom stickers, labels and packaging',
        status: CategoryStatus.ACTIVE,
        sortOrder: 5,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'personalised-gifts' },
      update: {},
      create: {
        name: 'Personalised Gifts',
        slug: 'personalised-gifts',
        description: 'Unique personalized gifts and items',
        status: CategoryStatus.ACTIVE,
        sortOrder: 6,
      },
    }),
  ]);

  console.log('✓ Categories created');

  // Create suppliers
  console.log('Creating suppliers...');
  const supplier = await prisma.supplier.upsert({
    where: { code: 'PRINT001' },
    update: {},
    create: {
      name: 'Print & Design Co',
      code: 'PRINT001',
      contactName: 'John Smith',
      email: 'orders@printdesign.co.uk',
      phone: '+44 20 1234 5678',
      productionDays: 3,
    },
  });

  console.log('✓ Suppliers created');

  // Create products
  console.log('Creating products...');

  // Business Cards
  const businessCards = await prisma.product.create({
    data: {
      sku: 'BC-001',
      name: 'Premium Business Cards',
      slug: 'premium-business-cards',
      description: 'Professional business cards on premium card stock',
      shortDesc: 'Make a lasting impression with premium business cards',
      categoryId: categories[0].id,
      type: ProductType.BUSINESS_PRINTING,
      status: ProductStatus.ACTIVE,
      basePrice: 15.99,
      requiresArtwork: true,
      allowsDesign: true,
      minQuantity: 250,
      productionDays: 3,
      images: {
        create: [
          {
            url: '/products/business-cards-1.jpg',
            altText: 'Premium Business Cards',
            isPrimary: true,
            sortOrder: 1,
          },
        ],
      },
      options: {
        create: [
          {
            name: 'size',
            label: 'Size',
            type: 'SELECT',
            required: true,
            sortOrder: 1,
            values: {
              create: [
                { value: 'standard', label: 'Standard (85x55mm)', priceDelta: 0, sortOrder: 1 },
                { value: 'square', label: 'Square (55x55mm)', priceDelta: 2.0, sortOrder: 2 },
              ],
            },
          },
          {
            name: 'finish',
            label: 'Finish',
            type: 'SELECT',
            required: true,
            sortOrder: 2,
            values: {
              create: [
                { value: 'matt', label: 'Matt Lamination', priceDelta: 0, sortOrder: 1 },
                { value: 'gloss', label: 'Gloss Lamination', priceDelta: 1.5, sortOrder: 2 },
                { value: 'softtouch', label: 'Soft Touch', priceDelta: 3.0, sortOrder: 3 },
              ],
            },
          },
          {
            name: 'quantity',
            label: 'Quantity',
            type: 'SELECT',
            required: true,
            sortOrder: 3,
            values: {
              create: [
                { value: '250', label: '250', priceDelta: 0, sortOrder: 1 },
                { value: '500', label: '500', priceDelta: 5.0, sortOrder: 2 },
                { value: '1000', label: '1000', priceDelta: 8.0, sortOrder: 3 },
              ],
            },
          },
        ],
      },
    },
  });

  // Flyers A5
  await prisma.product.create({
    data: {
      sku: 'FLY-A5',
      name: 'A5 Flyers',
      slug: 'a5-flyers',
      description: 'High-quality A5 flyers for effective marketing',
      shortDesc: 'Perfect for promotions and events',
      categoryId: categories[0].id,
      type: ProductType.BUSINESS_PRINTING,
      status: ProductStatus.ACTIVE,
      basePrice: 25.99,
      requiresArtwork: true,
      allowsDesign: true,
      minQuantity: 100,
      productionDays: 3,
      images: {
        create: [
          {
            url: '/products/flyers-a5-1.jpg',
            altText: 'A5 Flyers',
            isPrimary: true,
            sortOrder: 1,
          },
        ],
      },
      options: {
        create: [
          {
            name: 'paper',
            label: 'Paper Type',
            type: 'SELECT',
            required: true,
            sortOrder: 1,
            values: {
              create: [
                { value: '130gsm-gloss', label: '130gsm Gloss', priceDelta: 0, sortOrder: 1 },
                { value: '170gsm-gloss', label: '170gsm Gloss', priceDelta: 3.0, sortOrder: 2 },
              ],
            },
          },
          {
            name: 'quantity',
            label: 'Quantity',
            type: 'SELECT',
            required: true,
            sortOrder: 2,
            values: {
              create: [
                { value: '100', label: '100', priceDelta: 0, sortOrder: 1 },
                { value: '250', label: '250', priceDelta: 8.0, sortOrder: 2 },
                { value: '500', label: '500', priceDelta: 12.0, sortOrder: 3 },
                { value: '1000', label: '1000', priceDelta: 18.0, sortOrder: 4 },
              ],
            },
          },
        ],
      },
    },
  });

  // Custom T-Shirts
  await prisma.product.create({
    data: {
      sku: 'TS-001',
      name: 'Custom T-Shirts',
      slug: 'custom-t-shirts',
      description: 'Premium cotton t-shirts with custom printing',
      shortDesc: 'High-quality custom printed t-shirts',
      categoryId: categories[1].id,
      type: ProductType.CLOTHING,
      status: ProductStatus.ACTIVE,
      basePrice: 12.99,
      requiresArtwork: true,
      allowsDesign: true,
      minQuantity: 10,
      productionDays: 5,
      images: {
        create: [
          {
            url: '/products/t-shirts-1.jpg',
            altText: 'Custom T-Shirts',
            isPrimary: true,
            sortOrder: 1,
          },
        ],
      },
      options: {
        create: [
          {
            name: 'size',
            label: 'Size',
            type: 'SELECT',
            required: true,
            sortOrder: 1,
            values: {
              create: [
                { value: 's', label: 'Small', priceDelta: 0, sortOrder: 1 },
                { value: 'm', label: 'Medium', priceDelta: 0, sortOrder: 2 },
                { value: 'l', label: 'Large', priceDelta: 0, sortOrder: 3 },
                { value: 'xl', label: 'XL', priceDelta: 1.0, sortOrder: 4 },
                { value: 'xxl', label: '2XL', priceDelta: 2.0, sortOrder: 5 },
              ],
            },
          },
          {
            name: 'color',
            label: 'Color',
            type: 'COLOR',
            required: true,
            sortOrder: 2,
            values: {
              create: [
                { value: 'white', label: 'White', priceDelta: 0, sortOrder: 1 },
                { value: 'black', label: 'Black', priceDelta: 0, sortOrder: 2 },
                { value: 'navy', label: 'Navy', priceDelta: 0, sortOrder: 3 },
                { value: 'red', label: 'Red', priceDelta: 0, sortOrder: 4 },
              ],
            },
          },
          {
            name: 'quantity',
            label: 'Quantity',
            type: 'SELECT',
            required: true,
            sortOrder: 3,
            values: {
              create: [
                { value: '10', label: '10', priceDelta: 0, sortOrder: 1 },
                { value: '25', label: '25', priceDelta: -1.0, sortOrder: 2 },
                { value: '50', label: '50', priceDelta: -2.0, sortOrder: 3 },
                { value: '100', label: '100', priceDelta: -3.0, sortOrder: 4 },
              ],
            },
          },
        ],
      },
    },
  });

  // Promotional Mugs
  await prisma.product.create({
    data: {
      sku: 'MUG-001',
      name: 'Promotional Mugs',
      slug: 'promotional-mugs',
      description: 'Ceramic mugs with full-color printing',
      shortDesc: 'Perfect for corporate gifts and promotions',
      categoryId: categories[2].id,
      type: ProductType.PROMOTIONAL,
      status: ProductStatus.ACTIVE,
      basePrice: 8.99,
      requiresArtwork: true,
      allowsDesign: true,
      minQuantity: 25,
      productionDays: 7,
      images: {
        create: [
          {
            url: '/products/mugs-1.jpg',
            altText: 'Promotional Mugs',
            isPrimary: true,
            sortOrder: 1,
          },
        ],
      },
      options: {
        create: [
          {
            name: 'type',
            label: 'Mug Type',
            type: 'SELECT',
            required: true,
            sortOrder: 1,
            values: {
              create: [
                { value: 'standard', label: 'Standard (11oz)', priceDelta: 0, sortOrder: 1 },
                { value: 'large', label: 'Large (15oz)', priceDelta: 1.5, sortOrder: 2 },
              ],
            },
          },
          {
            name: 'quantity',
            label: 'Quantity',
            type: 'SELECT',
            required: true,
            sortOrder: 2,
            values: {
              create: [
                { value: '25', label: '25', priceDelta: 0, sortOrder: 1 },
                { value: '50', label: '50', priceDelta: -1.0, sortOrder: 2 },
                { value: '100', label: '100', priceDelta: -2.0, sortOrder: 3 },
              ],
            },
          },
        ],
      },
    },
  });

  // PVC Banners
  await prisma.product.create({
    data: {
      sku: 'BAN-001',
      name: 'PVC Banners',
      slug: 'pvc-banners',
      description: 'Durable PVC banners for indoor and outdoor use',
      shortDesc: 'Weather-resistant banners in any size',
      categoryId: categories[3].id,
      type: ProductType.SIGNS_DISPLAYS,
      status: ProductStatus.ACTIVE,
      basePrice: 35.99,
      requiresArtwork: true,
      allowsDesign: false,
      minQuantity: 1,
      productionDays: 3,
      images: {
        create: [
          {
            url: '/products/banners-1.jpg',
            altText: 'PVC Banners',
            isPrimary: true,
            sortOrder: 1,
          },
        ],
      },
      options: {
        create: [
          {
            name: 'size',
            label: 'Size',
            type: 'SELECT',
            required: true,
            sortOrder: 1,
            values: {
              create: [
                { value: '1x1m', label: '1m x 1m', priceDelta: 0, sortOrder: 1 },
                { value: '2x1m', label: '2m x 1m', priceDelta: 15.0, sortOrder: 2 },
                { value: '3x1m', label: '3m x 1m', priceDelta: 25.0, sortOrder: 3 },
                { value: '4x1m', label: '4m x 1m', priceDelta: 35.0, sortOrder: 4 },
              ],
            },
          },
          {
            name: 'finishing',
            label: 'Finishing',
            type: 'SELECT',
            required: true,
            sortOrder: 2,
            values: {
              create: [
                { value: 'eyelets', label: 'Eyelets', priceDelta: 0, sortOrder: 1 },
                { value: 'pole-pockets', label: 'Pole Pockets', priceDelta: 5.0, sortOrder: 2 },
              ],
            },
          },
        ],
      },
    },
  });

  // Custom Stickers
  await prisma.product.create({
    data: {
      sku: 'STK-001',
      name: 'Custom Stickers',
      slug: 'custom-stickers',
      description: 'Die-cut stickers in any shape',
      shortDesc: 'High-quality vinyl stickers',
      categoryId: categories[4].id,
      type: ProductType.STICKERS_PACKAGING,
      status: ProductStatus.ACTIVE,
      basePrice: 18.99,
      requiresArtwork: true,
      allowsDesign: true,
      minQuantity: 50,
      productionDays: 5,
      images: {
        create: [
          {
            url: '/products/stickers-1.jpg',
            altText: 'Custom Stickers',
            isPrimary: true,
            sortOrder: 1,
          },
        ],
      },
      options: {
        create: [
          {
            name: 'material',
            label: 'Material',
            type: 'SELECT',
            required: true,
            sortOrder: 1,
            values: {
              create: [
                { value: 'white-vinyl', label: 'White Vinyl', priceDelta: 0, sortOrder: 1 },
                { value: 'clear-vinyl', label: 'Clear Vinyl', priceDelta: 2.0, sortOrder: 2 },
                { value: 'holographic', label: 'Holographic', priceDelta: 5.0, sortOrder: 3 },
              ],
            },
          },
          {
            name: 'quantity',
            label: 'Quantity',
            type: 'SELECT',
            required: true,
            sortOrder: 2,
            values: {
              create: [
                { value: '50', label: '50', priceDelta: 0, sortOrder: 1 },
                { value: '100', label: '100', priceDelta: 5.0, sortOrder: 2 },
                { value: '250', label: '250', priceDelta: 10.0, sortOrder: 3 },
                { value: '500', label: '500', priceDelta: 15.0, sortOrder: 4 },
              ],
            },
          },
        ],
      },
    },
  });

  console.log('✓ Products created');

  // Link products to suppliers
  console.log('Creating supplier product mappings...');
  await prisma.supplierProduct.create({
    data: {
      supplierId: supplier.id,
      productId: businessCards.id,
      supplierSku: 'BC-PREM-001',
      productionCost: 8.99,
      productionDays: 3,
      minimumQuantity: 250,
    },
  });

  console.log('✓ Supplier mappings created');

  console.log('✅ Database seeding completed!');
  console.log(`\n📊 Summary:`);
  console.log(`- 1 admin user created (admin@printshop.com / admin123)`);
  console.log(`- ${categories.length} categories created`);
  console.log(`- 6 products created with options`);
  console.log(`- 1 supplier created with product mappings`);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:');
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
