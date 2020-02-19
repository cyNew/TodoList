import { Context, Next } from "koa";
import bcrypt from "bcryptjs";
import { getRepository } from "typeorm";
import { UserTable } from "../entity/user.entity";
import jwt from "jsonwebtoken";

const dbName: string = process.env.NODE_ENV === "production" ? "prod" : "test";
class UserController {
  static async createUser(ctx: Context, next?: Next) {
    const userRepo = getRepository(UserTable, dbName);
    // get the registry info
    const { username, password, email } = ctx.request.body;
    // check the user whether is exists
    let user = await userRepo.findOne({ username, email });
    if (!user) {
      // if not exist, create one
      let newUser = new UserTable();
      // hash the password
      let salt: string = bcrypt.genSaltSync(10);
      let hashedPassword: string = bcrypt.hashSync(password, salt);
      // use the info
      newUser.username = username;
      newUser.email = email;
      newUser.password = hashedPassword;
      newUser.created = new Date();

      try {
        await userRepo.save(newUser);
        ctx.status = 200;
        ctx.body = {
          msg: "created success"
        };
        return;
      } catch (error) {
        // return the msg
        ctx.status = 400;
        ctx.body = {
          msg: "created failed"
        };
        console.error(error);
        return;
      }
    } else {
      ctx.status = 406;
      ctx.body = {
        msg: "user has existed"
      };
      return;
    }
  }

  static async login(ctx: Context, next?: Next) {
    const userRepo = getRepository(UserTable, dbName);

    const { username, password } = ctx.request.body;
    const user = await userRepo.findOne({ username });

    if (user) {
      if (bcrypt.compareSync(password, user.password)) {
        user.login = new Date();
        ctx.status = 200;
        ctx.body = {
          logged: true,
          userid: user.userid,
          token: jwt.sign(
            {
              data: user.userid,
              exp: Math.floor(Date.now() / 1000) + 60 * 60
            },
            "react-koa-secret"
          ),
          msg: "login success"
        };
        // update the info
        try {
          await userRepo.save(user);
        } catch (error) {
          console.error(error);
        }
        return;
      } else {
        ctx.body = 404;
        ctx.body = {
          logged: false,
          msg: "username or password is wrong"
        };
        return;
      }
    } else {
      ctx.status = 404;
      ctx.body = {
        logged: false,
        msg: "user does not exsit"
      };
      return;
    }
  }
}

export { UserController };
