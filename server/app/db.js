import { connect } from "mongoose";

export async function connectToDB(dbConnectionString) {
  // Hace un retry de 3 intentos
  for (let i = 0; i < 3; ++i) {
    try {
      await connect(dbConnectionString, {
        user: 'root',
        pass: 'root',
        dbName: 'sweetmedical'
      });
      console.log('Se conecto a la base de datos con éxito.')
      break;
    } catch (err) {
      console.warn(`${i} La conexion a MongoDB falló, reintentando...`, i);
      if (i >= 2) {
        console.error("No se ha podido establecer un conexion con MongoDB")
        // Mato todo el proceso
        process.exit(1);
      }
    }
  }

}
