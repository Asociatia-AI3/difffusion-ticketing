/*import { MigrationInterface, QueryRunner } from 'typeorm';

export class PartnerMigration1746692591615 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE Partners ADD COLUMN email varchar(255) not null;
        ALTER TABLE Partners ADD COLUMN password varchar(255) not null;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        ALTER TABLE Partners DROP COLUMN email;
        ALTER TABLE Partners DROP COLUMN password;
    `);
  }
}
*/