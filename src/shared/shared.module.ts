import { Module } from '@nestjs/common';
import { PrismaModule, RedisModule } from '.';
import { RabbitMQModule } from './modules/rabbitmq/rabbitmq.module';

@Module({
    imports:[
        RedisModule,
        PrismaModule,
        RabbitMQModule
    ],
    exports:[
        RedisModule,
        PrismaModule,
        RabbitMQModule
    ]
})
export class SharedModule {}
