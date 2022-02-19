import { Column, Entity, BaseEntity, PrimaryGeneratedColumn } from "typeorm";

@Entity('todos')
export class Todos extends BaseEntity  {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    todo: string;

    @Column()
    completed: boolean;

    @Column()
    user_id: string;
}