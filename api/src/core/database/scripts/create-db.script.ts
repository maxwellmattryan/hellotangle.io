import { createConnection, EntitySchema } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

type Entity = Function | string | EntitySchema<any>;

export async function createDB(entities: Entity[]) {
    const connectionOpts = {
        type: 'postgres',
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: `${process.env.DB_NAME}_test`,
        entities: entities,
        namingStrategy: new SnakeNamingStrategy(),
        synchronize: true
    };
    // @ts-ignore
    const db = await createConnection(connectionOpts);

    const dbName = process.env.DB_NAME;
    await db.query(`DROP DATABASE IF EXISTS ${dbName}`);
    await db.query(`CREATE DATABASE ${dbName}`);
}
