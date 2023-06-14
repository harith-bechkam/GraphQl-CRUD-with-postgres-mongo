const Dress = require('../model')
const { UserInputError, ApolloError, AuthenticationError } = require('apollo-server')
const { skip, combineResolvers } = require('graphql-resolvers')
// const { combineResolvers } = require('apollo-resolvers')

/**
 * https://github.com/lucasconstantino/graphql-resolvers/blob/master/docs/API.md
 * two types of resolvers lib is present
 *    graphql-resolvers
 *    apollo-resolvers
 */

const isAuthenticated = (parent, args, context) => context.authenticated == "success" ? skip : new Error('Not authenticated')

module.exports = {
    Query: {
        simple: combineResolvers(
            isAuthenticated,
            async (parent, args, context) => {
                let { request, response, pubsub } = context
                console.log(request, response, "---")

                pubsub.publish("CALLED", {
                    "status": 200,
                    "operation": "list",
                    "msg": "successfully listed"
                })

                return {
                    "status": 200,
                    "operation": "list",
                    "msg": "successfully listed"
                }
            }
        ),
        async errormsg(parent, args) {
            if (args.msg == "correct") {
                return {
                    "status": 200,
                    "operation": "list",
                    "msg": "successfully listed"
                }
            }
            if (args.msg == "userinputerror") {
                throw new UserInputError("UserInputError has been occured")
            }
            if (args.msg == "apolloerror") {
                throw new ApolloError("ApolloError has been occured", args.msg)

            }
        },
        async getparticulardress(parent, { id }) {
            let data = await Dress.findById(id)
            return data
        },

        async getalldresses() {
            let data = await Dress.find()
            return data
        }

    },
    Mutation: {

        async createdress(parent, { dressinput: { name, type, size, location, currdate } }) {
            const createdress = new Dress({ name, type, size, location, currdate })
            const res = await createdress.save()
            console.log(res._doc, "---")
            return {
                ...res._doc
            }
        },

        async updatedress(parent, { id, dressinput: { name, type, size, location, currdate } }) {
            const updatedress = await Dress.updateOne({ _id: id }, { $set: { name, type, size, location, currdate } })
            console.log(updatedress, "----")
            return updatedress.modifiedCount
        },

        async deletedress(parent, { id }) {
            const deletedress = await Dress.deleteOne({ _id: id })
            console.log(deletedress, "----")
            return deletedress.deletedCount
        }
    },
    Subscription: {
        firstsubscribemethod: {
            async subscribe(parent, args, context) {
                let { pubsub } = context
                return pubsub.asyncIterator("CALLED")
            }
        }
    }

}