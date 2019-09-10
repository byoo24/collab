import { mergeResolvers } from 'merge-graphql-schemas';
import userResolver from './resolvers/userResolver';
import boardResolver from './resolvers/boardResolver';
import listResolver from './resolvers/listResolver';
import cardResolver from './resolvers/cardResolver';

const resolvers = [
    userResolver,
    boardResolver,
    listResolver,
    cardResolver
];

export default mergeResolvers(resolvers);