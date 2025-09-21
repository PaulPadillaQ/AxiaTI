import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity('tickets')
export class Ticket {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column()
  userId: string;

  @Column({ nullable: true })
  assignedTo: string;

  @Column({ nullable: true })
  categoryId: string;

  @Column({ nullable: true })
  priorityId: string;

  @Column({ nullable: true })
  statusId: string;

  @Column('json', { nullable: true })
  attachments: string[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
