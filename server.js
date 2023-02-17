const express = require("express");
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const schema = require("./graphql/schema");

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

const whitelist = [
  "http://localhost:5432",
  " https://my-test1uno.herokuapp.com/",
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

app.get("/", (req, res) => {
  res.send("Welcome");
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

const options = {
  swaggerDefinition: {
    info: {
      title: "My APITEST1",
      version: "1.0.0",
      description: "My API with Swagger and Graphql + Node",
    },
  },
  apis: ["./routes/*.js"],
};
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, options)
);

app.listen(port);
