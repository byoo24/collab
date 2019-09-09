import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import typeDefs from './graphql/graphql-types';
import resolvers from './graphql/graphql-resolvers';
import db from './models';


const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: { db },
    formatError: (err) => {
        console.log(err.message);
        return err.message
    }
});

const app = express();
server.applyMiddleware({ app });

app.use(express.static("dist/public"));

const eraseDatabaseOnSync = true;
db.sequelize.sync({ force: eraseDatabaseOnSync }).then(() => {
    app.listen({ port: 4000 }, () =>
        console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
    );
});
