import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { envs } from './shared';

async function bootstrap() {
  const logger:Logger = new Logger('MS-PROPERTY')
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule,
    {
      transport: Transport.TCP,
      options:{
        port:envs.PORT
      }
    },
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist:true,
      forbidNonWhitelisted:true
    })
  )
  await app.listen();
  // await app.listen(envs.PORT);
  logger.log(`MS running on port ${envs.PORT}`)
}
bootstrap();
