/* eslint-disable prettier/prettier */
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { SaleEntity } from "./sales.entity";

@Entity({name: "detail"})
export class DetailEntity {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    itemId:string;
    
    @Column({length: 4, nullable: false})
    description:string;

    @Column({type: 'int', nullable: false})
    cant:number;

    @Column({type: 'float', nullable: false})
    price:number;

    @ManyToOne(() => SaleEntity, (sale) => sale.details)
    sale: SaleEntity
}