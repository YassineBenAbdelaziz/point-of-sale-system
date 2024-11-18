import { MigrationInterface, QueryRunner } from 'typeorm';

export class V3Schema1727249529202 implements MigrationInterface {
  name = 'V3Schema1727249529202';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "coupons" ("id" SERIAL NOT NULL, "percentage" numeric(3,2) NOT NULL, "loyalty_program_id" integer NOT NULL, CONSTRAINT "REL_657e9e623eb7631a73eee76c4f" UNIQUE ("loyalty_program_id"), CONSTRAINT "PK_d7ea8864a0150183770f3e9a8cb" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "discount_codes" ("code" character varying(15) NOT NULL, "isActive" boolean NOT NULL DEFAULT false, "loyalty_program_id" integer NOT NULL, CONSTRAINT "PK_b967edd0d46547d4a92b4a1c6b3" PRIMARY KEY ("code"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "loyalty_programs" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(255) NOT NULL, "description" character varying(255) NOT NULL, "expiresAt" TIMESTAMP NOT NULL, "type" "public"."loyalty_programs_type_enum" NOT NULL, CONSTRAINT "PK_9911f010986d7730cc744f91ff4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "buy_x_get_y" ("id" SERIAL NOT NULL, "xProductId" integer NOT NULL, "yProductId" integer NOT NULL, "xQuantity" integer NOT NULL, "loyalty_program_id" integer NOT NULL, CONSTRAINT "REL_573f9c660b0b42c2e1a05bb335" UNIQUE ("loyalty_program_id"), CONSTRAINT "PK_2316932c68e44b8edbc1d2d280e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "coupons" ADD CONSTRAINT "FK_loyalty_program_coupon" FOREIGN KEY ("loyalty_program_id") REFERENCES "loyalty_programs"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "discount_codes" ADD CONSTRAINT "FK_5ea6456a22456945b7fe435f8ef" FOREIGN KEY ("loyalty_program_id") REFERENCES "loyalty_programs"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "buy_x_get_y" ADD CONSTRAINT "FK_591f5e408f5d61f4f7a89c5638b" FOREIGN KEY ("xProductId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "buy_x_get_y" ADD CONSTRAINT "FK_ba2f9b2a1daa67ee5f252a5d5e5" FOREIGN KEY ("yProductId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "buy_x_get_y" ADD CONSTRAINT "FK_loyalty_program_buy_x_get_y" FOREIGN KEY ("loyalty_program_id") REFERENCES "loyalty_programs"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "buy_x_get_y" DROP CONSTRAINT "FK_loyalty_program_buy_x_get_y"`,
    );
    await queryRunner.query(
      `ALTER TABLE "buy_x_get_y" DROP CONSTRAINT "FK_ba2f9b2a1daa67ee5f252a5d5e5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "buy_x_get_y" DROP CONSTRAINT "FK_591f5e408f5d61f4f7a89c5638b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "discount_codes" DROP CONSTRAINT "FK_5ea6456a22456945b7fe435f8ef"`,
    );
    await queryRunner.query(
      `ALTER TABLE "coupons" DROP CONSTRAINT "FK_loyalty_program_coupon"`,
    );
    await queryRunner.query(`DROP TABLE "buy_x_get_y"`);
    await queryRunner.query(`DROP TABLE "loyalty_programs"`);
    await queryRunner.query(`DROP TABLE "discount_codes"`);
    await queryRunner.query(`DROP TABLE "coupons"`);
  }
}
