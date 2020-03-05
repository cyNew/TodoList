import { Context, Next } from "koa";
import bcrypt from "bcryptjs";
import { getRepository } from "typeorm";
import { UserTable } from "../entity/user.entity";
import jwt from "jsonwebtoken";

const dbName: string = process.env.NODE_ENV === "production" ? "prod" : "test";
class UserController {
  // @desc    Create an User
  // @route   POST /api/v1/user/register
  // @access  Public
  static async createUser(ctx: Context, next?: Next) {
    const userRepo = getRepository(UserTable, dbName);
    // get the registry info
    const { username, password, email } = ctx.request.body;

    try {
      const user = await userRepo.findOne({ username, email });
      console.log(user);
      if (!user) {
        console.log("here");
        const newUser = new UserTable();

        // hash the password
        let salt: string = bcrypt.genSaltSync(10);
        let hashedPassword: string = bcrypt.hashSync(password, salt);

        // use the info
        newUser.username = username;
        newUser.email = email;
        newUser.password = hashedPassword;
        newUser.created = new Date().toLocaleString();

        await userRepo.save(newUser);

        ctx.status = 201;
        ctx.body = {
          success: true,
          msg: "Create user successfully"
        };
      } else {
        // ctx.status = 400;
        ctx.body = {
          success: false,
          msg: "User does exists"
        };
      }
    } catch (err) {
      // ctx.status = 500;
      ctx.body = {
        success: false,
        msg: "Server Error"
      };
    }
  }

  // @desc    User login
  // @route   POST /api/v1/user/login
  // @access  Public
  static async login(ctx: Context, next?: Next) {
    const userRepo = getRepository(UserTable, dbName);
    const { username, password } = ctx.request.body;
    try {
      const user = await userRepo.findOne({ username });
      // check the user whether does exists
      if (user) {
        // compare the password
        if (bcrypt.compareSync(password, user.password)) {
          // update the login time
          user.login = new Date().toLocaleString();

          ctx.status = 200;
          ctx.body = {
            success: true,
            userid: user.userid,
            token: jwt.sign(
              {
                data: user.userid,
                exp: Math.floor(Date.now() / 1000) + 60 * 60
              },
              "react-koa-secret"
            )
          };

          userRepo.save(user);
        } else {
          // ctx.status = 400;
          ctx.body = {
            success: false,
            msg: "Wrong password"
          };
        }
      } else {
        // ctx.status = 404;
        ctx.body = {
          success: false,
          msg: "No user found"
        };
      }
    } catch (err) {
      ctx.status = 500;
      ctx.body = {
        success: false,
        msg: "Server Error"
      };
    }
  }
}

export { UserController };
