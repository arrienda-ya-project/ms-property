import { Module } from '@nestjs/common';
import { PropertiesModule } from './properties/properties.module';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports: [PropertiesModule,SharedModule],
  exports:[PropertiesModule]
})
export class FeaturesModule {}
