import { Injectable } from '@nestjs/common';
import { Product, Prisma} from '@printshop/database';
import { PrismaService } from '../../common/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async findAll(params: {
    skip?: number;
    take?: number;
    where?: Prisma.ProductWhereInput;
    orderBy?: Prisma.ProductOrderByWithRelationInput;
    include?: Prisma.ProductInclude;
  }): Promise<Product[]> {
    const { skip, take, where, orderBy, include } = params;
    return this.prisma.product.findMany({
      skip,
      take,
      where,
      orderBy,
      include,
    });
  }

  async findOne(id: string, include?: Prisma.ProductInclude): Promise<Product | null> {
    return this.prisma.product.findUnique({
      where: { id },
      include,
    });
  }

  async findBySlug(slug: string, include?: Prisma.ProductInclude): Promise<Product | null> {
    return this.prisma.product.findUnique({
      where: { slug },
      include,
    });
  }

  async create(data: Prisma.ProductCreateInput): Promise<Product> {
    return this.prisma.product.create({
      data,
    });
  }

  async update(id: string, data: Prisma.ProductUpdateInput): Promise<Product> {
    return this.prisma.product.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<Product> {
    return this.prisma.product.delete({
      where: { id },
    });
  }

  async search(query: string, params?: {
    skip?: number;
    take?: number;
    categoryId?: string;
  }): Promise<Product[]> {
    const { skip, take, categoryId } = params || {};

    return this.prisma.product.findMany({
      skip,
      take,
      where: {
        AND: [
          {
            OR: [
              { name: { contains: query, mode: 'insensitive' } },
              { description: { contains: query, mode: 'insensitive' } },
              { sku: { contains: query, mode: 'insensitive' } },
            ],
          },
          categoryId ? { categoryId } : {},
        ],
      },
      include: {
        category: true,
        images: {
          where: { isPrimary: true },
          take: 1,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async count(where?: Prisma.ProductWhereInput): Promise<number> {
    return this.prisma.product.count({ where });
  }
}
