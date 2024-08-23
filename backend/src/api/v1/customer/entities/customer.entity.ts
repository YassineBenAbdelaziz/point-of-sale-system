import { BaseEntity, Column, Entity } from 'typeorm';

@Entity('customers')
export class Customer extends BaseEntity {
  @Column({ type: 'varchar', length: 255, nullable: false })
  firstname: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  lastname: string;

  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  cin: string;

  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  phone: string;
}
