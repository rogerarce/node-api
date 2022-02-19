import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
@Entity({ name: 'users' })
export class User extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    user_id: string;

    @Column()
    first_name: string;

    @Column()
    last_name: string;

    @Column({
        type: "varchar",
        unique: true,
    })
    email: string;

    @Column()
    password: string;
}