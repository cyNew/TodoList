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

  @Column("datetime")
  created: Date;

  @Column("datetime")
  updated: Date;
}

export { Todo as TodoTable };
