import { Body, Controller, Post } from '@nestjs/common';
import { CreateCatDto } from './dto/CreateCatDto';
import { CatsService } from './cats.service';
import { Cat } from 'src/cats/entitys/cat.entity';

@Controller('cats')
export class CatController {
  constructor(private catService: CatsService) {}

  @Post()
  create(@Body() ccDto: CreateCatDto): Promise<Cat> {
    return this.catService.create(ccDto);
  }
}
