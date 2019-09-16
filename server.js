import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import typeDefs from './graphql/graphql-types';
import resolvers from './graphql/graphql-resolvers';
import db from './models';
import passport from 'passport';

import apiUserRoutes from './routes/api/users';

export const server = new ApolloServer({
    typeDefs: gql(typeDefs),
    resolvers,
    context: { db },
    formatError: (err) => {
        console.log(err);
        return err.message
    }
});

const app = express();

app.use(express.static("dist/public"));

// Body Parser Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());

// app.use('/api/users', userRoutes);
apiUserRoutes(app, db);


server.applyMiddleware({ app });


const eraseDatabaseOnSync = true;
db.sequelize.sync({ force: eraseDatabaseOnSync }).then(() => {
    app.listen({ port: 4000 }, () =>
        console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
    );
});
