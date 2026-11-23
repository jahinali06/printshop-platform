import { Injectable } from '@nestjs/common';
import { Category, Prisma } from '@printshop/database';
import { PrismaService } from '../../common/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async findAll(params?: {
    skip?: number;
    take?: number;
    where?: Prisma.CategoryWhereInput;
    orderBy?: Prisma.CategoryOrderByWithRelationInput;
    include?: Prisma.CategoryInclude;
  }): Promise<Category[]> {
    const { skip, take, where, orderBy, include } = params || {};
    return this.prisma.category.findMany({
      skip,
      take,
      where,
      orderBy: orderBy || { sortOrder: 'asc' },
      include,
    });
  }

  async findOne(id: string, include?: Prisma.CategoryInclude): Promise<Category | null> {
    return this.prisma.category.findUnique({
      where: { id },
      include,
    });
  }

  async findBySlug(slug: string, include?: Prisma.CategoryInclude): Promise<Category | null> {
    return this.prisma.category.findUnique({
      where: { slug },
      include,
    });
  }

  async create(data: Prisma.CategoryCreateInput): Promise<Category> {
    return this.prisma.category.create({
      data,
    });
  }

  async update(id: string, data: Prisma.CategoryUpdateInput): Promise<Category> {
    return this.prisma.category.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<Category> {
    return this.prisma.category.delete({
      where: { id },
    });
  }

  async getTree(): Promise<Category[]> {
    // Get all root categories with their children
    return this.prisma.category.findMany({
      where: {
        parentId: null,
      },
      include: {
        children: {
          orderBy: {
            sortOrder: 'asc',
          },
        },
      },
      orderBy: {
        sortOrder: 'asc',
      },
    });
  }
}
