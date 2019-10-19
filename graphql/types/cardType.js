module.exports = `
    type Card {
        id: ID!
        name: String!
        description: String
        list: List!
        listId: ID!
        createdAt: String
        updatedAt: String
    }
    type Query {
        cards: [Card!]!
        card(id: ID!): Card
    }
    type Mutation {
        deleteCard(id: ID!): Card
    }
`
