import { Context, Next } from "koa";
import { getRepository } from "typeorm";
import { TodoTable } from "../entity/todo.entity";

enum Status {
  y = "Y",
  n = "N"
}

const dbName: string = process.env.NODE_ENV === "production" ? "prod" : "test";

class TodoController {
  // @desc    Get all Todos
  // @route   GET /api/v1/todo
  // @access  Public
  public static async getAllTodo(ctx: Context, next?: Next) {
    const todoRepo = getRepository(TodoTable, dbName);
    try {
      const todos: Array<TodoTable> = await todoRepo.find({
        userid: ctx.header.userid
      });

      ctx.status = 200;
      ctx.body = {
        success: true,
        data: todos
      };
    } catch (err) {
      ctx.status = 500;
      ctx.body = {
        success: false,
        msg: "Server Error"
      };
    }
  }

  // @desc    Get single Todo
  // @route   GET /api/v1/todo/:id
  // @access  Public
  public static async getByIdTodo(ctx: Context, next?: Next) {
    const todoRepo = getRepository(TodoTable, dbName);

    try {
      const todo = await todoRepo.findOne({ id: ctx.params.id });
      if (todo) {

        ctx.status = 200;
        ctx.body = {
          success: true,
          data: [todo]
        };
      } else {
        ctx.status = 404;
        ctx.body = {
          success: false,
          msg: "No todo found"
        }
      }
    } catch (err) {
      ctx.status = 500;
      ctx.body = {
        success: false,
        msg: "Server Error"
      };
    }
  }

  // @desc    Create a Todo
  // @route   POST /api/v1/todo
  // @access  Public
  public static async createTodo(ctx: Context, next?: Next) {
    const todoRepo = getRepository(TodoTable, dbName);
    const { todo, completed } = ctx.request.body;
    const { userid } = ctx.header;

    const newTodo = new TodoTable();

    try {
      newTodo.todo = todo;
      newTodo.completed = completed || Status.n;
      newTodo.created = new Date().toLocaleString();
      newTodo.updated = new Date().toLocaleString();
      newTodo.userid = userid;

      const data = await todoRepo.save(newTodo);

      ctx.status = 201;
      ctx.body = {
        success: true,
        data: [data]
      };
    } catch (err) {
      console.log(err);
      if (err.name === "QueryFailedError") {
        ctx.status = 400;
        ctx.body = {
          success: false,
          msg: err.message
        };
      } else {
        ctx.status = 500;
        ctx.body = {
          success: true,
          msg: "Server Error"
        };
      }
    }
  }

  // @desc    Update a Todo
  // @route   PUT /api/v1/todo/:id
  // @access  Public
  public static async updateTodo(ctx: Context, next?: Next) {
    const todoRepo = getRepository(TodoTable, dbName);
    try {
      const todo = await todoRepo.findOne(ctx.params.id);
      if (todo) {
        todo.completed = Status.y || Status.n;
        todo.updated = new Date().toLocaleString();
        const data = await todoRepo.save(todo);

        ctx.status = 200;
        ctx.body = {
          success: true,
          data: [data]
        };
      } else {
        ctx.status = 404;
        ctx.body = {
          success: false,
          msg: "No todo found"
        };
      }
    } catch (err) {
      ctx.status = 500;
      ctx.body = {
        success: false,
        msg: err.message
      };
    }
  }

  // @desc    Delete a Todo
  // @route   DELETE /api/v1/todo/:id
  // @access  Public
  public static async delTodo(ctx: Context, next?: Next) {
    const todoRepo = getRepository(TodoTable, dbName);
    const { id } = ctx.params;
    try {
      const todo = await todoRepo.findOne(id);
      if (todo) {
        const data = await todoRepo.remove(todo);

        ctx.status = 200;
        ctx.body = {
          success: true,
          data: [data]
        };
      } else {
        ctx.status = 404;
        ctx.body = {
          success: false,
          msg: "No todo found"
        };
      }
    } catch (err) {
      ctx.status = 500;
      ctx.body = {
        success: false,
        msg: err.message
      };
    }
  }
}

export { TodoController };
