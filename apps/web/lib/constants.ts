/**
 * Product Categories
 */
export const PRODUCT_CATEGORIES = [
  {
    id: 'business-printing',
    name: 'Business Printing',
    slug: 'business-printing',
    description: 'Professional printing for your business needs',
    icon: 'briefcase',
  },
  {
    id: 'clothing-workwear',
    name: 'Clothing & Workwear',
    slug: 'clothing-workwear',
    description: 'Custom apparel and branded workwear',
    icon: 'shirt',
  },
  {
    id: 'promotional-products',
    name: 'Promotional Products',
    slug: 'promotional-products',
    description: 'Marketing materials and promotional items',
    icon: 'gift',
  },
  {
    id: 'signs-displays',
    name: 'Signs & Displays',
    slug: 'signs-displays',
    description: 'Eye-catching signs and display materials',
    icon: 'billboard',
  },
  {
    id: 'stickers-packaging',
    name: 'Stickers & Packaging',
    slug: 'stickers-packaging',
    description: 'Custom stickers, labels and packaging',
    icon: 'package',
  },
  {
    id: 'personalised-gifts',
    name: 'Personalised Gifts',
    slug: 'personalised-gifts',
    description: 'Unique personalized gifts and items',
    icon: 'heart',
  },
];

/**
 * Site Configuration
 */
export const SITE_CONFIG = {
  name: 'PrintShop Platform',
  description: 'Professional printing services, custom merchandise, and dropshipping for businesses and individuals',
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
};

/**
 * Navigation Links
 */
export const NAV_LINKS = [
  {
    title: 'Products',
    href: '/products',
    children: PRODUCT_CATEGORIES.map(cat => ({
      title: cat.name,
      href: `/products/${cat.slug}`,
      description: cat.description,
    })),
  },
  {
    title: 'Design',
    href: '/design',
  },
  {
    title: 'Business',
    href: '/business',
  },
  {
    title: 'Support',
    href: '/support',
  },
];
