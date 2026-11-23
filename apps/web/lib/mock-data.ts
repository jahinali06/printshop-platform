// Mock data for development when API is unavailable

export const mockProducts = [
  {
    id: '1',
    name: 'Business Cards',
    slug: 'business-cards',
    sku: 'BC-001',
    description: 'Professional business cards with premium finishes',
    longDescription: 'High-quality business cards printed on premium card stock. Choose from various finishes including matte, gloss, and soft-touch. Perfect for making a lasting impression.',
    basePrice: '25.00',
    status: 'ACTIVE',
    requiresArtwork: true,
    category: { id: '1', name: 'Business Stationery', slug: 'business-stationery' },
    images: [
      { id: '1', url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800', alt: 'Business Cards' }
    ],
    options: [
      {
        id: '1',
        name: 'Quantity',
        type: 'SELECT',
        values: [
          { id: '1', value: '100', priceModifier: '0' },
          { id: '2', value: '250', priceModifier: '15' },
          { id: '3', value: '500', priceModifier: '25' },
          { id: '4', value: '1000', priceModifier: '40' }
        ]
      },
      {
        id: '2',
        name: 'Finish',
        type: 'SELECT',
        values: [
          { id: '5', value: 'Matte', priceModifier: '0' },
          { id: '6', value: 'Gloss', priceModifier: '5' },
          { id: '7', value: 'Soft Touch', priceModifier: '10' }
        ]
      }
    ]
  },
  {
    id: '2',
    name: 'Flyers A5',
    slug: 'flyers-a5',
    sku: 'FLY-A5-001',
    description: 'Eye-catching A5 flyers for promotions and events',
    longDescription: 'High-impact A5 flyers perfect for promoting your business, events, or special offers. Printed on quality paper with vibrant colors.',
    basePrice: '35.00',
    status: 'ACTIVE',
    requiresArtwork: true,
    category: { id: '2', name: 'Marketing Materials', slug: 'marketing-materials' },
    images: [
      { id: '2', url: 'https://images.unsplash.com/photo-1546975490-e8b92a360b24?w=800', alt: 'Flyers' }
    ],
    options: [
      {
        id: '3',
        name: 'Quantity',
        type: 'SELECT',
        values: [
          { id: '8', value: '100', priceModifier: '0' },
          { id: '9', value: '250', priceModifier: '20' },
          { id: '10', value: '500', priceModifier: '35' },
          { id: '11', value: '1000', priceModifier: '60' }
        ]
      },
      {
        id: '4',
        name: 'Paper Weight',
        type: 'SELECT',
        values: [
          { id: '12', value: '130gsm', priceModifier: '0' },
          { id: '13', value: '170gsm', priceModifier: '8' },
          { id: '14', value: '250gsm', priceModifier: '15' }
        ]
      }
    ]
  },
  {
    id: '3',
    name: 'Branded T-Shirts',
    slug: 'branded-t-shirts',
    sku: 'TSHIRT-001',
    description: 'Custom printed t-shirts with your logo or design',
    longDescription: 'Premium quality t-shirts with your custom design. Available in multiple colors and sizes. Perfect for events, teams, or promotional giveaways.',
    basePrice: '12.99',
    status: 'ACTIVE',
    requiresArtwork: true,
    category: { id: '3', name: 'Promotional Products', slug: 'promotional-products' },
    images: [
      { id: '3', url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800', alt: 'T-Shirts' }
    ],
    options: [
      {
        id: '5',
        name: 'Size',
        type: 'SELECT',
        values: [
          { id: '15', value: 'S', priceModifier: '0' },
          { id: '16', value: 'M', priceModifier: '0' },
          { id: '17', value: 'L', priceModifier: '0' },
          { id: '18', value: 'XL', priceModifier: '2' },
          { id: '19', value: 'XXL', priceModifier: '4' }
        ]
      },
      {
        id: '6',
        name: 'Color',
        type: 'SELECT',
        values: [
          { id: '20', value: 'White', priceModifier: '0' },
          { id: '21', value: 'Black', priceModifier: '0' },
          { id: '22', value: 'Navy', priceModifier: '1' },
          { id: '23', value: 'Red', priceModifier: '1' }
        ]
      }
    ]
  },
  {
    id: '4',
    name: 'Banners & Posters',
    slug: 'banners-posters',
    sku: 'BAN-001',
    description: 'Large format banners and posters for maximum impact',
    longDescription: 'Professional quality banners and posters in various sizes. Weather-resistant options available. Perfect for events, retail displays, and outdoor advertising.',
    basePrice: '45.00',
    status: 'ACTIVE',
    requiresArtwork: true,
    category: { id: '4', name: 'Large Format Printing', slug: 'large-format' },
    images: [
      { id: '4', url: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800', alt: 'Banners' }
    ],
    options: [
      {
        id: '7',
        name: 'Size',
        type: 'SELECT',
        values: [
          { id: '24', value: 'A2', priceModifier: '0' },
          { id: '25', value: 'A1', priceModifier: '15' },
          { id: '26', value: 'A0', priceModifier: '30' },
          { id: '27', value: 'Custom', priceModifier: '50' }
        ]
      },
      {
        id: '8',
        name: 'Material',
        type: 'SELECT',
        values: [
          { id: '28', value: 'Paper', priceModifier: '0' },
          { id: '29', value: 'Vinyl', priceModifier: '20' },
          { id: '30', value: 'Fabric', priceModifier: '35' }
        ]
      }
    ]
  },
  {
    id: '5',
    name: 'Mugs & Drinkware',
    slug: 'mugs-drinkware',
    sku: 'MUG-001',
    description: 'Custom printed mugs and drinkware items',
    longDescription: 'High-quality ceramic mugs and drinkware with your custom design. Dishwasher safe and durable. Great for corporate gifts or promotional items.',
    basePrice: '8.99',
    status: 'ACTIVE',
    requiresArtwork: true,
    category: { id: '3', name: 'Promotional Products', slug: 'promotional-products' },
    images: [
      { id: '5', url: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=800', alt: 'Mugs' }
    ],
    options: [
      {
        id: '9',
        name: 'Type',
        type: 'SELECT',
        values: [
          { id: '31', value: 'Standard Mug', priceModifier: '0' },
          { id: '32', value: 'Travel Mug', priceModifier: '5' },
          { id: '33', value: 'Water Bottle', priceModifier: '8' }
        ]
      },
      {
        id: '10',
        name: 'Color',
        type: 'SELECT',
        values: [
          { id: '34', value: 'White', priceModifier: '0' },
          { id: '35', value: 'Black', priceModifier: '1' },
          { id: '36', value: 'Blue', priceModifier: '1' }
        ]
      }
    ]
  },
  {
    id: '6',
    name: 'Letterheads',
    slug: 'letterheads',
    sku: 'LH-001',
    description: 'Professional letterheads for business correspondence',
    longDescription: 'Premium letterheads printed on high-quality paper. Perfect for official correspondence and maintaining brand consistency in all your communications.',
    basePrice: '30.00',
    status: 'ACTIVE',
    requiresArtwork: true,
    category: { id: '1', name: 'Business Stationery', slug: 'business-stationery' },
    images: [
      { id: '6', url: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800', alt: 'Letterheads' }
    ],
    options: [
      {
        id: '11',
        name: 'Quantity',
        type: 'SELECT',
        values: [
          { id: '37', value: '50', priceModifier: '0' },
          { id: '38', value: '100', priceModifier: '10' },
          { id: '39', value: '250', priceModifier: '20' },
          { id: '40', value: '500', priceModifier: '35' }
        ]
      },
      {
        id: '12',
        name: 'Paper Quality',
        type: 'SELECT',
        values: [
          { id: '41', value: 'Standard', priceModifier: '0' },
          { id: '42', value: 'Premium', priceModifier: '10' },
          { id: '43', value: 'Luxury', priceModifier: '20' }
        ]
      }
    ]
  }
];

export const mockUser = {
  id: 'user-1',
  email: 'admin@printshop.com',
  firstName: 'Admin',
  lastName: 'User',
  role: 'ADMIN',
  status: 'ACTIVE',
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date()
};

export const mockCategories = [
  { id: '1', name: 'Business Stationery', slug: 'business-stationery', description: 'Professional business cards, letterheads, and more' },
  { id: '2', name: 'Marketing Materials', slug: 'marketing-materials', description: 'Flyers, brochures, and promotional print' },
  { id: '3', name: 'Promotional Products', slug: 'promotional-products', description: 'Branded merchandise and gifts' },
  { id: '4', name: 'Large Format Printing', slug: 'large-format', description: 'Banners, posters, and signage' },
  { id: '5', name: 'Packaging', slug: 'packaging', description: 'Custom boxes and packaging solutions' },
  { id: '6', name: 'Apparel', slug: 'apparel', description: 'Custom clothing and workwear' }
];
