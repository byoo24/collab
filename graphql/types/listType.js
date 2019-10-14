
module.exports = `
    type List {
        id: ID!
        name: String!
        board: Board!
        boardId: ID!
        cards: [Card!]!
        cardIds: [String!]!
        createdAt: String
        updatedAt: String
    }
    type Query {
        lists: [List!]!
        list(id: ID!): List
    }
    type Mutation {
        createList(name: String!, boardId: ID!, listIds: [String]): List!
        updateList(id: ID!, name: String): List!
    }
`
