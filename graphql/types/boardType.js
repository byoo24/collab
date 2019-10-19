
module.exports = `
    type Board {
        id: ID!
        name: String!
        description: String
        boardType: String
        bgColor: String
        user: User!
        userId: ID!
        lists: [List!]!
        listIds: [String!]!
    }
    input UserBoardIds {
        id: String
    }
    type Query {
        boards(userId: ID!): [Board!]!
        board(id: ID!): Board
    }
    type Mutation {
        deleteBoard(id: ID!): Board
    }
`
