import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisSubscriberService {
  private readonly subscriber: Redis;

  constructor() {
    this.subscriber = new Redis(); 
  }
}
