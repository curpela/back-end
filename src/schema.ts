import { gql } from "apollo-server";

export default gql`
  scalar DateTime

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
    # User
    createUser(data: UserCreateInput!): AuthPayload!
    loginUser(data: UserLoginInput!): AuthPayload!
    updateUser(data: UserUpdateInput!): User!
  }

  """
  User Type
  """
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    password: String
    profilePicture: String!
  }

  """
  Required input to create a user
  """
  input UserCreateInput {
    email: String!
    password: String!
  }

  """
  Required input to login a user
  """
  input UserLoginInput {
    emailOrUsername: String!
    password: String!
  }

  """
  Input to update a user
  """
  input UserUpdateInput {
    firstName: String
    lastName: String
    email: String
    password: String
    username: String
    profilePicture: String
  }

  """
  Authentication payload for successful register or login
  """
  type AuthPayload {
    token: String!
    user: User!
  }
`;
