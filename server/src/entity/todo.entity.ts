import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne
} from "typeorm";
import { UserTable } from "./user.entity";
@Entity()
class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    type => UserTable,
    user => user.userid
  )
  userid: string;

  @Column("text")
  todo: string;

  @Column("text")
  completed: string;

  @Column("text")
  created: string;

  @Column("text")
  updated: string;
}

export { Todo as TodoTable };
