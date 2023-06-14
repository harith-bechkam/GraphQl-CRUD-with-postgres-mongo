/**
 * So this app is complete appolo server
 * In Here I didn't use express
 * 
 * if you need express
 * use below link's
 * https://github.com/apollographql/apollo-server
 * https://www.apollographql.com/docs/apollo-server/api/express-middleware/
 * https://www.youtube.com/watch?v=dqcHU5oAuwM - with subscriptions
 * 
 */

const { ApolloServer } = require('apollo-server')
const { PubSub } = require('graphql-subscriptions')
const db = require('./dbconfig')
require("dotenv").config();

const typeDefs = require('./apollo/typeDefs')
const resolvers = require('./apollo/resolvers')

const pubsub = new PubSub()
const server = new ApolloServer({
    typeDefs,
    resolvers,
    formatError: (err) => {
        var obj = {}
        obj['customError'] = `${err.message}---`
        return { ...obj, ...err }
    },
    context: async ({ req, res }) => {
        if (req) {
            return {
                request: req,
                response: res,
                pubsub,
                authenticated: "success"
            }
        }
    }
    // playground: {
    //     endpoint: 'http://localhost:3000/graphql',
    //     settings: {
    //         'editor.theme': 'Dark'
    //     }
    // }
})



server.listen(process.env.port)
    .then((abc) => { console.log(`server is listening on ${abc.url}`) })


