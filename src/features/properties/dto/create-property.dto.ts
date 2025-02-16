import { IsString, IsNotEmpty, IsOptional, IsNumber, Min } from 'class-validator';

export class CreatePropertyDto {
    @IsString()
    @IsNotEmpty()
    title: string; // 🔹 Ahora coincide con Prisma

    @IsString()
    @IsOptional()
    description?: string; // 🔹 Ahora coincide con Prisma

    @IsNumber()
    @Min(0)
    price: number; // 🔹 Ahora coincide con Prisma
}
