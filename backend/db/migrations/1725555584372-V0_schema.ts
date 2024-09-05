import { MigrationInterface, QueryRunner } from 'typeorm';

export class V0Schema1725555584372 implements MigrationInterface {
  name = 'V0Schema1725555584372';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "categories" ("id" SERIAL NOT NULL, "designation" character varying(255) NOT NULL, "description" character varying(255) NOT NULL, "parentId" integer, CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "products" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "designation" character varying(255) NOT NULL, "description" character varying(255) NOT NULL, "price" numeric(10,3) NOT NULL, "stock" integer NOT NULL, "image" character varying(255) NOT NULL, "category_id" integer, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "customers" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "firstname" character varying(255) NOT NULL, "lastname" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "cin" character varying(255) NOT NULL, "phone" character varying(255) NOT NULL, CONSTRAINT "UQ_8536b8b85c06969f84f0c098b03" UNIQUE ("email"), CONSTRAINT "UQ_e5c6da4c11b76c237c30ecd7dbe" UNIQUE ("cin"), CONSTRAINT "UQ_88acd889fbe17d0e16cc4bc9174" UNIQUE ("phone"), CONSTRAINT "PK_133ec679a801fab5e070f73d3ea" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "payment_types" ("id" SERIAL NOT NULL, "designation" character varying(255) NOT NULL, CONSTRAINT "PK_4f84450f9fd8116e201d806c74b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "payments" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "price" numeric(10,3) NOT NULL, "invoice_id" integer NOT NULL, "payment_type_id" integer NOT NULL, CONSTRAINT "PK_197ab7af18c93fbb0c9b28b4a59" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "overpays" ("code" uuid NOT NULL DEFAULT uuid_generate_v4(), "amount" numeric(10,3) NOT NULL, "dueDate" date NOT NULL, "used" boolean NOT NULL, "invoice_id" integer NOT NULL, CONSTRAINT "REL_995c27d389fa964ee1f0ffcbfc" UNIQUE ("invoice_id"), CONSTRAINT "PK_a9137b69a5ffb080a030bca618d" PRIMARY KEY ("code"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "customers_invoices" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "price" numeric(10,3) NOT NULL, "discount" numeric(10,3) NOT NULL, "overpay_id" uuid, "purchase_id" integer, CONSTRAINT "REL_7569a69649a17798f44fdeb16a" UNIQUE ("overpay_id"), CONSTRAINT "REL_bd453da584bbe68fbc8ceeedb3" UNIQUE ("purchase_id"), CONSTRAINT "PK_6489db0ffaec82fd81735643169" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "purchase" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "customer_id" integer, "invoice_id" integer, CONSTRAINT "REL_ce2d4f73261c835e3252a9a9ba" UNIQUE ("invoice_id"), CONSTRAINT "PK_86cc2ebeb9e17fc9c0774b05f69" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "purchase_items" ("purchaseId" integer NOT NULL, "productId" integer NOT NULL, "quantity" integer NOT NULL DEFAULT '1', "adjustedPrice" numeric(10,3) NOT NULL, CONSTRAINT "PK_3ed5219543c7eb63317e54f2c3d" PRIMARY KEY ("purchaseId", "productId"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "categories_closure" ("id_ancestor" integer NOT NULL, "id_descendant" integer NOT NULL, CONSTRAINT "PK_dc67f6a82852c15ec6e4243398d" PRIMARY KEY ("id_ancestor", "id_descendant"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_ea1e9c4eea91160dfdb4318778" ON "categories_closure" ("id_ancestor") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_51fff5114cc41723e8ca36cf22" ON "categories_closure" ("id_descendant") `,
    );
    await queryRunner.query(
      `ALTER TABLE "categories" ADD CONSTRAINT "FK_9a6f051e66982b5f0318981bcaa" FOREIGN KEY ("parentId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" ADD CONSTRAINT "FK_CATEGORY_ID" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "payments" ADD CONSTRAINT "FK_563a5e248518c623eebd987d43e" FOREIGN KEY ("invoice_id") REFERENCES "customers_invoices"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "payments" ADD CONSTRAINT "FK_650ff857451d1502709df53d485" FOREIGN KEY ("payment_type_id") REFERENCES "payment_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "overpays" ADD CONSTRAINT "FK_995c27d389fa964ee1f0ffcbfc8" FOREIGN KEY ("invoice_id") REFERENCES "customers_invoices"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "customers_invoices" ADD CONSTRAINT "FK_7569a69649a17798f44fdeb16a2" FOREIGN KEY ("overpay_id") REFERENCES "overpays"("code") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "customers_invoices" ADD CONSTRAINT "FK_invoice_purchase" FOREIGN KEY ("purchase_id") REFERENCES "purchase"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "purchase" ADD CONSTRAINT "FK_purchase_customer" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "purchase" ADD CONSTRAINT "FK_purchase_invoice" FOREIGN KEY ("invoice_id") REFERENCES "customers_invoices"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "purchase_items" ADD CONSTRAINT "FK_8bafbb5d45827a5d25f5cd3c6f3" FOREIGN KEY ("purchaseId") REFERENCES "purchase"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "purchase_items" ADD CONSTRAINT "FK_5b31a541ce1fc1f428db518efa4" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "categories_closure" ADD CONSTRAINT "FK_ea1e9c4eea91160dfdb4318778d" FOREIGN KEY ("id_ancestor") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "categories_closure" ADD CONSTRAINT "FK_51fff5114cc41723e8ca36cf227" FOREIGN KEY ("id_descendant") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "categories_closure" DROP CONSTRAINT "FK_51fff5114cc41723e8ca36cf227"`,
    );
    await queryRunner.query(
      `ALTER TABLE "categories_closure" DROP CONSTRAINT "FK_ea1e9c4eea91160dfdb4318778d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "purchase_items" DROP CONSTRAINT "FK_5b31a541ce1fc1f428db518efa4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "purchase_items" DROP CONSTRAINT "FK_8bafbb5d45827a5d25f5cd3c6f3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "purchase" DROP CONSTRAINT "FK_purchase_invoice"`,
    );
    await queryRunner.query(
      `ALTER TABLE "purchase" DROP CONSTRAINT "FK_purchase_customer"`,
    );
    await queryRunner.query(
      `ALTER TABLE "customers_invoices" DROP CONSTRAINT "FK_invoice_purchase"`,
    );
    await queryRunner.query(
      `ALTER TABLE "customers_invoices" DROP CONSTRAINT "FK_7569a69649a17798f44fdeb16a2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "overpays" DROP CONSTRAINT "FK_995c27d389fa964ee1f0ffcbfc8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "payments" DROP CONSTRAINT "FK_650ff857451d1502709df53d485"`,
    );
    await queryRunner.query(
      `ALTER TABLE "payments" DROP CONSTRAINT "FK_563a5e248518c623eebd987d43e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" DROP CONSTRAINT "FK_CATEGORY_ID"`,
    );
    await queryRunner.query(
      `ALTER TABLE "categories" DROP CONSTRAINT "FK_9a6f051e66982b5f0318981bcaa"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_51fff5114cc41723e8ca36cf22"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_ea1e9c4eea91160dfdb4318778"`,
    );
    await queryRunner.query(`DROP TABLE "categories_closure"`);
    await queryRunner.query(`DROP TABLE "purchase_items"`);
    await queryRunner.query(`DROP TABLE "purchase"`);
    await queryRunner.query(`DROP TABLE "customers_invoices"`);
    await queryRunner.query(`DROP TABLE "overpays"`);
    await queryRunner.query(`DROP TABLE "payments"`);
    await queryRunner.query(`DROP TABLE "payment_types"`);
    await queryRunner.query(`DROP TABLE "customers"`);
    await queryRunner.query(`DROP TABLE "products"`);
    await queryRunner.query(`DROP TABLE "categories"`);
  }
}
