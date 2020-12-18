import {
  Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn,
} from 'typeorm';

// eslint-disable-next-line import/no-cycle
import User from './User';

@Entity('messages')
class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  desc: string;

  @ManyToOne((type) => User, (messages) => Message, { cascade: true })
  user: User;

  @CreateDateColumn({ name: 'created_at', nullable: false })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at ', nullable: false })
  updatedAt: Date;
}

export default Message;
