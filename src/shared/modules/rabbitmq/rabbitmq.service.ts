import { Injectable, Inject, OnModuleDestroy } from '@nestjs/common';
import * as amqp from 'amqplib';

@Injectable()
export class RabbitMQService implements OnModuleDestroy {
  constructor(@Inject('RABBITMQ_CONNECTION') private readonly connection: amqp.Connection) {}

  async createChannel(): Promise<amqp.Channel> {
    return this.connection.createChannel();
  }

  async onModuleDestroy() {
    await this.connection.close();
  }
}
