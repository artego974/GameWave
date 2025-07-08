import { MigrationInterface, QueryRunner } from "typeorm";

export class Inicial1752002530577 implements MigrationInterface {
    name = 'Inicial1752002530577'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`campeonato\` (\`id\` int NOT NULL AUTO_INCREMENT, \`_name\` varchar(255) NOT NULL, \`_description\` text NULL, \`_img\` text NOT NULL, \`_game\` varchar(100) NOT NULL, \`_numberOfPlayers\` int NOT NULL, \`_timeDate\` datetime NOT NULL, \`hostId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`games\` (\`id\` int NOT NULL AUTO_INCREMENT, \`_name\` varchar(255) NOT NULL, \`_description\` text NOT NULL, UNIQUE INDEX \`IDX_090ad23bd87973e4c8cef42fe2\` (\`_name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`lives\` (\`id\` int NOT NULL, \`_img\` text NOT NULL, \`_link\` text NOT NULL, \`_titulo\` varchar(255) NOT NULL, \`_subtitulo\` varchar(255) NOT NULL, \`userId\` int NULL, \`gameId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`_name\` varchar(100) NOT NULL, \`_email\` varchar(255) NOT NULL, \`_password\` varchar(255) NOT NULL, \`_nickName\` varchar(100) NOT NULL, \`seguidores\` int NOT NULL DEFAULT '0', \`seguindo\` int NOT NULL DEFAULT '0', UNIQUE INDEX \`IDX_8e4ea639c304b85781120f1eb6\` (\`_email\`), UNIQUE INDEX \`IDX_9c5f86eae095afcba21b0928ee\` (\`_nickName\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`plataforma\` (\`id\` int NOT NULL AUTO_INCREMENT, \`_name\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_de8b5a785e91b33ae3b1ae7342\` (\`_name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`participantes\` (\`campeonatoId\` int NOT NULL, \`usersId\` int NOT NULL, INDEX \`IDX_17ce2ad4246009d6fbf75a6130\` (\`campeonatoId\`), INDEX \`IDX_ed7f492dccc45895b2c038a4cd\` (\`usersId\`), PRIMARY KEY (\`campeonatoId\`, \`usersId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`game_plataforma\` (\`plataformaId\` int NOT NULL, \`gamesId\` int NOT NULL, INDEX \`IDX_581d8df4198eb22f7a41e9aa14\` (\`plataformaId\`), INDEX \`IDX_3db73e2db5b32cbfddd83361da\` (\`gamesId\`), PRIMARY KEY (\`plataformaId\`, \`gamesId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`plataforma_campeonatos\` (\`plataformaId\` int NOT NULL, \`campeonatoId\` int NOT NULL, INDEX \`IDX_3fbd50b9063376a22cca1e1ead\` (\`plataformaId\`), INDEX \`IDX_604ef6086d4920db53265085b6\` (\`campeonatoId\`), PRIMARY KEY (\`plataformaId\`, \`campeonatoId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`campeonato\` ADD CONSTRAINT \`FK_a10d64c63b77e45e33a00e48d25\` FOREIGN KEY (\`hostId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`lives\` ADD CONSTRAINT \`FK_70ab490d6f2d77e9d12244e98a1\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`lives\` ADD CONSTRAINT \`FK_2835b618262ce71c6d32a152755\` FOREIGN KEY (\`gameId\`) REFERENCES \`games\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`participantes\` ADD CONSTRAINT \`FK_17ce2ad4246009d6fbf75a61306\` FOREIGN KEY (\`campeonatoId\`) REFERENCES \`campeonato\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`participantes\` ADD CONSTRAINT \`FK_ed7f492dccc45895b2c038a4cde\` FOREIGN KEY (\`usersId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`game_plataforma\` ADD CONSTRAINT \`FK_581d8df4198eb22f7a41e9aa140\` FOREIGN KEY (\`plataformaId\`) REFERENCES \`plataforma\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`game_plataforma\` ADD CONSTRAINT \`FK_3db73e2db5b32cbfddd83361daf\` FOREIGN KEY (\`gamesId\`) REFERENCES \`games\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`plataforma_campeonatos\` ADD CONSTRAINT \`FK_3fbd50b9063376a22cca1e1ead0\` FOREIGN KEY (\`plataformaId\`) REFERENCES \`plataforma\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`plataforma_campeonatos\` ADD CONSTRAINT \`FK_604ef6086d4920db53265085b6e\` FOREIGN KEY (\`campeonatoId\`) REFERENCES \`campeonato\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`plataforma_campeonatos\` DROP FOREIGN KEY \`FK_604ef6086d4920db53265085b6e\``);
        await queryRunner.query(`ALTER TABLE \`plataforma_campeonatos\` DROP FOREIGN KEY \`FK_3fbd50b9063376a22cca1e1ead0\``);
        await queryRunner.query(`ALTER TABLE \`game_plataforma\` DROP FOREIGN KEY \`FK_3db73e2db5b32cbfddd83361daf\``);
        await queryRunner.query(`ALTER TABLE \`game_plataforma\` DROP FOREIGN KEY \`FK_581d8df4198eb22f7a41e9aa140\``);
        await queryRunner.query(`ALTER TABLE \`participantes\` DROP FOREIGN KEY \`FK_ed7f492dccc45895b2c038a4cde\``);
        await queryRunner.query(`ALTER TABLE \`participantes\` DROP FOREIGN KEY \`FK_17ce2ad4246009d6fbf75a61306\``);
        await queryRunner.query(`ALTER TABLE \`lives\` DROP FOREIGN KEY \`FK_2835b618262ce71c6d32a152755\``);
        await queryRunner.query(`ALTER TABLE \`lives\` DROP FOREIGN KEY \`FK_70ab490d6f2d77e9d12244e98a1\``);
        await queryRunner.query(`ALTER TABLE \`campeonato\` DROP FOREIGN KEY \`FK_a10d64c63b77e45e33a00e48d25\``);
        await queryRunner.query(`DROP INDEX \`IDX_604ef6086d4920db53265085b6\` ON \`plataforma_campeonatos\``);
        await queryRunner.query(`DROP INDEX \`IDX_3fbd50b9063376a22cca1e1ead\` ON \`plataforma_campeonatos\``);
        await queryRunner.query(`DROP TABLE \`plataforma_campeonatos\``);
        await queryRunner.query(`DROP INDEX \`IDX_3db73e2db5b32cbfddd83361da\` ON \`game_plataforma\``);
        await queryRunner.query(`DROP INDEX \`IDX_581d8df4198eb22f7a41e9aa14\` ON \`game_plataforma\``);
        await queryRunner.query(`DROP TABLE \`game_plataforma\``);
        await queryRunner.query(`DROP INDEX \`IDX_ed7f492dccc45895b2c038a4cd\` ON \`participantes\``);
        await queryRunner.query(`DROP INDEX \`IDX_17ce2ad4246009d6fbf75a6130\` ON \`participantes\``);
        await queryRunner.query(`DROP TABLE \`participantes\``);
        await queryRunner.query(`DROP INDEX \`IDX_de8b5a785e91b33ae3b1ae7342\` ON \`plataforma\``);
        await queryRunner.query(`DROP TABLE \`plataforma\``);
        await queryRunner.query(`DROP INDEX \`IDX_9c5f86eae095afcba21b0928ee\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_8e4ea639c304b85781120f1eb6\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP TABLE \`lives\``);
        await queryRunner.query(`DROP INDEX \`IDX_090ad23bd87973e4c8cef42fe2\` ON \`games\``);
        await queryRunner.query(`DROP TABLE \`games\``);
        await queryRunner.query(`DROP TABLE \`campeonato\``);
    }

}
