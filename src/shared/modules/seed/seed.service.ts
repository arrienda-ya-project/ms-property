import { Injectable, Logger } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import { PrismaService } from '../..';
import { Prisma } from '@prisma/client';

@Injectable()
export class SeedService {
  private readonly logger = new Logger('SeedService');

  constructor(private readonly prisma: PrismaService) {}

  async seedProperties(count: number) {
    this.logger.log(`🌱 Generando ${count} propiedades falsas...`);

    const properties: Prisma.PropertyCreateManyInput[] = [];

    for (let i = 0; i < count; i++) {
      properties.push({
        id: faker.string.uuid(),
        title: faker.lorem.words(3),
        description: faker.lorem.sentence(),
        price: faker.number.float({ min: 50000, max: 500000, fractionDigits: 2 }),
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
      });
    }

    await this.prisma.property.createMany({ data: properties });

    this.logger.log('✅ Seed de propiedades completado!');
    return properties;
  }
}
