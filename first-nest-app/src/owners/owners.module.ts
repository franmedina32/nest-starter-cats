import { Module } from '@nestjs/common';
import { OwnersService } from './owners.service';
import { OwnersController } from './owners.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Owner } from './entities/owner.entity';
import { Cat } from '../cats/entitys/cat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Owner, Cat])],
  exports: [OwnersService],
  controllers: [OwnersController],
  providers: [OwnersService],
})
export class OwnersModule {}
