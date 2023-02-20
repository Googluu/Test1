const express = require("express");
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const schema = require("./graphql/schema");
// consumir express
const app = express();
app.use(
  cors({
    origin: [
      "https://my-test1uno.herokuapp.com/graphql",
      "http://localhost:3000",
      "http://localhost:5173",
    ],
    Credential: true,
  })
);

const port = process.env.PORT || 3000;
app.use(express.json());

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

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

app.listen(port);
