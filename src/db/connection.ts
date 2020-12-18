import { createConnection } from 'typeorm';

createConnection().then((res) => console.log('conectado com sucesso')).catch((err) => console.log(err.message));
