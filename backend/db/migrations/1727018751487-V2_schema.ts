import { MigrationInterface, QueryRunner } from 'typeorm';

export class V2Schema1727018751487 implements MigrationInterface {
  name = 'V2Schema1727018751487';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "price-lists" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(255) NOT NULL, "description" character varying(255) NOT NULL, "expriresAt" date, CONSTRAINT "PK_2a7e6fa481748baf8ccd295e26e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "price_list_products" ("priceListId" integer NOT NULL, "productId" integer NOT NULL, "minQuantity" integer NOT NULL DEFAULT '1', "newPrice" numeric(10,3) NOT NULL, CONSTRAINT "PK_8f34ccae2af77b759daa62af8f3" PRIMARY KEY ("priceListId", "productId"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "price_list_products" ADD CONSTRAINT "FK_d218394529a006c9e88a501ade4" FOREIGN KEY ("priceListId") REFERENCES "price-lists"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "price_list_products" ADD CONSTRAINT "FK_d9c78d66627f5f44802c10691d7" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "price_list_products" DROP CONSTRAINT "FK_d9c78d66627f5f44802c10691d7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "price_list_products" DROP CONSTRAINT "FK_d218394529a006c9e88a501ade4"`,
    );
    await queryRunner.query(`DROP TABLE "price_list_products"`);
    await queryRunner.query(`DROP TABLE "price-lists"`);
  }
}
