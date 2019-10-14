const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const typeDefs = require('./graphql/graphql-types');
const resolvers = require('./graphql/graphql-resolvers');
const db = require('./models/index');



const server = new ApolloServer({ 
    typeDefs: gql(typeDefs), 
    resolvers,
    context: { db }
});

const app = express();
// app.use(express.static(path.join(__dirname, "../public")));



// Body Parser Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

server.applyMiddleware({ app });


const eraseDatabaseOnSync = true;
const port = process.env.PORT || 4000;
db.sequelize.sync({ force: eraseDatabaseOnSync }).then(() => {
    app.listen({ port }, () =>
        console.log(`🚀 Server ready at http://localhost:${port}`)
    );
});
// app.listen({ port }, () => 
//     console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
// );

