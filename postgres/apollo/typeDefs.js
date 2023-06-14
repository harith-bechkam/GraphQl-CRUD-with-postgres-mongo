const { gql } = require('apollo-server')

module.exports = gql`
type Dress{
    id: Int
    name: String
    type: String
    size: String
    location: String
    currdate: String
    is_deleted:Boolean
    created_on: String
    updated_on: String
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
    updatedress(id:ID!, dressinput: DressInput): Int
    deletedress(id:ID!): Int
}

type Subscription{
    firstsubscribemethod: Simple
}

`