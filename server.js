const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
const cors = require('cors');


const port = process.env.PORT || 8080;
const app = express();

const path = require('path');

//swagger
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const swaggerSpec = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "api-doc",
      version: "1.0.0"
    },
    servers: [
      {
        url: "http://localhost:9000"
      }
    ]
  },
  apis: [`${path.join(__dirname, "./routes/*.js")}`],
};

const corsOptions = {
  origin: 'http://localhost:8080', // Cambia esto por el origen correcto de tu aplicación cliente
  optionsSuccessStatus: 200 // Algunos navegadores antiguos (IE11, varias SmartTVs) interpretarán 204 como un error, por lo que debes enviar 200
}

app.use(cors(corsOptions));

app.use("/api-doc", swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(swaggerSpec)))

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  })
  .use('/', require('./routes'));

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});
