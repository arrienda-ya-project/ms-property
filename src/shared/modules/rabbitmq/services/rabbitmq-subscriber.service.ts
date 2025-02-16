import { Injectable, OnModuleInit } from '@nestjs/common';
import { RabbitMQService } from '../rabbitmq.service';

@Injectable()
export class RabbitMQSubscriberService implements OnModuleInit {
  private readonly queue = 'rental_requests_queue';

  constructor(private readonly rabbitMQService: RabbitMQService) {}

  async onModuleInit() {
    await this.consumeQueue();
  }

  async consumeQueue() {
    const channel = await this.rabbitMQService.createChannel();
    await channel.assertQueue(this.queue, { durable: true });

    channel.consume(this.queue, (msg) => {
      if (msg !== null) {
        const eventData = JSON.parse(msg.content.toString());
        console.log(`📥 Evento recibido en ms-property:`, eventData);

        // Aquí iría la lógica para actualizar la propiedad
        // if (eventData.event === 'rental_request_created') { ... }

        channel.ack(msg);
      }
    });

    console.log(`🎧 Escuchando mensajes en la cola "${this.queue}" en ms-property`);
  }
}
