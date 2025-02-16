import { Module } from '@nestjs/common';
import { PrismaModule, RedisModule } from '.';
// import { SeedModule } from './modules/seed/seed.module';
// import { RabbitMQModule } from './modules/rabbitmq/rabbitmq.module';

@Module({
    imports:[
        // RedisModule,
        PrismaModule,
        // SeedModule,
        // RabbitMQModule
    ],
    exports:[
        // RedisModule,
        PrismaModule
    ]
})
export class SharedModule {}
