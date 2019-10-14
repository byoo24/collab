
export default `
    type Board {
        id: ID!
        name: String!
        description: String
        boardType: String
        user: User!
        userId: ID!
        lists: [List!]!
        listIds: [String!]!
        createdAt: String
        updatedAt: String
    }
    input UserBoardIds {
        id: String
    }
    type Query {
        boards(userId: ID!): [Board!]!
        board(id: ID!): Board
    }
    type Mutation {
        createBoard(name: String!, description: String, userId: ID! personalBoardIds: [UserBoardIds]): Board
        updateBoard(id: ID!, name: String, description: String): Board!
    }
`
