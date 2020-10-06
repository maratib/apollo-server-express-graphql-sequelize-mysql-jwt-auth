const { gql } = require('apollo-server-express');

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # This "User" type defines the queryable fields for every user in our data source.
  type User {
    id: Int!
    username: String!
    email: String!
  }
  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query { 
	  me: User
  }
  type Mutation { 
    signup (username: String!, email: String!, password: String!): String
    login (email: String!, password: String!): String
  }
`;

module.exports = typeDefs;