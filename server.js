const express = require("express");
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const schema = require("./graphql/schema");

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome");
});

const options = {
  swaggerDefinition: {
    info: {
      title: "My API",
      version: "1.0.0",
      description: "My API with Swagger",
    },
  },
  apis: ["./graphql/*.js"],
};
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, options)
);

const whitelist = [
  "https://my-test1uno.herokuapp.com/",
  "http://localhost:3000",
];
const optionsCors = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("no permitido"));
    }
  },
};
app.use(cors(optionsCors));
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(port);
