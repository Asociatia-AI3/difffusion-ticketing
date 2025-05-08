import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1746692591614 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS 'Users' (id varchar(255) PRIMARY KEY, email varchar(20) not null, name varchar(255) not null, mobile varchar(20) not null);
        CREATE TABLE IF NOT EXISTS Partners (id varchar(255) primary key, name varchar(255) not null, fiscal_id varchar(255) not null);
        CREATE TABLE IF NOT EXISTS Venues (id varchar(255) primary key, partner_id varchar(255) references Partners (id), name varchar(20) not null);
        CREATE TABLE IF NOT EXISTS Discounts (id varchar(255) primary key, name varchar(255) not null, percent_off tinyint not null, max_uses tinyint not null default 0, venue_id varchar(255) references Venues (id));
        CREATE TABLE IF NOT EXISTS Tickets (id varchar(255) primary key, code varchar(255) not null, user_id varchar(255) references Users (id));
        CREATE TABLE IF NOT EXISTS TicketUses (id varchar(255) primary key, ticket_id varchar(255) references Tickets (id), discount_id varchar(255) references Discounts (id), created_at int);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        DROP TABLE IF EXISTS TicketUses;
        DROP TABLE IF EXISTS Tickets;
        DROP TABLE IF EXISTS Discounts;
        DROP TABLE IF EXISTS Venues;
        DROP TABLE IF EXISTS Partners;
        DROP TABLE IF EXISTS Users;
    `);
  }

}
