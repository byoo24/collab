import { mergeTypes } from 'merge-graphql-schemas';
import userType from './types/userType';
import boardType from './types/boardType';
import listType from './types/listType';
import cardType from './types/cardType';

const types = [
    userType,
    boardType,
    listType,
    cardType
];

export default mergeTypes(types);