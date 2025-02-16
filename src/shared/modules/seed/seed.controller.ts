import { Controller, Post, Query } from '@nestjs/common';
import { SeedService } from './seed.service';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Post('properties')
  async seedProperties(@Query('count') count: number) {
    const num = Number(count) || 10; // Si no se pasa, genera 10 por defecto
    return this.seedService.seedProperties(num);
  }
}
