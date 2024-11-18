import { MigrationInterface, QueryRunner } from 'typeorm';

export class V5Schema1728214208113 implements MigrationInterface {
  name = 'V5Schema1728214208113';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "customers_invoices" DROP CONSTRAINT "FK_invoice_purchase"`,
    );
    await queryRunner.query(
      `ALTER TABLE "price-lists" RENAME COLUMN "expriresAt" TO "expiresAt"`,
    );
    await queryRunner.query(
      `CREATE TABLE "customers_price_lists" ("customersId" integer NOT NULL, "priceListsId" integer NOT NULL, CONSTRAINT "PK_5dcfe1c3e3b445874b52073792a" PRIMARY KEY ("customersId", "priceListsId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f6df98885dbd646aa06ac6e01d" ON "customers_price_lists" ("customersId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_8c6cf43652deaa0367c6c11ada" ON "customers_price_lists" ("priceListsId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "customers_invoices" DROP CONSTRAINT "REL_bd453da584bbe68fbc8ceeedb3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "customers_invoices" DROP COLUMN "purchase_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "purchase_items" ADD "id" SERIAL NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "purchase_items" DROP CONSTRAINT "PK_3ed5219543c7eb63317e54f2c3d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "purchase_items" ADD CONSTRAINT "PK_371d8b8a0a72a45b6d52f0c1d4f" PRIMARY KEY ("purchaseId", "productId", "id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "discount_codes" ALTER COLUMN "isActive" SET DEFAULT true`,
    );
    await queryRunner.query(
      `ALTER TABLE "purchase_items" DROP CONSTRAINT "FK_8bafbb5d45827a5d25f5cd3c6f3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "purchase_items" DROP CONSTRAINT "FK_5b31a541ce1fc1f428db518efa4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "purchase_items" DROP CONSTRAINT "PK_371d8b8a0a72a45b6d52f0c1d4f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "purchase_items" ADD CONSTRAINT "PK_aa19efd372f4ec8ffcf32858474" PRIMARY KEY ("productId", "id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "purchase_items" DROP CONSTRAINT "PK_aa19efd372f4ec8ffcf32858474"`,
    );
    await queryRunner.query(
      `ALTER TABLE "purchase_items" ADD CONSTRAINT "PK_e3d9bea880baad86ff6de3290da" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "purchase_items" ADD CONSTRAINT "FK_8bafbb5d45827a5d25f5cd3c6f3" FOREIGN KEY ("purchaseId") REFERENCES "purchase"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "purchase_items" ADD CONSTRAINT "FK_5b31a541ce1fc1f428db518efa4" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "customers_price_lists" ADD CONSTRAINT "FK_f6df98885dbd646aa06ac6e01d5" FOREIGN KEY ("customersId") REFERENCES "customers"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "customers_price_lists" ADD CONSTRAINT "FK_8c6cf43652deaa0367c6c11adae" FOREIGN KEY ("priceListsId") REFERENCES "price-lists"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "customers_price_lists" DROP CONSTRAINT "FK_8c6cf43652deaa0367c6c11adae"`,
    );
    await queryRunner.query(
      `ALTER TABLE "customers_price_lists" DROP CONSTRAINT "FK_f6df98885dbd646aa06ac6e01d5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "purchase_items" DROP CONSTRAINT "FK_5b31a541ce1fc1f428db518efa4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "purchase_items" DROP CONSTRAINT "FK_8bafbb5d45827a5d25f5cd3c6f3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "purchase_items" DROP CONSTRAINT "PK_e3d9bea880baad86ff6de3290da"`,
    );
    await queryRunner.query(
      `ALTER TABLE "purchase_items" ADD CONSTRAINT "PK_aa19efd372f4ec8ffcf32858474" PRIMARY KEY ("productId", "id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "purchase_items" DROP CONSTRAINT "PK_aa19efd372f4ec8ffcf32858474"`,
    );
    await queryRunner.query(
      `ALTER TABLE "purchase_items" ADD CONSTRAINT "PK_371d8b8a0a72a45b6d52f0c1d4f" PRIMARY KEY ("purchaseId", "productId", "id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "purchase_items" ADD CONSTRAINT "FK_5b31a541ce1fc1f428db518efa4" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "purchase_items" ADD CONSTRAINT "FK_8bafbb5d45827a5d25f5cd3c6f3" FOREIGN KEY ("purchaseId") REFERENCES "purchase"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "discount_codes" ALTER COLUMN "isActive" SET DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "purchase_items" DROP CONSTRAINT "PK_371d8b8a0a72a45b6d52f0c1d4f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "purchase_items" ADD CONSTRAINT "PK_3ed5219543c7eb63317e54f2c3d" PRIMARY KEY ("purchaseId", "productId")`,
    );
    await queryRunner.query(`ALTER TABLE "purchase_items" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "customers_invoices" ADD "purchase_id" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "customers_invoices" ADD CONSTRAINT "REL_bd453da584bbe68fbc8ceeedb3" UNIQUE ("purchase_id")`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_8c6cf43652deaa0367c6c11ada"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_f6df98885dbd646aa06ac6e01d"`,
    );
    await queryRunner.query(`DROP TABLE "customers_price_lists"`);
    await queryRunner.query(
      `ALTER TABLE "price-lists" RENAME COLUMN "expiresAt" TO "expriresAt"`,
    );
    await queryRunner.query(
      `ALTER TABLE "customers_invoices" ADD CONSTRAINT "FK_invoice_purchase" FOREIGN KEY ("purchase_id") REFERENCES "purchase"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
