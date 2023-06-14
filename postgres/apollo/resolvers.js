const { Op } = require('sequelize');
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
        async getparticulardress(parent, args) {

            let data = await Dress.findAll({
                where: {
                    id: {
                        [Op.eq]: args.id
                    },
                },
                raw: true
            })
            return data[0]
        },

        async getalldresses() {
            let data = await Dress.findAll()
            return data
        }

    },
    Mutation: {

        async createdress(parent, { dressinput: { name, type, size, location, currdate } }) {
            const createdress = await Dress.create({ name, type, size, location, currdate })
            return createdress
        },

        async updatedress(parent, { id, dressinput: { name, type, size, location, currdate } }) {
            const updatedress = await Dress.update({ name, type, size, location, currdate }, {
                where: {
                    id
                }
            })
            console.log(updatedress, "----")
            return updatedress[0]
        },

        async deletedress(parent, args) {
            const deletedress = await Dress.destroy({ where: { id: args.id } })
            console.log(deletedress, "----")
            return deletedress
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