import express from 'express';
import path from 'path';
import { ApolloServer, gql } from 'apollo-server-express';
import typeDefs from './graphql/graphql-types';
import resolvers from './graphql/graphql-resolvers';
import db from './models';
import passport from 'passport';

import http from 'http';


import apiUserRoutes from './routes/api/users';
import apiBoardRoutes from './routes/api/boards';
import apiListRoutes from './routes/api/lists';
import apiCardRoutes from './routes/api/cards';

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

app.use(express.static(path.join(__dirname, "../public")));

// Body Parser Middleware
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());

// app.use('/api/users', userRoutes);
apiUserRoutes(app, db);
apiBoardRoutes(app, db);
apiListRoutes(app, db);
apiCardRoutes(app, db);

app.get('/', (req, res) => {
    res.render('index');
})


server.applyMiddleware({ app });


const eraseDatabaseOnSync = false;
const port = process.env.PORT || 4000;
db.sequelize.sync({ force: eraseDatabaseOnSync }).then(() => {
    http.createServer(app).listen({ port }, () =>
        console.log(`🚀 Server ready at http://localhost:${port}`)
    );
});
