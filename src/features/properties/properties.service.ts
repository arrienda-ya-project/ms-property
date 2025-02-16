import { HttpStatus, Injectable } from '@nestjs/common';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { PaginationDto, PrismaService } from 'src/shared';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class PropertiesService {
  constructor(private readonly prisma: PrismaService) {}

 async create(createPropertyDto: CreatePropertyDto) {
    return this.prisma.property.create({
       data:createPropertyDto
    })
  }

 async findAll(paginationDto:PaginationDto) {
  const {page,limit}= paginationDto;

  const totalPages = await this.prisma.property.count();
  const lastPages = Math.ceil(totalPages /limit!)
  return{
    data: await this.prisma.property.findMany({
      skip:(page! -1) * limit!,
      take:limit
    }),
    metadata:{
      total:totalPages,
      page,
      last_page:lastPages
    }
  }

  }

  async findAllAvailable(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;
  
    const totalPages = await this.prisma.property.count({
      where: { available: true },
    });
    const lastPages = Math.ceil(totalPages / limit!);
  
    return {
      data: await this.prisma.property.findMany({
        where: { available: true },
        skip: (page! - 1) * limit!,
        take: limit,
      }),
      metadata: {
        total: totalPages,
        page,
        last_page: lastPages,
      },
    };
  }
  async findAllUnavailable(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;
  
    const totalPages = await this.prisma.property.count({
      where: { available: false },
    });
    const lastPages = Math.ceil(totalPages / limit!);
  
    return {
      data: await this.prisma.property.findMany({
        where: { available: false },
        skip: (page! - 1) * limit!,
        take: limit,
      }),
      metadata: {
        total: totalPages,
        page,
        last_page: lastPages,
      },
    };
  }
  

  async findOne(id: string) {
    const property = await this.prisma.property.findFirst({
      where:{ id, available: true }});

      if ( !property ) {
        throw new RpcException({ 
          message: `Product with id #${ id } not found`,
          status: HttpStatus.BAD_REQUEST
        });
      }

    return property;
  }
  
  async update(id: string, updatePropertyDto: UpdatePropertyDto) {
   const {id: __, ...data}= updatePropertyDto;
   await this.findOne(id);
   return this.prisma.property.update({
    where:{id},
    data
   })
  }
  
  // async remove(id: string) {
  //   // Verificar si la propiedad existe antes de eliminar
  //   const property = await this.prisma.property.findUnique({ where: { id } });
  //   if (!property) {
  //     throw new Error(`Property with ID ${id} not found`);
  //   }
  
  //   return this.prisma.property.delete({
  //     where: { id },
  //   });
  // }

  async remove(id: string) {
    // Verificar si la propiedad existe antes de marcarla como no disponible
    const property = await this.prisma.property.findUnique({ where: { id } });
    if (!property) {
      throw new Error(`Property with ID ${id} not found`);
    }
  
    // En lugar de eliminar, solo actualizamos el campo `available`
    return this.prisma.property.update({
      where: { id },
      data: { available: false }, // 🔹 Cambia el estado en vez de eliminar
    });
  }
  
  }
