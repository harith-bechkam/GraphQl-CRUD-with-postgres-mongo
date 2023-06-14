const { gql } = require('apollo-server')

module.exports = gql`
type Dress{
    _id: String
    name: String
    type: String
    size: String
    location: String
    currdate: String
    createdAt: String
    updatedAt: String
}

input DressInput{
    name: String
    type: String
    size: String
    location: String
    currdate: String
}

type Simple{
    status: Int,
    operation: String,
    msg: String
}

type Query{
    simple: Simple
    errormsg(msg: String!): Simple
    getparticulardress(id: ID!): Dress
    getalldresses: [Dress]
}

type Mutation{
    createdress(dressinput: DressInput): Dress!
    updatedress(id:ID!, dressinput: DressInput): Boolean
    deletedress(id:ID!): Boolean
}

type Subscription{
    firstsubscribemethod: Simple
}

`