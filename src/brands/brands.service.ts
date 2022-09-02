import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { v4 as uuid } from 'uuid';
import { Brand } from './entities/brand.entity';

@Injectable()
export class BrandsService {
  private brands: Brand[] = [
    {
      id: uuid(),
      createAt: new Date(),
      name: 'Toyota',
    },
  ];
  create(createBrandDto: CreateBrandDto) {
    const brand: Brand = {
      id: uuid(),
      createAt: new Date(),
      ...createBrandDto,
    };
    this.brands.push(brand);
    return brand;
  }

  findAll() {
    return this.brands;
  }

  findOne(id: string) {
    const brand = this.brands.find((brand) => brand.id === id);
    if (!brand) throw new NotFoundException(`Brand with id '${id}' not found`);
    return brand;
  }

  update(id: string, updateBrandDto: UpdateBrandDto) {
    let brandDB = this.findOne(id);

    this.brands = this.brands.map((brand) =>
      brand.id === id
        ? (brandDB = {
            ...brandDB,
            id,
            updateAt: new Date(),
            ...updateBrandDto,
          })
        : brand,
    );
    return brandDB;
  }

  remove(id: string) {
    const brandDB = this.findOne(id);
    this.brands = this.brands.filter((brand) => brand.id !== brandDB.id);
  }
}
