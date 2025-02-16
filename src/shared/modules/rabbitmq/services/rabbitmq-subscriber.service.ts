import { Injectable } from '@nestjs/common';
import * as amqp from 'amqplib';
import { RabbitMQService } from '../rabbitmq.service';

@Injectable()
export class RabbitMQSubscriberService {
  private channel: amqp.Channel;

  constructor(private readonly rabbitMQService: RabbitMQService) {}

  async init() {
    if (!this.channel) {
      this.channel = await this.rabbitMQService.createChannel();
    }
  }

  async consumeQueue(queue: string, callback: (msg: amqp.ConsumeMessage) => void) {
    await this.init();
    await this.channel.assertQueue(queue, { durable: true });

    this.channel.consume(queue, (msg) => {
      if (msg !== null) {
        callback(msg);
        this.channel.ack(msg);
      }
    });

    console.log(`🎧 Escuchando mensajes en la cola "${queue}"`);
  }
}
