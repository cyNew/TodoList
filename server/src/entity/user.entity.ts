import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn, OneToMany } from "typeorm";
import { TodoTable } from "./todo.entity";

@Entity()
class User {
  @PrimaryGeneratedColumn("uuid")
  userid: string;

  @OneToMany(type => TodoTable, todo => todo.userid)
  todos: TodoTable[]

  @Column("text")
  username: string;

  @Column("text")
  password: string;

  @Column("text")
  email: string;

  @Column("boolean", { default: false })
  isAuth: boolean;

  @Column("datetime")
  created: Date;

  @Column("datetime", {nullable: true})
  login: Date;
}

export { User as UserTable };
