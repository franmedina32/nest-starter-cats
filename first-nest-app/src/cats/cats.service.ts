import { Injectable } from '@nestjs/common';
import { Cat } from './entitys/cat.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCatDto } from './dto/CreateCatDto';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat)
    private catRepository: Repository<Cat>,
  ) {}

  async create(catDto: CreateCatDto): Promise<Cat> {
    const cat = new Cat();
    cat.age = catDto.age;
    cat.breed = catDto.breed;
    cat.name = catDto.name;
    return this.catRepository.save(catDto);
  }

  async listAll(): Promise<Cat[]> {
    return this.catRepository.find();
  }

  /*findAll(): Cat[] {
    return this.cats;
  }*/
}
