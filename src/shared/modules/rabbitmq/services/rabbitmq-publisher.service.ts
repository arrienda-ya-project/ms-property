import { Injectable, Inject } from '@nestjs/common';
import * as amqp from 'amqplib';
import { RabbitMQService } from '../rabbitmq.service';

@Injectable()
export class RabbitMQPublisherService {
  private channel: amqp.Channel;

  constructor(private readonly rabbitMQService: RabbitMQService) {}

  async init() {
    if (!this.channel) {
      this.channel = await this.rabbitMQService.createChannel();
    }
  }

  async sendToQueue(queue: string, message: any) {
    await this.init();
    await this.channel.assertQueue(queue, { durable: true });
    this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
    console.log(`📩 Mensaje enviado a la cola "${queue}"`);
  }
}
