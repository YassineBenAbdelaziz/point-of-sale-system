import { MigrationInterface, QueryRunner } from 'typeorm';

export class V4Schema1727521299586 implements MigrationInterface {
  name = 'V4Schema1727521299586';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "employee" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "firstName" character varying(100) NOT NULL, "lastName" character varying(100) NOT NULL, "birthDate" date NOT NULL, "cin" character varying(8) NOT NULL, "email" character varying(100) NOT NULL, "password" character varying(200) NOT NULL, "phoneNumber" character varying(100) NOT NULL, "address" character varying(100) NOT NULL, "isActive" boolean NOT NULL DEFAULT false, "role_id" integer, CONSTRAINT "UQ_2f05d5c0f3e062205cf3291e6a6" UNIQUE ("cin"), CONSTRAINT "UQ_817d1d427138772d47eca048855" UNIQUE ("email"), CONSTRAINT "PK_3c2bc72f03fd5abbbc5ac169498" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "roles" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "employee" ADD CONSTRAINT "FK_1c105b756816efbdeae09a9ab65" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "employee" DROP CONSTRAINT "FK_1c105b756816efbdeae09a9ab65"`,
    );
    await queryRunner.query(`DROP TABLE "roles"`);
    await queryRunner.query(`DROP TABLE "employee"`);
  }
}
