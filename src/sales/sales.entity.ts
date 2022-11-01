import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Sale {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    clientName:string;
    
    @Column()
    clientCI:string;

    @Column()
    date:Date;
}