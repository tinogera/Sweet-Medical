import mongoose from "mongoose";

export async function connectToDB(dbConnectionString, dbName) {

  for (let i = 0; i < 3; ++i) {
    try {
      await mongoose.connect(`${dbConnectionString}/${dbName}`)
      console.log('Se conecto a la base de datos con éxito.')
      break;
    } catch (err) {
      console.warn(`Intento ${i + 1}: La conexion a MongoDB falló, reintentando...`);
      console.error("Error:", err.message);
      if (i >= 2) {
        console.error("No se ha podido establecer una conexion con MongoDB")
        process.exit(1);
      }
    }
  }
}
