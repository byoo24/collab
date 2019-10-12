"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.server = void 0;

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var _apolloServerExpress = require("apollo-server-express");

var _graphqlTypes = _interopRequireDefault(require("./graphql/graphql-types"));

var _graphqlResolvers = _interopRequireDefault(require("./graphql/graphql-resolvers"));

var _models = _interopRequireDefault(require("./models"));

var _passport = _interopRequireDefault(require("passport"));

var _users = _interopRequireDefault(require("./routes/api/users"));

var _boards = _interopRequireDefault(require("./routes/api/boards"));

var _lists = _interopRequireDefault(require("./routes/api/lists"));

var _cards = _interopRequireDefault(require("./routes/api/cards"));

var server = new _apolloServerExpress.ApolloServer({
  typeDefs: (0, _apolloServerExpress.gql)(_graphqlTypes["default"]),
  resolvers: _graphqlResolvers["default"],
  context: {
    db: _models["default"]
  },
  formatError: function formatError(err) {
    console.log(err);
    return err.message;
  }
});
exports.server = server;
var app = (0, _express["default"])(); // app.use(express.static(path.join(__dirname, "../public")));
// Body Parser Middleware

app.use(_express["default"].urlencoded({
  extended: false
}));
app.use(_express["default"].json());
app.use(_passport["default"].initialize()); // app.use('/api/users', userRoutes);

(0, _users["default"])(app, _models["default"]);
(0, _boards["default"])(app, _models["default"]);
(0, _lists["default"])(app, _models["default"]);
(0, _cards["default"])(app, _models["default"]);
app.get('/', function (req, res) {
  res.render('index');
});
server.applyMiddleware({
  app: app
});
var eraseDatabaseOnSync = false;
var port = process.env.PORT || 4000;

_models["default"].sequelize.sync({
  force: eraseDatabaseOnSync
}).then(function () {
  app.listen({
    port: port
  }, function () {
    return console.log("\uD83D\uDE80 Server ready at http://localhost:".concat(port));
  });
});