const { gql } = require("apollo-server");

module.exports = gql`
  scalar DateTime

  """
  Queries
  """
  type Query {
    """
    Me represents the current user based off of the authorization token sent from headers
    """
    me: User!
    """
    Profile fetches any user profile by username
    """
    profile(username: String!): User!
    """
    Feed fetches 25 chronologically ordered posts from currently followed users
    """
    feed(
      """
      Specifies how many of the returned objects in the list should be skipped.
      """
      skip: Int
      """
      Specifies the starting object for the list based of an ID
      """
      after: String
      """
      Specifies the last object for the list based of an ID
      """
      before: ID
      """
      Specifies how many elements should be returned in the list (as seen from the beginning of the list).
      """
      first: Int
      """
      Specifies how many elements should be returned in the list (as seen from the end of the list).
      """
      last: Int
    ): [UserPost]!
  }

  """
  Mutations
  """
  type Mutation {
    # User
    createUser(data: UserCreateInput!): AuthPayload!
    loginUser(data: UserLoginInput!): AuthPayload!
    updateUser(data: UserUpdateInput!): User!
    # Follower
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
    ): ID!
    # UserPost
    createPost(data: UserPostCreateInput!): UserPost!
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
    about: String!
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
    posts: [UserPost!]!
	postCount: Int!
  }

  """
  Required input to create a user
  """
  input UserCreateInput {
    firstName: String!
    lastName: String!
    username: String!
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

  type UserPost {
    id: ID!
    author: User!
    media: [PostMedia!]!
    description: String
    likes: [PostLike!]!
    comments: [PostComment!]!
    createdAt: DateTime!
  }

  input UserPostCreateInput {
    description: String
    media: [Upload!]!
  }

  type PostMedia {
    id: ID!
    post: UserPost!
    url: String!
    contentType: String!
    size: Float
    length: Float
  }

  type PostLike {
    id: ID!
    likedBy: User!
  }

  type PostComment {
    id: ID!
    comment: String!
    author: User!
  }
`;
