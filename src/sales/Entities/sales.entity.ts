/* eslint-disable prettier/prettier */
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { DetailEntity } from "./details.entity";

@Entity({name: "sale"})
export class SaleEntity {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    clientName:string;
    
    @Column()
    clientCI:string;

    @Column()
    date:Date;

    @OneToMany(() => DetailEntity, (detail) => detail.sale)
    details: DetailEntity[]
}