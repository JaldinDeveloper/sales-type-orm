import { DataSource } from 'typeorm';

export const dataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'salesdb',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
});