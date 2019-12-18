const { gql } = require("apollo-server");

module.exports = gql`
  """
  Queries
  """
  type Query {
    """
    Me represents the current user based off of the authorization token sent from headers
    """
    me: User!
  }

  # """
  # Mutations
  # """
  # # type Mutation {

  # # }

  """
  User Type
  """
  type User {
    id: ID!
    email: String!
    password: String!
    username: String!
    firstName: String!
    lastName: String!
    state: String!
    city: String!
    zip: Int!
    address: String!
    address2: String!
    country: String!
    phoneNumber: Int!
    profilePicture: String!
  }
`;
