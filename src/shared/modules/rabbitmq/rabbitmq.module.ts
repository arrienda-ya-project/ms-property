import { Module, Global, Logger } from '@nestjs/common';
import * as amqp from 'amqplib';
import { envs } from 'src/shared';
import { RabbitMQService } from './rabbitmq.service';
// import { RabbitMQPublisherService } from './rabbitmq-publisher.service';
// import { RabbitMQSubscriberService } from './rabbitmq-subscriber.service';

const logger: Logger = new Logger('RabbitMQModule');

@Global()
@Module({
  providers: [
    {
      provide: 'RABBITMQ_CONNECTION',
      useFactory: async () => {
        try {
          logger.log(`🔍 Conectando a RabbitMQ en: ${envs.RABBITMQ_ENDPOINT}`);
          const connection = await amqp.connect(envs.RABBITMQ_ENDPOINT);
          logger.log('✅ Conexión exitosa a RabbitMQ');
          return connection;
        } catch (error) {
          logger.error(`❌ Error conectando a RabbitMQ: ${error.message}`);
          throw error;
        }
      },
    },
    RabbitMQService,
    // RabbitMQPublisherService,
    // RabbitMQSubscriberService,
  ],
  exports: ['RABBITMQ_CONNECTION', RabbitMQService],
})
export class RabbitMQModule {}
