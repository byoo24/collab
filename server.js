const path = require('path');
const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const typeDefs = require('./graphql/graphql-types');
const resolvers = require('./graphql/graphql-resolvers');
const db = require('./models/index');
const passport = require('passport');

const apiUserRoutes = require('./routes/api/users');
const apiBoardRoutes = require('./routes/api/boards');
const apiListRoutes = require('./routes/api/lists');
const apiCardRoutes = require('./routes/api/cards');



const server = new ApolloServer({ 
    typeDefs: gql(typeDefs), 
    resolvers,
    context: { db }
});


const app = express();
// app.use(express.static(path.join(__dirname, "../public")));


if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'frontend/build')));
    app.get('/', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    })
}


// Body Parser Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());

// app.use('/api/users', userRoutes);
apiUserRoutes(app, db);
apiBoardRoutes(app, db);
apiListRoutes(app, db);
apiCardRoutes(app, db);

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

