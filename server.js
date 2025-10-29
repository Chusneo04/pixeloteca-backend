const express = require('express');
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 5000;
const authRoutes = require("./routes/auth");
const recuperar_claveRoutes = require('./routes/recuperar_clave');
const perfilRoutes = require('./routes/perfil');
const cors = require("cors");
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("Conectado a MongoDB"))
.catch((error) => console.log("Error al conectar a MongoDB:", error));

app.use(cors());
app.use(express.json());

app.use("/", authRoutes);
app.use("/", recuperar_claveRoutes);
app.use('/', perfilRoutes);

app.listen(PORT, () => {
    console.log(`Servidor backend escuchando en el puerto ${PORT}`);
    
});