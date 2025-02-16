import { Injectable, Logger, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger('PrismaService');

  async onModuleInit() {
    await this.$connect();
    this.logger.log('✅ Prisma Connected');
  }

  async onModuleDestroy() {
    await this.$disconnect();
    this.logger.log('🛑 Base de datos desconectada');
  }
}
