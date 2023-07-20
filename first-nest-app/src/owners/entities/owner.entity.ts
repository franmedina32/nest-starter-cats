import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Cat } from '../../cats/entitys/cat.entity';

@Entity()
export class Owner {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Cat, (cats) => cats.owner)
  cats: Cat[];
}



