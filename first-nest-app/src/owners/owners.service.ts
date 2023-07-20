import { Injectable } from '@nestjs/common';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { Owner } from './entities/owner.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdoptCatOwnerDto } from './dto/adoptCat-owner.dto';
import { Cat } from '../cats/entitys/cat.entity';

@Injectable()
export class OwnersService {
  constructor(
    @InjectRepository(Owner)
    private ownerRepository: Repository<Owner>,
    @InjectRepository(Cat)
    private catRepository: Repository<Cat>,
  ) {}
  async create(createOwnerDto: CreateOwnerDto): Promise<Owner> {
    const newOwn = new Owner();
    newOwn.name = createOwnerDto.name;
    return await this.ownerRepository.save(newOwn);
  }

  async adopt(adoptDto: AdoptCatOwnerDto): Promise<string> {
    const owner = await this.ownerRepository.findOneBy({
      id: adoptDto.ownerId,
    });
    const cat = await this.catRepository.findOneBy({ id: adoptDto.catId });
    if (!owner || !cat) {
      throw new Error('ERROR: cart or owner not found');
    }
    cat.owner = owner;
    await this.catRepository.save(cat);
    return `${owner.name} ha adoptado a ${cat.name} con exito`;
  }

  findAll(): Promise<Owner[]> {
    return this.ownerRepository.find();
  }

  async catsPorOwner(id: number): Promise<Cat[]> {
    const owner = await this.ownerRepository.findOne({
      where: { id },
      relations: ['cats'],
    });
    if (!owner) {
      throw new Error('ERROR: owner not found');
    }
    return owner.cats;
  }

  /*findOne(id: number) {
    return `This action returns a #${id} owner`;
  }

  update(id: number, updateOwnerDto: UpdateOwnerDto) {
    return `This action updates a #${id} owner`;
  }

  remove(id: number) {
    return `This action removes a #${id} owner`;
  }*/
}
