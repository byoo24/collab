import { mergeTypes } from 'merge-graphql-schemas';
import userType from './types/userType';

const types = [
    userType,
];

export default mergeTypes(types);