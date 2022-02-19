import {MigrationInterface, QueryRunner} from "typeorm";

export class addTodoTable1645202109502 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE todos (
                id uuid NOT NULL DEFAULT uuid_generate_v4(),
                todo text NOT NULL,
                completed boolean NOT NULL DEFAULT FALSE,
                user_id uuid NOT NULL,
                create_date timestamp NOT NULL DEFAULT NOW(),
                CONSTRAINT "user_id_fk" FOREIGN KEY(user_id) REFERENCES users(user_id)
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE todos;`);
    }

}
