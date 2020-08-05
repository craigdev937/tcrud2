import { Entity, BaseEntity, PrimaryGeneratedColumn, 
    Column } from "typeorm";

@Entity()
export class Friends extends BaseEntity {
    @PrimaryGeneratedColumn("uuid") id: string;
    @Column() name: string;
    @Column() age: number;
    @Column() info: string;
};


