import { registerAs } from '@nestjs/config';

export default registerAs('database', () => {
  console.log('HOOOOOOOOOST', process.env.POSTGRES_HOST);
  console.log('DB_PORT', process.env.POSTGRES_PORT);
  return {
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    name: process.env.POSTGRES_DB,
  };
});
