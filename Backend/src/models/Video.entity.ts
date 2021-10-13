import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Video {
  @PrimaryGeneratedColumn()
  id: String;

  @Column()
  url: string;

  @Column()
  title: string;
}