import {MigrationInterface, QueryRunner} from "typeorm";

export class User1581025538785 implements MigrationInterface {
    name = 'User1581025538785'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "firstName" character varying, "lastName" character varying, "email" character varying NOT NULL, "password" character varying NOT NULL, "profilePicture" character varying NOT NULL DEFAULT 'https://ca.slack-edge.com/TQY9U9T96-UQLRR7CRZ-gf4706566cf7-512', CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "user"`, undefined);
    }

}
