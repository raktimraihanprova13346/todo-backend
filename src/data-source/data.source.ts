import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'mariadb',
  host: '100.90.56.106',
  port: 3306,
  username: 'raktim',
  password: 'passw0rd',
  database: 'todo_management',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true,
});
