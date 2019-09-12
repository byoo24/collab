
export default `
    type Board {
        id: ID!
        name: String!
        description: String
        userId: ID!
        user: User!
        lists: [List!]!
    }
    type Query {
        boards: [Board!]!
        board(id: ID!): Board
    }
    type Mutation {
        createBoard(name: String!, description: String, userId: ID!): Board!
        updateBoard(id: ID!, name: String, description: String): Board!
    }
`
