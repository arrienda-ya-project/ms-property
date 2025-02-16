import {
  Controller,
  Query,
} from '@nestjs/common';
import { PropertiesService } from './properties.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { PaginationDto } from 'src/shared';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('property')
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}

  // @Post('create')
  @MessagePattern({cmd:'create_property'})
  async create(@Payload() createPropertyDto: CreatePropertyDto) {
    return this.propertiesService.create(createPropertyDto);
  }

  // @Get('all')
  @MessagePattern({cmd:'find_all_properties'})
  async findAll(@Payload() paginationDto:PaginationDto){
    return this.propertiesService.findAll(paginationDto)
  }

  @MessagePattern({cmd:'test'})
  async test(@Payload() paginationDto:any){
    return this.propertiesService.findAll(paginationDto)
  }
  
  // @Get(':id')
  @MessagePattern({cmd:'find_one_property'})
  async findById(@Payload('id') id: string) {
    return this.propertiesService.findOne(id);
  }

  // @Patch(':id')
  @MessagePattern({cmd:'update_property_find_one'})
async update(@Payload()  updatePropertyDto: UpdatePropertyDto) {
  return this.propertiesService.update(updatePropertyDto.id, updatePropertyDto);
}

// @Delete(':id')
@MessagePattern({cmd:'delete_property_find_one_'})
async remove(@Payload() id: string) {
  return this.propertiesService.remove(id);
}

// @Get('available')
async findAllAvailable(@Query() paginationDto: PaginationDto) {
  return this.propertiesService.findAllAvailable(paginationDto);
}

// @Get('unavailable')
async findAllUnavailable(@Query() paginationDto: PaginationDto) {
  return this.propertiesService.findAllUnavailable(paginationDto);
}


}
