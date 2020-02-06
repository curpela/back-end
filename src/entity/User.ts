import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true
  })
  firstName: string;

  @Column({
    nullable: true
  })
  lastName: string;

  @Column({
    type: "string",
    unique: true
  })
  email: string;

  @Column()
  password: string;

  @Column({
    default: "https://ca.slack-edge.com/TQY9U9T96-UQLRR7CRZ-gf4706566cf7-512"
  })
  profilePicture: string;
}
