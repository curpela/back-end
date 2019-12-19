const argon2 = require("argon2");

/*
 * User Mutations
 */

module.exports = {
  async createUser(_, args, { photon }, info) {
    // Check password length
    if (args.data.password.length < 8)
      throw new Error("Password must be 8 characters or longer");

    /*
     * Hash and Salt password
     * Argon2 Wiki - https://github.com/ranisalt/node-argon2/wiki/Options
     */
    const hashedPassword = await argon2.hash(args.data.password, {
      type: argon2.argon2id,
      timeCost: 10,
      hashLength: 64
    });

    // Create user
    const user = await photon.users.create({
      data: {
        ...args.data,
        password: hashedPassword
      }
    });

    // Generate jwt token
    const token = generateToken(user.id);

    // Return AuthPayload
    return { token, user };
  }
};
