
export default `
    type Board {
        id: ID!
        name: String!
        description: String
        userId: ID!
        user: User!
        lists: [List!]!
        listIds: [String!]!
    }
    type Query {
        boards(userId: ID!): [Board!]!
        board(id: ID!): Board
    }
    type Mutation {
        createBoard(name: String!, description: String, userId: ID! personalBoardIds: [String]): Board
        updateBoard(id: ID!, name: String, description: String): Board!
    }
`
