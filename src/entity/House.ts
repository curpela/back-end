import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

enum Status {
  ACTIVE = "active",
  PENDING = "pending",
  SOLD = "sold"
}

@Entity()
export class House {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  address: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  zip: string;

  @Column()
  slug: string;

  @Column({
    nullable: true
  })
  sqFt: number;

  @Column({
    nullable: true
  })
  lotSize: number;

  @Column({
    nullable: true
  })
  price: number;

  @Column({
    type: "text",
    nullable: true
  })
  status: Status;

  @Column({
    nullable: true
  })
  beds: number;

  @Column({
    nullable: true
  })
  baths: number;
}
