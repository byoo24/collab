const { mergeResolvers } = require('merge-graphql-schemas');
const userResolver = require('./resolvers/userResolver');
const boardResolver = require('./resolvers/boardResolver');
const listResolver = require('./resolvers/listResolver');
const cardResolver = require('./resolvers/cardResolver');

const resolvers = [
    userResolver,
    boardResolver,
    listResolver,
    cardResolver
];

module.exports = mergeResolvers(resolvers);