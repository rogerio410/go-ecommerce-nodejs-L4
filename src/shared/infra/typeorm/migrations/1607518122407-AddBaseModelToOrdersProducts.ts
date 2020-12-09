import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddBaseModelToOrdersProducts1607518122407
  implements MigrationInterface {
  name = 'AddBaseModelToOrdersProducts1607518122407';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "orders_products" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "orders_products" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "orders_products" DROP COLUMN "updated_at"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "orders_products" DROP COLUMN "created_at"`,
      undefined,
    );
  }
}
