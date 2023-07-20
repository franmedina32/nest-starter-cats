import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OwnersService } from './owners.service';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { Owner } from './entities/owner.entity';
import { AdoptCatOwnerDto } from './dto/adoptCat-owner.dto';
import { Cat } from '../cats/entitys/cat.entity';

@Controller('owners')
export class OwnersController {
  constructor(private readonly ownersService: OwnersService) {}

  @Post()
  create(@Body() createOwnerDto: CreateOwnerDto): Promise<Owner> {
    return this.ownersService.create(createOwnerDto);
  }

  @Post('/adopt')
  adopt(@Body() adoptDto: AdoptCatOwnerDto): Promise<string> {
    return this.ownersService.adopt(adoptDto);
  }

  @Get('pets/:id')
  ownerPets(@Param('id') id: number): Promise<Cat[]> {
    return this.ownersService.catsPorOwner(id);
  }

  @Get()
  findAll() {
    return this.ownersService.findAll();
  }

  /*

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ownersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOwnerDto: UpdateOwnerDto) {
    return this.ownersService.update(+id, updateOwnerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ownersService.remove(+id);
  }*/
}
