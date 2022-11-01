import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Detail {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    itemId:string;
    
    @Column()
    description:string;

    @Column()
    amount:number;

    @Column()
    price:number;
}