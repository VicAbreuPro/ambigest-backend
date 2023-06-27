import { ObjectId } from "mongodb";
import { Double } from 'mongodb';


export class WaterContractResponseDto {
    readonly id: ObjectId;
    readonly userId: string;
    readonly valuePerM3: number;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}