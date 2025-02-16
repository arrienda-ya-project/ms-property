import { Inject, Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  constructor(@Inject('REDIS_CLIENT') private readonly redisClient: Redis) {}

  async onModuleInit() {
    this.redisClient.on('error', (err) => console.error('❌ Error en Redis:', err));
  }

  async onModuleDestroy() {
    await this.redisClient.quit();
  }


}
