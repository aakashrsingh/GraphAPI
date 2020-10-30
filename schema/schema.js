const graphql = require("graphql");
const _ = require("lodash");
const User = require("../model/user");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLNonNull,
  GraphQLList
} = graphql;

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: {
      type: GraphQLID
    },
    fname: {
      type: GraphQLString
    },
    lname: {
      type: GraphQLString
    },
    email: {
      type: GraphQLString
    },
    password: {
      type: GraphQLString
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    user: {
      type: UserType,
      args: {
        email: {
          type: GraphQLString
        }
      },
      resolve(parent, args) {
        //use args to fetch data from db
        return User.findOne({email:args.email});
      }
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, arg){
        return User.find({});
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name:"Mutation",
  fields: {
    addUser: {
      type: UserType,
      args:{ fname:{type:new GraphQLNonNull(GraphQLString)},
      lname: {type:new GraphQLNonNull(GraphQLString)},
    email: {type:new GraphQLNonNull(GraphQLString)},
  password: {type:new GraphQLNonNull(GraphQLString)}},
  resolve(parents, args){
    let user = new User({
      fname:args.fname,
      lname:args.lname,
      email:args.email,
      password:args.password
    });
    return user.save();
  }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation:Mutation
});
