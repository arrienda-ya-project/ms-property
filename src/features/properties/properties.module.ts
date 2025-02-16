import { Module } from '@nestjs/common';
import { PropertiesService } from './properties.service';
import { PropertiesController } from './properties.controller';
import { PrismaService } from 'src/shared';

@Module({
  controllers: [PropertiesController],
  providers: [PropertiesService,PrismaService],
})
export class PropertiesModule {}
