
export default `
    type List {
        id: ID!
        name: String!
        boardId: ID!
        board: Board!
        cards: [Card!]!
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
