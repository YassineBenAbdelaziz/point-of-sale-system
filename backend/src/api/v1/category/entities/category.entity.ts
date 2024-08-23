import { BaseEntity } from 'src/shared/entities/base-entity';
import { Column } from 'typeorm';

export class Category extends BaseEntity {
  @Column({ type: 'varchar', length: 255, nullable: false })
  designation: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  description: string;
}
