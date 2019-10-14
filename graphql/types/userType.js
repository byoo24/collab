
module.exports = `
    type User {
        id: ID!
        username: String!
        email: String!
        password: String!
        boards: [Board!]!
        personalBoardIds: [String!]!
    }
    type Query {
        users: [User!]!
        user(id: ID!): User
    }
`
