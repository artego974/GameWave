import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1753986506649 implements MigrationInterface {
    name = 'CreateTables1753986506649'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`lives\` (\`id\` int NOT NULL AUTO_INCREMENT, \`img\` text NOT NULL, \`link\` text NOT NULL, \`titulo\` varchar(255) NOT NULL, \`subtitulo\` varchar(255) NOT NULL, \`userId\` int NULL, \`gameId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`games\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` text NOT NULL, UNIQUE INDEX \`IDX_28639e6be5f363b0257ec04e14\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`campeonato\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`fotoCampeonato\` varchar(255) NULL, \`description\` text NULL, \`numberOfPlayers\` int NOT NULL, \`date\` date NOT NULL, \`time\` time NOT NULL, \`gameId\` int NULL, \`hostId\` int NULL, \`participantesId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(100) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`nickName\` varchar(100) NOT NULL, \`fotoPerfil\` varchar(255) NOT NULL DEFAULT '../../assets', \`banerPerfil\` varchar(255) NOT NULL DEFAULT '../../assets', \`participantesId\` int NULL, UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), UNIQUE INDEX \`IDX_44b6d4cb3fe916de38974ed9c2\` (\`nickName\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`participantes\` (\`id\` int NOT NULL AUTO_INCREMENT, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`plataforma\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_468e8730e4e7611c0e648e11c0\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`game_plataforma\` (\`plataformaId\` int NOT NULL, \`gamesId\` int NOT NULL, INDEX \`IDX_581d8df4198eb22f7a41e9aa14\` (\`plataformaId\`), INDEX \`IDX_3db73e2db5b32cbfddd83361da\` (\`gamesId\`), PRIMARY KEY (\`plataformaId\`, \`gamesId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`plataforma_campeonatos\` (\`plataformaId\` int NOT NULL, \`campeonatoId\` int NOT NULL, INDEX \`IDX_3fbd50b9063376a22cca1e1ead\` (\`plataformaId\`), INDEX \`IDX_604ef6086d4920db53265085b6\` (\`campeonatoId\`), PRIMARY KEY (\`plataformaId\`, \`campeonatoId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`lives\` ADD CONSTRAINT \`FK_70ab490d6f2d77e9d12244e98a1\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`lives\` ADD CONSTRAINT \`FK_2835b618262ce71c6d32a152755\` FOREIGN KEY (\`gameId\`) REFERENCES \`games\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`campeonato\` ADD CONSTRAINT \`FK_bdf0f3c12bd09625083021e6acc\` FOREIGN KEY (\`gameId\`) REFERENCES \`games\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`campeonato\` ADD CONSTRAINT \`FK_a10d64c63b77e45e33a00e48d25\` FOREIGN KEY (\`hostId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`campeonato\` ADD CONSTRAINT \`FK_c9f189576dc035e8aac721e9b02\` FOREIGN KEY (\`participantesId\`) REFERENCES \`participantes\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_1848adea82b6c3b29d7f2897c01\` FOREIGN KEY (\`participantesId\`) REFERENCES \`participantes\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
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
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_1848adea82b6c3b29d7f2897c01\``);
        await queryRunner.query(`ALTER TABLE \`campeonato\` DROP FOREIGN KEY \`FK_c9f189576dc035e8aac721e9b02\``);
        await queryRunner.query(`ALTER TABLE \`campeonato\` DROP FOREIGN KEY \`FK_a10d64c63b77e45e33a00e48d25\``);
        await queryRunner.query(`ALTER TABLE \`campeonato\` DROP FOREIGN KEY \`FK_bdf0f3c12bd09625083021e6acc\``);
        await queryRunner.query(`ALTER TABLE \`lives\` DROP FOREIGN KEY \`FK_2835b618262ce71c6d32a152755\``);
        await queryRunner.query(`ALTER TABLE \`lives\` DROP FOREIGN KEY \`FK_70ab490d6f2d77e9d12244e98a1\``);
        await queryRunner.query(`DROP INDEX \`IDX_604ef6086d4920db53265085b6\` ON \`plataforma_campeonatos\``);
        await queryRunner.query(`DROP INDEX \`IDX_3fbd50b9063376a22cca1e1ead\` ON \`plataforma_campeonatos\``);
        await queryRunner.query(`DROP TABLE \`plataforma_campeonatos\``);
        await queryRunner.query(`DROP INDEX \`IDX_3db73e2db5b32cbfddd83361da\` ON \`game_plataforma\``);
        await queryRunner.query(`DROP INDEX \`IDX_581d8df4198eb22f7a41e9aa14\` ON \`game_plataforma\``);
        await queryRunner.query(`DROP TABLE \`game_plataforma\``);
        await queryRunner.query(`DROP INDEX \`IDX_468e8730e4e7611c0e648e11c0\` ON \`plataforma\``);
        await queryRunner.query(`DROP TABLE \`plataforma\``);
        await queryRunner.query(`DROP TABLE \`participantes\``);
        await queryRunner.query(`DROP INDEX \`IDX_44b6d4cb3fe916de38974ed9c2\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP TABLE \`campeonato\``);
        await queryRunner.query(`DROP INDEX \`IDX_28639e6be5f363b0257ec04e14\` ON \`games\``);
        await queryRunner.query(`DROP TABLE \`games\``);
        await queryRunner.query(`DROP TABLE \`lives\``);
    }

}
