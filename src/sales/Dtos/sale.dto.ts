import { DetailEntity } from "../Entities/details.entity";
import { DetailsDto } from "./detail.dto";

export class SalesDto{
    clientName:string;
    clientCI:string;
    details: DetailsDto[];
}