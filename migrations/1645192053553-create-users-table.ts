import {MigrationInterface, QueryRunner} from "typeorm";

export class createUsersTable1645192053553 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE users (
            user_id uuid NOT NULL DEFAULT uuid_generate_v4(),
            first_name varchar NOT NULL,
            last_name varchar NOT NULL,
            email varchar NOT NULL UNIQUE,
            password varchar NOT NULL,
            CONSTRAINT "user_id_pk" PRIMARY KEY(user_id)
        );`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE users;')
    }

}
