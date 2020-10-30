const express = require("express");
const {graphqlHTTP} = require("express-graphql");
const schema = require("./schema/schema");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
//allow cross-origin requests
app.use(cors());
mongoose.connect("mongodb://localhost:27017/userDB", {useNewUrlParser: true, useUnifiedTopology: true});

app.use("/graphql", graphqlHTTP({
  schema,
  graphiql:true
}));

// if(process.env.NODE_ENV==="production"){
//   app.use(express.static("Client/build"));
// }

let port = process.env.PORT;
if (port == null || port == "") {
  port = 4000;
}
app.listen(port, ()=> {
  console.log("Server is up and running on 4000!");
}
);
