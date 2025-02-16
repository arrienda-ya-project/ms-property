import { Module } from '@nestjs/common';
import { PropertiesService } from './properties.service';
import { PropertiesController } from './properties.controller';
import { envs, PrismaService, RENTAL_REQUEST, ORDER } from 'src/shared';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  controllers: [PropertiesController],
  providers: [PropertiesService,PrismaService],

  imports:[
    ClientsModule.register([
      {
        name:ORDER, 
        
        transport:Transport.TCP,
        options:{
          host:envs.ORDER_HOST,
          port:envs.ORDER_PORT
        }
      }
    ])
  ]
})
export class PropertiesModule {}
