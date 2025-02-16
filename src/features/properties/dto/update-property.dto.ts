import { PartialType } from '@nestjs/mapped-types';
import { CreatePropertyDto } from './create-property.dto';
import { IsString } from 'class-validator';

export class UpdatePropertyDto extends PartialType(CreatePropertyDto) {
    @IsString()
    id:string
}
