const mongoose = require("mongoose");

const URI = "mongodb://localhost/directv";

mongoose
  .connect(URI)
  .then(db => console.log("DB is conected"))
  .catch(err => console.error(err));

module.exports = mongoose;

// cedula
// nombre
// apellido
// fecha de nacimiento
// telefono
// direccion
//  tipo_ser
//  dios-humano
