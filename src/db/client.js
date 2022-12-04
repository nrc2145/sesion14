import { connect, connection, mongo } from 'mongoose';
import { setUpMongoDBProcessWatchers } from './watchers';

const listDatabases = async () => {
  const databasesList = await new mongo.Admin(connection.db).listDatabases();
  console.log('Bases de datos:');
  databasesList.databases.forEach((db) => console.log(`    - ${db.name}`));
  console.log('');
};

export const connectToMongoDB = async () => {
  const connectionString = process.env.MONGO_DB_SRV;
  // const connectionString =    'mongodb+srv://angelo:misiontic2022@cluster0.u4dq2.mongodb.net/test';
  try {
    console.log('Conectandose a MongoDB...');
    await connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    connection.on('error', console.error.bind(console, 'Error de conexión: '));
    connection.once('open', () => console.log('Conectado a MongoDB'));

    await listDatabases();
  } catch (e) {
    console.log('Error conectandose a MongoDB');
    console.error(e);
  } finally {
    setUpMongoDBProcessWatchers();
  }
};
