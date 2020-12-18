import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BeforeInsert,
  BeforeUpdate,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import Bcrypt from 'bcryptjs';
// eslint-disable-next-line import/no-cycle
import Message from './Message';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @OneToMany((type) => Message, (user) => User, { cascade: true })
  messages: Message[];

  @CreateDateColumn({ name: 'created_at', nullable: false })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: false })
  updatedAt: Date;

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    this.password = Bcrypt.hashSync(this.password, 8);
  }
}

export default User;
