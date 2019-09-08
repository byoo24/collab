import { mergeResolvers } from 'merge-graphql-schemas';
import userResolver from './resolvers/userResolver';

const resolvers = [
    userResolver,
];

export default mergeResolvers(resolvers);