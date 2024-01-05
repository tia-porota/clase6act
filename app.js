const express = require("express");
const { auth } = require("express-oauth2-jwt-bearer");
const routerProductos = require("./routes/routerProductos");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(express.json());

const jwtCheck = auth({
  audience: 'http://localhost:3000/productos',
  issuerBaseURL: 'https://dev-ja6zptmzzg3yocc3.us.auth0.com/',
  tokenSigningAlg: 'RS256'
});

app.use("/productos", jwtCheck, routerProductos);
app.use(errorHandler);

const port = process.env.port || 3000;

app.listen(port, () => {
  console.log(`Server iniciado en puerto ${port}`);
});
