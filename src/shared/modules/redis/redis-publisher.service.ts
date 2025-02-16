import { Inject, Injectable } from '@nestjs/common';
import * as Redis from 'ioredis';

@Injectable()
export class RedisPublisherService {
  constructor(@Inject('REDIS_CLIENT') private readonly redisClient: Redis.Redis) {}

}
