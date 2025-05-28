import 'reflect-metadata';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root', // seu usuário do MySQL
    password: 'root', // sua senha
    database: 'aula_typeorm',
    synchronize: true, // CUIDADO! True no desenvolvimento, False em produção
    logging: true,
    entities: ["src/models/*.ts"],
}); 