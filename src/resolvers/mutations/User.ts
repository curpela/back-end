import * as argon2 from "argon2";
import generateToken from "../../utils/generateToken";
import getUserId from "../../utils/getUserId";
import { User } from "../../entity/User";

/*
 *User Mutations*
 - createUser
 - loginUser
 - updateUser
 */

export default {
  async createUser(_, args) {
    try {
      console.log("got here");
      // check password length
      if (args.data.password.length < 8)
        throw new Error("Password must be 8 characters or longer");

      /*
       * hash and salt password
       * Argon2 Wiki - https://github.com/ranisalt/node-argon2/wiki/Options
       */
      const password = await argon2.hash(args.data.password, {
        type: argon2.argon2id,
        timeCost: 10,
        hashLength: 64
      });

      // create user
      const user = await User.create({ email: args.data.email, password });
      await user.save();

      // generate jwt token
      const token = generateToken(user.id);

      // return AuthPayload
      return { token, user };
    } catch (error) {
      throw new Error(error);
    }
  },
  async loginUser(_, args, { photon }) {
    // query for user by email and username
    const user = await photon.users.findMany({
      where: {
        OR: [
          {
            email: args.data.emailOrUsername
          },
          {
            username: args.data.emailOrUsername
          }
        ]
      }
    });

    // check existence of user
    // if (!user.length > 0) throw new Error("Incorrect email and or password");

    // validate password
    const validPassword = await argon2.verify(
      user[0].password,
      args.data.password
    );

    // check validity of password
    if (!validPassword) throw new Error("Incorrect email and or password");

    // generate token
    const token = await generateToken(user[0].id);

    // return auth payload
    return { token, user };
  },
  async updateUser(_, args, { photon, request }, info) {
    const userId = getUserId(request);

    const user = await photon.users.update({
      where: {
        id: userId
      },
      data: {
        ...args.data
      }
    });

    return user;
  }
};
