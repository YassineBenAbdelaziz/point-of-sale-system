import { MigrationInterface, QueryRunner } from 'typeorm';

export class V1Schema1725560729329 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE OR REPLACE FUNCTION update_stock()
        RETURNS TRIGGER 
        LANGUAGE PLPGSQL
        AS $$
            Begin
                IF (TG_OP = 'INSERT') THEN
                    update products 
                    set stock = stock - NEW.quantity
                    where id = NEW."productId";
                ELSIF (TG_OP = 'DELETE') THEN
                    update products 
                    set stock = stock + OLD.quantity
                    where id = OLD."productId";
                END IF;
                RETURN NEW;
            END;
        $$
        `);

    await queryRunner.query(`
        CREATE TRIGGER update_stock_trigger
        AFTER INSERT OR DELETE ON purchase_items
        FOR EACH ROW
        EXECUTE FUNCTION update_stock();


        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP TRIGGER IF EXISTS update_stock_trigger ON purchase_items;`,
    );

    await queryRunner.query(`DROP FUNCTION IF EXISTS update_stock();`);
  }
}
