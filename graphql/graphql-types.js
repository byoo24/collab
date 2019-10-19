const { mergeTypes } = require('merge-graphql-schemas');
const userType = require('./types/userType');
const boardType = require('./types/boardType');
const listType = require('./types/listType');
const cardType = require('./types/cardType');

const types = [
    userType,
    boardType,
    listType,
    cardType
];
 
module.exports = mergeTypes(types);
