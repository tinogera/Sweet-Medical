import mongoose from "mongoose";

export async function connectToDB(dbConnectionString, dbName) {

  for (let i = 0; i < 3; ++i) {
    try {
      let cleanedConnectionString = dbConnectionString.trim();
      
      // Separamos los parámetros (si existen) de la URL principal
      let [baseUrl, queryParams] = cleanedConnectionString.split('?');

      // Eliminamos cualquier barra diagonal al final de la URL base
      if (baseUrl.endsWith('/')) {
        baseUrl = baseUrl.slice(0, -1);
      }

      // Obtenemos la parte del host y credenciales (después del protocolo)
      const protocolMatch = baseUrl.match(/^(mongodb(?:\+srv)?:\/\/)(.*)$/);
      if (protocolMatch) {
        const protocol = protocolMatch[1];
        const remaining = protocolMatch[2];
        
        // Si hay una barra diagonal en la parte restante, significa que ya tiene un nombre de base de datos
        const slashIndex = remaining.indexOf('/');
        if (slashIndex !== -1) {
          const hostPart = remaining.substring(0, slashIndex);
          baseUrl = `${protocol}${hostPart}/${dbName}`;
        } else {
          baseUrl = `${protocol}${remaining}/${dbName}`;
        }
      } else {
        baseUrl = `${baseUrl}/${dbName}`;
      }

      // Reconstruimos la URL completa
      const url = queryParams ? `${baseUrl}?${queryParams}` : baseUrl;

      await mongoose.connect(url);
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
