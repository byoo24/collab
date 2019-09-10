
export default `
    type User {
        id: ID!
        username: String!
        email: String!
        password: String!
        boards: [Board!]!
    }
    type Token {
        token: String
    }
    type Query {
        users: [User!]!
        user(id: ID!): User
    }
    type Mutation {
        signup(username: String! email: String! password: String! password2: String): User
        login(username: String! password: String!): User!
    }
    
`
