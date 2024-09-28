import { BaseEntity } from 'src/shared/entities/base-entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Role } from './role.entity';
import { Exclude, Expose } from 'class-transformer';

@Entity('employee')
export class Employee extends BaseEntity {
  @Column({ type: 'varchar', length: 100, nullable: false })
  firstName: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  lastName: string;

  @Column({ type: 'date', nullable: false })
  birthDate: Date;

  @Column({ type: 'varchar', nullable: false, unique: true, length: 8 })
  cin: string;

  @Column({ type: 'varchar', length: 100, nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 200, nullable: false })
  password: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  phoneNumber: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  address: string;

  @Column({ type: 'boolean', nullable: false, default: false })
  isActive: boolean;

  @ManyToOne(() => Role, (role) => role.employees)
  @JoinColumn({ name: 'role_id' })
  role: Role;
}
