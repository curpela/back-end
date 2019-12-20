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

  """
  Mutations
  """
  type Mutation {
    createUser(data: UserCreateInput!): AuthPayload!
    loginUser(data: UserLoginInput!): AuthPayload!
    updateUser(data: UserUpdateInput!): User!
    followUser(
      """
      ID of user to be followed
      """
      id: ID!
    ): Follower
    unfollowUser(
      """
      ID of user to be unfollowed
      """
      id: ID!
    ): Follower
  }

  """
  User Type
  """
  type User {
    id: ID!
    email: String!
    password: String
    username: String!
    firstName: String!
    lastName: String!
    state: String
    city: String
    zip: Int
    address: String
    address2: String
    country: String
    phoneNumber: Int
    profilePicture: String
    followers: [Follower!]!
    following: [Follower!]!
    followerCount: Int!
    followingCount: Int!
  }

  input UserCreateInput {
    firstName: String!
    lastName: String!
    username: String!
    email: String!
    password: String!
  }

  input UserLoginInput {
    emailOrUsername: String!
    password: String!
  }

  input UserUpdateInput {
    email: String
    password: String
    username: String
    firstName: String
    lastName: String
    state: String
    city: String
    zip: Int
    address: String
    address2: String
    country: String
    phoneNumber: Int
  }

  """
  Authentication payload
  """
  type AuthPayload {
    token: String!
    user: User!
  }

  type Follower {
    id: ID!
    following: User!
    follower: User!
  }
`;
